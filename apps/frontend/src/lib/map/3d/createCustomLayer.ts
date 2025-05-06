import mapboxgl, { MercatorCoordinate } from "mapbox-gl";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// Import Line classes for thick lines
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
// Update import path for types
import { BuildingAttributes } from './types'; 
// Assuming pNodeZT is the correct type for indoor path nodes from the backend
import type { pNodeZT } from '../../../../../packages/common/src/ZodSchemas'; 

// Define the CustomLayerInterface type locally if not available globally
// (Ideally, this would come from @types/mapbox-gl if fully supported)
interface CustomLayerInterface {
    id: string;
    type: 'custom';
    renderingMode?: '2d' | '3d';
    onAdd?(map: mapboxgl.Map, gl: WebGLRenderingContext): void;
    onRemove?(map: mapboxgl.Map, gl: WebGLRenderingContext): void;
    prerender?(gl: WebGLRenderingContext, matrix: number[]): void;
    render(gl: WebGLRenderingContext, matrix: number[]): void;
    onContextLost?(): void;
    onContextRestored?(gl: WebGLRenderingContext): void;
}


// Refactor function signature and return type
export function createCustomLayer(
    map: mapboxgl.Map,
    attributes: BuildingAttributes,
    initialIndoorPathNodes: pNodeZT[] | null | undefined // Rename for clarity
): CustomLayerInterface {

    console.log(`[createCustomLayer] Initializing layer. Initial nodes count: ${initialIndoorPathNodes?.length ?? 0}`);

    let scene: THREE.Scene | null = null;
    let camera: THREE.Camera | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    // Ensure this is the Set definition
    const disposables: Set<THREE.Object3D | THREE.Material | THREE.BufferGeometry | THREE.Texture | THREE.Light> = new Set(); 
    let animationFrameId: number | null = null;
    const layerId = `custom-3d-${attributes.buildingPaths.join('-').replace(/[/.]/g, '_')}`;
    
    // Mapbox marker for start point
    let startMapboxMarker: mapboxgl.Marker | null = null;

    // Path specific state
    const pathRelatedObjects: THREE.Object3D[] = []; 
    const pathRelatedDisposables: Set<THREE.Material | THREE.BufferGeometry> = new Set();
    // Keep the material at a higher scope
    let pathLineMaterial: LineMaterial;

    // --- Helper functions remain mostly the same ---
    async function loadModel(path: string): Promise<THREE.Group> {
        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync(path);
        
        // Revert to Mapbox default building color/opacity
        const targetColor = new THREE.Color('#aac7e9'); 
        const targetOpacity = 0.8;

        // Traverse and update materials after loading
        gltf.scene.traverse((object) => {
            if ((object as THREE.Mesh).isMesh) {
                const mesh = object as THREE.Mesh;
                if (mesh.material) {
                    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
                    materials.forEach(mat => {
                        if (mat instanceof THREE.Material) {
                            if (!pathRelatedDisposables.has(mat)) {
                                pathRelatedDisposables.add(mat);
                            }
                            // mat.color.set(targetColor);
                            mat.opacity = 0.6;
                            // Ensure transparency is enabled for opacity to work
                            mat.transparent = true;
                            mat.needsUpdate = true;
                        }
                    });
                }
                if (mesh.geometry && !pathRelatedDisposables.has(mesh.geometry)) {
                     pathRelatedDisposables.add(mesh.geometry);
                }
            }
        });
        return gltf.scene;
    }

    function calcMeterOffset(from: MercatorCoordinate, to: MercatorCoordinate) {
        const mercatorPerMeter = from.meterInMercatorCoordinateUnits();
        // mercator x: 0=west, 1=east
        const dEast = from.x - to.x;
        const dEastMeter = dEast / mercatorPerMeter;
        // mercator y: 0=north, 1=south
        const dNorth = to.y - from.y;
        const dNorthMeter = dNorth / mercatorPerMeter;
        return {dEastMeter, dNorthMeter};
    }

    // --- Return the CustomLayerInterface object ---
    return {
        id: layerId, // Use the stored ID here
        type: "custom" as const,
        renderingMode: "3d" as const,

        // --- onAdd: Setup THREE.js environment ---
        onAdd: async (mapInstance: mapboxgl.Map, gl: WebGLRenderingContext) => {
            console.log(`[createCustomLayer] onAdd called for ${layerId}`);
            camera = new THREE.Camera();
            scene = new THREE.Scene();

            scene.rotateX(Math.PI/2);
            scene.scale.multiply(new THREE.Vector3(1, 1, -1));

            // create lights
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
            directionalLight.position.set(0, 70, 100).normalize();
            scene.add(directionalLight);
            disposables.add(directionalLight); // Track light

            const ambientLight = new THREE.AmbientLight(0xffffff, 6.5);
            scene.add(ambientLight);
            disposables.add(ambientLight); // Track light

            // Declare variables needed later at this scope
            const sceneOriginMercator = MercatorCoordinate.fromLngLat(attributes.sceneCoords);
            const buildingMask = await loadModel(attributes.buildingMaskPath); // Load mask model

            // --- Create materials (use LineMaterial) ---
            pathLineMaterial = new LineMaterial({
                color: 0xff00ff, // Bright magenta for visibility testing
                linewidth: 10, // Line width in pixels
                vertexColors: false,
                dashed: false,
                alphaToCoverage: false, // Ensure this is false
                transparent: false,     // Ensure this is false for now
            });
            // Initialize the resolution - crucial for LineMaterial to work
            pathLineMaterial.resolution.set(
                mapInstance.getCanvas().width, 
                mapInstance.getCanvas().height
            );
            // Force material to use high precision
            pathLineMaterial.defines = pathLineMaterial.defines || {};
            pathLineMaterial.defines.USE_SIZEATTENUATION = '';
            
            pathRelatedDisposables.add(pathLineMaterial);
            disposables.add(pathLineMaterial);

            // --- START NEW PATH LOGIC using indoorPathNodes ---
            if (initialIndoorPathNodes && initialIndoorPathNodes.length > 0) {
                console.log(`[createCustomLayer] Creating 3D path with ${initialIndoorPathNodes.length} nodes`);
                
                // Load models needed for path (start/end)
                const endNodeMarker = await loadModel("/endStar.gltf");

                // Collect points for path
                const points = [];
                
                // Process nodes
                for(let i = 0; i < initialIndoorPathNodes.length; i++) {
                    const node = initialIndoorPathNodes[i];
                    const nodeMercator = MercatorCoordinate.fromLngLat([node.longitude, node.latitude]);
                const dNode = calcMeterOffset(nodeMercator, sceneOriginMercator);
                    const nodeYPosition = 1 + (node.floor - 1) * attributes.floorHeight;

                    // Create a point for this node
                    const point = new THREE.Vector3(dNode.dEastMeter, nodeYPosition, dNode.dNorthMeter);
                    points.push(point);

                    // Place Start/End Markers
                    if (i === 0) { // START NODE - Add Mapbox marker with 'S'
                        // Create a custom HTML element for the marker
                        const element = document.createElement('div');
                        element.className = 'start-marker';
                        element.style.width = '32px';
                        element.style.height = '32px';
                        element.style.borderRadius = '50%';
                        element.style.backgroundColor = '#0066ff'; // Blue color matching path
                        element.style.color = 'white';
                        element.style.fontWeight = 'bold';
                        element.style.display = 'flex';
                        element.style.alignItems = 'center';
                        element.style.justifyContent = 'center';
                        element.style.border = '2px solid white';
                        element.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
                        element.style.fontSize = '16px';
                        element.innerHTML = 'S';
                        
                        // Create and add the marker to the map
                        startMapboxMarker = new mapboxgl.Marker({
                            element: element,
                            anchor: 'center'
                        })
                        .setLngLat([node.longitude, node.latitude])
                        .addTo(map);
                    }
                    else if (i === initialIndoorPathNodes.length - 1) { // END NODE
                        endNodeMarker.position.set(dNode.dEastMeter, nodeYPosition, dNode.dNorthMeter);
                        endNodeMarker.scale.set(2, 2, 2); // Increase scale of the end node marker
                        scene.add(endNodeMarker);
                    } 
                }

                // Debug the points
                console.log(`[createCustomLayer] Path points array length: ${points.length}`);
                console.log("[createCustomLayer] First point:", points[0]);
                console.log("[createCustomLayer] Last point:", points[points.length - 1]);
                
                if (points.length >= 2) {
                    try {
                        // Create a THREE.js curve from the points for smooth paths
                        const curve = new THREE.CatmullRomCurve3(points);
                        
                        // Create a tube geometry along the curve
                        // 0.5 radius is equivalent to ~10px width at normal zoom levels
                        const tubeGeometry = new THREE.TubeGeometry(
                            curve,           // path
                            points.length * 6, // tubular segments (higher = smoother)
                            0.5,             // radius
                            8,               // radial segments (higher = smoother tube)
                            false            // closed path?
                        );
                        
                        // Create a purple material
                        const tubeMaterial = new THREE.MeshBasicMaterial({ 
                            color: 0x800080,  // Purple color
                            side: THREE.DoubleSide, // Render both inside and outside
                            // We don't need transparency for a solid path
                            transparent: false,
                            depthWrite: true   // Make sure it writes to depth buffer
                        });
                        
                        const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
                        // Make sure our tube is visible above other elements
                        tube.renderOrder = 999;
                        // Don't allow the camera to cull the tube when zooming
                        tube.frustumCulled = false;
                        
                        // Add to scene and track for cleanup
                        scene.add(tube);
                        pathRelatedDisposables.add(tubeGeometry);
                        pathRelatedDisposables.add(tubeMaterial);
                        pathRelatedObjects.push(tube);
                        
                        console.log(`[createCustomLayer] Added purple tube mesh to scene (radius: 0.5)`);
                    } catch (error) {
                        console.error("Error creating path:", error);
                    }
                } else {
                    console.warn(`[createCustomLayer] Not enough points to create a path (min 2 needed)`);
                }
            } else {
                 console.warn("Custom 3D layer: No indoor path nodes provided.");
            }
           
            const circleGeometry = new THREE.SphereGeometry(1.3, 24, 16);
            const circleMaterial = new THREE.MeshStandardMaterial({
                color: 0x0066ff, // Bright blue
                emissive: 0x0033cc, // Blue glow
                emissiveIntensity: 0.3,
                metalness: 0.8,
                roughness: 0.2
            });
            
            // Create the mesh
            const pathMarker = new THREE.Mesh(circleGeometry, circleMaterial);
            // No rotation needed for sphere

            // Create a 3D cube for elevator/stair points
            const elevatorGeometry = new THREE.BoxGeometry(3, 3, 3);
            const elevatorMaterial = new THREE.MeshStandardMaterial({
                color: 0xff9900, // Orange for elevator
                emissive: 0xff5500, // Orange glow
                emissiveIntensity: 0.5,
                metalness: 0.8,
                roughness: 0.2,
                transparent: true,
                opacity: 0.9 // Slight transparency to see through
            });
            
            // Create the elevator mesh
            const elevatorMarker = new THREE.Mesh(elevatorGeometry, elevatorMaterial);
            
            // Add edges to the cube to enhance the 3D appearance
            const edgesGeometry = new THREE.EdgesGeometry(elevatorGeometry);
            const edgesMaterial = new THREE.LineBasicMaterial({ 
                color: 0xffcc00, // Bright yellow edges
                linewidth: 2
            });
            const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
            elevatorMarker.add(edges); // Add edges as a child of the cube
            
            // Track the additional geometries/materials for cleanup
            pathRelatedDisposables.add(edgesGeometry);
            pathRelatedDisposables.add(edgesMaterial);
            disposables.add(edgesGeometry);
            disposables.add(edgesMaterial);
            
            // Add to scene
            scene.add(pathMarker, elevatorMarker);
            pathMarker.visible = false;
            elevatorMarker.visible = false;

            const rawPoints: THREE.Vector3[] = [];
            // Use indoorPathNodes if available
            if (initialIndoorPathNodes && initialIndoorPathNodes.length > 0) {
                const sceneOriginMercator = MercatorCoordinate.fromLngLat(attributes.sceneCoords);
                for (let i = 0; i < initialIndoorPathNodes.length; i++) {
                    const nodeMercator = MercatorCoordinate.fromLngLat([initialIndoorPathNodes[i].longitude, initialIndoorPathNodes[i].latitude]);
                const offset = calcMeterOffset(nodeMercator, sceneOriginMercator);
                rawPoints.push(new THREE.Vector3(
                    offset.dEastMeter,
                        1 + (initialIndoorPathNodes[i].floor - 1) * attributes.floorHeight,
                    offset.dNorthMeter
                ));
                }
            } else {
                 console.warn("Animation: No indoor path nodes to generate points for animation.");
                 // If no points, hide markers
                 pathMarker.visible = false;
                 elevatorMarker.visible = false;
            }

            let subpathIndex = 0;
            let progress = 0;

            function animateArrowOnPath() {
                 // Check if scene exists and if there are points to animate
                if (!scene || rawPoints.length < 2) {
                    if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
                    animationFrameId = null; // Stop requesting frames if scene is gone or no path
                    return;
                }

                // checker for if done with path (goes back to beginning)
                if (subpathIndex >= rawPoints.length - 1) {
                    subpathIndex = 0;
                    progress = 0;
                }

                // Check node types for elevator/stairs for marker type, using indoorPathNodes
                if (initialIndoorPathNodes && subpathIndex + 1 < initialIndoorPathNodes.length) {
                    const startNode = initialIndoorPathNodes[subpathIndex];
                    const endNode = initialIndoorPathNodes[subpathIndex+1];
                    const floorChange = startNode.floor !== endNode.floor;
                    // Check against backend types like 'ELEV', 'STAI' (case-sensitive)
                    const isVerticalSegment = startNode.type === 'ELEV' || startNode.type === 'STAI' || 
                                             endNode.type === 'ELEV' || endNode.type === 'STAI' || 
                                             floorChange;

                    if (isVerticalSegment) {
                        elevatorMarker.visible = true;
                        pathMarker.visible = false;
                    } else {
                        elevatorMarker.visible = false;
                        pathMarker.visible = true;
                    }
                } else { // Handle last segment case or if indoorPathNodes is missing
                    elevatorMarker.visible = false;
                    pathMarker.visible = true;
                }

                const start = rawPoints[subpathIndex];
                const end = rawPoints[subpathIndex + 1];
                const dir = new THREE.Vector3().subVectors(end, start);
                const length = dir.length(); 
                if (length === 0) { // Avoid division by zero if start/end are same
                    progress = 1; // Force moving to next segment
                } else {
                    dir.normalize();
                    // Increase the marker movement speed
                    const markerSpeed = 0.45 / length; // Faster movement (was 0.15)
                    progress += markerSpeed;
                }

                const pos = new THREE.Vector3().lerpVectors(start, end, Math.min(progress, 1)); // Clamp progress to 1
                
                // Move markers to current position
                // Position directly on the path (no Y offset for the sphere)
                pathMarker.position.copy(pos);
                // Keep the elevator marker slightly above the path
                elevatorMarker.position.copy(pos).add(new THREE.Vector3(0, 2, 0));
                
                // Make the elevator marker pulsate and rotate slightly for better 3D visibility
                const pulseScale = 1 + 0.4 * Math.sin(Date.now() * 0.006); // Increased amplitude and frequency
                elevatorMarker.scale.set(pulseScale, pulseScale, pulseScale);
                
                // Add a slow rotation to emphasize 3D nature
                elevatorMarker.rotation.y += 0.02;
                
                // Make the sphere pulsate more dramatically
                const spherePulse = 1 + 0.3 * Math.sin(Date.now() * 0.004); // Increased amplitude and frequency
                pathMarker.scale.set(spherePulse, spherePulse, spherePulse);

                // Request next frame only if the layer is still active
                 animationFrameId = requestAnimationFrame(animateArrowOnPath);

                // if we get to the end of the subpath
                if (progress >= 1) {
                    subpathIndex++;
                    progress = 0;
                }
            }

            animateArrowOnPath();

            // calculate building location in scene - Use attributes
            const buildingMercator = MercatorCoordinate.fromLngLat(attributes.buildingCoords);
            const dBuilding = calcMeterOffset(buildingMercator, sceneOriginMercator);

            // create all floors in scene - Use attributes.numFloors, attributes.buildingPaths
            for (let i = 0; i < attributes.numFloors; i++) {
                // Ensure path exists before loading
                if (attributes.buildingPaths[i]) {
                    const floor = await loadModel(attributes.buildingPaths[i]);
                    floor.scale.multiply(new THREE.Vector3(1, 1, -1))
                    floor.rotateY(attributes.buildingRotation) // Use attribute
                    floor.position.set(dBuilding.dEastMeter, i * attributes.floorHeight - 1.8, dBuilding.dNorthMeter); // Use attributes.floorHeight
                    scene.add(floor)
                // add pngs to floors
                const myFloorPath = attributes.floorPlanPaths[i];

                const myTexture = new THREE.TextureLoader().load(myFloorPath, (texture) => {
                    texture.minFilter = THREE.LinearMipMapLinearFilter; // good for downscaling
                    texture.magFilter = THREE.LinearFilter; // good for upscaling
                });

                const myGeometry = new THREE.PlaneGeometry(attributes.imageConstants.width, attributes.imageConstants.height, 1, 1);
                const myMaterial = new THREE.MeshBasicMaterial({
                    map: myTexture,
                    transparent: true,
                    depthWrite: false,
                    side: THREE.DoubleSide})


                const myPlane = new THREE.Mesh(myGeometry, myMaterial);
                myPlane.rotateX(Math.PI/2)
                myPlane.position.set(attributes.imageConstants.offsetEast, i * attributes.floorHeight, attributes.imageConstants.offsetNorth);

                scene.add(myPlane)

                } else {
                    console.warn(`Missing model path for floor ${i+1}`);
                }
            }

            // Add building mask - Use attributes
            const buildingMaskMercator = MercatorCoordinate.fromLngLat(attributes.buildingMaskCoords);
            const dBuildingMask = calcMeterOffset(buildingMaskMercator, sceneOriginMercator);
            buildingMask.position.set(dBuildingMask.dEastMeter, 0, dBuildingMask.dNorthMeter)
            buildingMask.scale.multiply(new THREE.Vector3(1, 1, -1))
            buildingMask.rotateY(attributes.buildingRotation) // Use attribute
            scene.add(buildingMask)

            // setup the THREE.js renderer
            renderer = new THREE.WebGLRenderer({
                canvas: mapInstance.getCanvas(),
                context: gl,
                antialias: true,
            });

            renderer.autoClear = false;
            
            // For debugging, log that we've set up the renderer
            console.log(`[createCustomLayer] Renderer initialized, canvas size: ${mapInstance.getCanvas().width}x${mapInstance.getCanvas().height}`);
        },

        // --- Render: Draw the THREE.js scene ---
        render: (gl: WebGLRenderingContext, matrix: number[]) => {
            if (!scene || !camera || !renderer) return;

            // Update resolution every frame - critical for LineMaterial
            if (pathLineMaterial && renderer) {
                pathLineMaterial.resolution.set(
                    renderer.domElement.width,
                    renderer.domElement.height
                );
                // Force material update
                pathLineMaterial.needsUpdate = true;
            }

            const sceneOriginMercator = MercatorCoordinate.fromLngLat(attributes.sceneCoords);
            const sceneTransform = {
                translateX: sceneOriginMercator.x,
                translateY: sceneOriginMercator.y,
                translateZ: sceneOriginMercator.z,
                scale: sceneOriginMercator.meterInMercatorCoordinateUnits()
            };

            const m = new THREE.Matrix4().fromArray(matrix);
            const l = new THREE.Matrix4()
                .makeTranslation(sceneTransform.translateX, sceneTransform.translateY, sceneTransform.translateZ)
                .scale(new THREE.Vector3(sceneTransform.scale, -sceneTransform.scale, sceneTransform.scale));

            camera.projectionMatrix = m.multiply(l);
            renderer.resetState();
            renderer.render(scene, camera);
            map.triggerRepaint(); // Important: Request Mapbox redraw
        },

        onRemove: (mapInstance: mapboxgl.Map, gl: WebGLRenderingContext) => {
            console.log(`Removing custom layer: ${layerId}`); // Use the stored layerId variable
            
            // Remove Mapbox start marker if it exists
            if (startMapboxMarker) {
                startMapboxMarker.remove();
                startMapboxMarker = null;
            }
            
            // Stop animation loop
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }

            // Dispose of geometries, materials, textures, etc.
            if (scene) {
                 // Recursively remove and dispose objects
                 const disposeObject = (obj: THREE.Object3D) => {
                    if ((obj as THREE.Mesh).isMesh) {
                        const mesh = obj as THREE.Mesh;
                        if (mesh.geometry) mesh.geometry.dispose();
                        if (mesh.material) {
                             const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
                             materials.forEach(mat => {
                                 if (mat) {
                                     // Dispose textures if they exist
                                     Object.values(mat).forEach((value: any) => {
                                         if (value && typeof value === 'object' && value.isTexture) {
                                             (value as THREE.Texture).dispose();
                                         }
                                     });
                                     mat.dispose();
                                 }
                             });
                         }
                    } else if ((obj as THREE.Line).isLine) {
                        const line = obj as THREE.Line;
                        if (line.geometry) line.geometry.dispose();
                        if (line.material) {
                             const materials = Array.isArray(line.material) ? line.material : [line.material];
                             materials.forEach(mat => mat?.dispose());
                         }
                    }
                    // Recursively dispose children
                    while(obj.children.length > 0) {
                         disposeObject(obj.children[0]);
                         obj.remove(obj.children[0]); // Remove child after disposal
                    }
                 };

                 disposeObject(scene);
                 scene = null; // Clear scene reference
            }

             // Dispose of tracked disposables (redundant if scene traversal works, but safe)
             pathRelatedDisposables.forEach(item => item?.dispose?.());
             pathRelatedDisposables.clear();


            // Dispose of renderer
            if (renderer) {
                renderer.dispose();
                renderer = null;
            }

            camera = null;

            console.log(`Custom layer removed and cleaned up: ${layerId}`); // Use the stored layerId variable
        }
    };
} 