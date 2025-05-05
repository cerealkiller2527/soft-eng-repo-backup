import mapboxgl, { MercatorCoordinate } from "mapbox-gl";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// Update import path for types
import { BuildingAttributes, TempNode } from './types'; 

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
    attributes: BuildingAttributes
): CustomLayerInterface {

    // Keep track of THREE resources for cleanup
    let scene: THREE.Scene | null = null;
    let camera: THREE.Camera | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    const disposables: { dispose?: () => void }[] = []; // Store objects with dispose methods
    let animationFrameId: number | null = null;
    const layerId = `custom-3d-${attributes.buildingPaths.join('-').replace(/[\/\.]/g, '_')}`; // Store the ID


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
                            if (!disposables.includes(mat)) {
                                disposables.push(mat);
                            }
                            mat.color.set(targetColor);
                            mat.opacity = targetOpacity;
                            // Ensure transparency is enabled for opacity to work
                            mat.transparent = true; 
                            mat.needsUpdate = true;
                        }
                    });
                }
                if (mesh.geometry && !disposables.includes(mesh.geometry)) {
                     disposables.push(mesh.geometry);
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
            camera = new THREE.Camera();
            scene = new THREE.Scene();

            // rotations
            scene.rotateX(Math.PI/2);
            scene.scale.multiply(new THREE.Vector3(1, 1, -1));

            // create lights - Adjusted for softer look
            // Decrease directional intensity, maybe change position
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2); // Reduced intensity from 2
            directionalLight.position.set(0, 70, 100).normalize(); // More frontal/top-down?
            scene.add(directionalLight);

            // Increase ambient intensity
            const ambientLight = new THREE.AmbientLight(0xffffff, 6.5); // Increased intensity from 5, maybe slightly off-white if needed e.g. 0xdddddd
            scene.add(ambientLight);

            // model generations: Use attributes
            const startNodeGeometry = new THREE.SphereGeometry(1);
            const startNodeMaterial = new THREE.MeshStandardMaterial({ color: 'red' });
            disposables.push(startNodeGeometry, startNodeMaterial);
            const startNodeMarker = new THREE.Mesh(startNodeGeometry, startNodeMaterial);

            const endNodeMarker = await loadModel("/endStar.gltf"); // Keep path relative to public? Needs verification

            const buildingMask = await loadModel(attributes.buildingMaskPath) // Use attribute

            // scene origin coords
            const sceneOriginMercator = MercatorCoordinate.fromLngLat(attributes.sceneCoords)

            // add nodes to scene - Use attributes.nodes
            for(let i = 0; i < attributes.nodes.length; i++){
                const node = attributes.nodes[i];
                const nodeMercator = MercatorCoordinate.fromLngLat([node.long, node.lat]);
                const dNode = calcMeterOffset(nodeMercator, sceneOriginMercator);

                if (i === 0){ // START NODE
                    startNodeMarker.position.set(dNode.dEastMeter, 1 + (node.floor - 1) * attributes.floorHeight, dNode.dNorthMeter);
                    scene.add(startNodeMarker); // Add the specific start marker
                    continue;
                }

                if (i === attributes.nodes.length - 1){ // END NODE
                    endNodeMarker.position.set(dNode.dEastMeter, 1 + (node.floor - 1) * attributes.floorHeight, dNode.dNorthMeter);
                    scene.add(endNodeMarker);

                } else { // Intermediate Nodes (use kind)
                    let color = 'gray';
                    let radius = 0.5;
                    switch(node.kind) {
                        case 'elevator': color = 'skyblue'; break;
                        case 'stairs': color = 'orange'; break; // Example for stairs
                        case 'inter': color = 'purple'; break; // Example for intermediate path node
                        case 'poi': color = 'yellow'; radius = 0.7; break; // Example for POI
                    }

                     const nodeGeometry = new THREE.SphereGeometry(radius);
                     const nodeMaterial = new THREE.MeshStandardMaterial({ color: color });
                     disposables.push(nodeGeometry, nodeMaterial);
                     const nodeMarker = new THREE.Mesh(nodeGeometry, nodeMaterial);
                     nodeMarker.position.set(dNode.dEastMeter, 1 + (node.floor - 1) * attributes.floorHeight, dNode.dNorthMeter);
                     scene.add(nodeMarker);
                }
            }

            // set path material params
            const lineMaterial = new THREE.LineBasicMaterial({ color: 'blue' }); // normal path
            const dashedMaterial = new THREE.LineDashedMaterial({ // elevator/stair path (dashed)
                color: 'blue',
                dashSize: 1,
                gapSize: 0.5,
                linewidth: 2
            });
            disposables.push(lineMaterial, dashedMaterial);

            // iterate over all subpaths to create full path - Use attributes.nodes
            for (let i = 0; i < attributes.nodes.length - 1; i++) {
                const from = attributes.nodes[i];
                const to = attributes.nodes[i + 1];

                const fromNodeMercator = MercatorCoordinate.fromLngLat([from.long, from.lat]);
                const toNodeMercator = MercatorCoordinate.fromLngLat([to.long, to.lat]);
                const dFromNode = calcMeterOffset(fromNodeMercator, sceneOriginMercator);
                const dToNode = calcMeterOffset(toNodeMercator, sceneOriginMercator);

                const fromVec = new THREE.Vector3(
                    dFromNode.dEastMeter,
                    1 + (from.floor - 1) * attributes.floorHeight, // Use attributes.floorHeight
                    dFromNode.dNorthMeter
                );

                const toVec = new THREE.Vector3(
                    dToNode.dEastMeter,
                    1 + (to.floor - 1) * attributes.floorHeight, // Use attributes.floorHeight
                    dToNode.dNorthMeter
                );

                const lineGeo = new THREE.BufferGeometry().setFromPoints([fromVec, toVec]);
                disposables.push(lineGeo); // Track geometry

                const line = new THREE.Line(
                    lineGeo,
                    // Use node kinds to determine material (e.g., if either is elevator/stairs)
                    (from.kind === 'elevator' || from.kind === 'stairs' || to.kind === 'elevator' || to.kind === 'stairs') ? dashedMaterial : lineMaterial
                );

                // if there's a floor change or it's an elevator/stair segment
                if (from.floor !== to.floor || from.kind === 'elevator' || from.kind === 'stairs' || to.kind === 'elevator' || to.kind === 'stairs') {
                    line.computeLineDistances(); // Needed for dashed lines
                }

                scene.add(line);
            }

            // animate icon along path
            const sphereArrowGeom = new THREE.SphereGeometry(2);
            const sphereArrowMat = new THREE.MeshStandardMaterial({ color: 'blue' });
            disposables.push(sphereArrowGeom, sphereArrowMat);
            const sphereArrow = new THREE.Mesh(sphereArrowGeom, sphereArrowMat);

            const elevatorArrowGeom = new THREE.BoxGeometry(2, 2, 2);
            const elevatorArrowMat = new THREE.MeshStandardMaterial({ color: 'blue' });
            disposables.push(elevatorArrowGeom, elevatorArrowMat);
            const elevatorArrow = new THREE.Mesh(elevatorArrowGeom, elevatorArrowMat);

            scene.add(sphereArrow, elevatorArrow);
            elevatorArrow.visible = false;
            sphereArrow.visible = false;

            const rawPoints: THREE.Vector3[] = [];
            // Use attributes.nodes
            for (let i = 0; i < attributes.nodes.length; i++) {
                const nodeMercator = MercatorCoordinate.fromLngLat([attributes.nodes[i].long, attributes.nodes[i].lat]);
                const offset = calcMeterOffset(nodeMercator, sceneOriginMercator);

                rawPoints.push(new THREE.Vector3(
                    offset.dEastMeter,
                    1 + (attributes.nodes[i].floor - 1) * attributes.floorHeight, // Use attributes.floorHeight
                    offset.dNorthMeter
                ));
            }

            let subpathIndex = 0;
            let progress = 0;

            function animateArrowOnPath() {
                 // Check if scene exists before proceeding
                if (!scene) {
                    animationFrameId = null; // Stop requesting frames if scene is gone
                    return;
                }

                // checker for if done with path (goes back to beginning)
                if (subpathIndex >= rawPoints.length - 1) {
                    subpathIndex = 0;
                    progress = 0;
                }

                // Check node kinds for elevator/stairs for arrow type
                if (subpathIndex + 1 < attributes.nodes.length) {
                    const startNodeKind = attributes.nodes[subpathIndex].kind;
                    const endNodeKind = attributes.nodes[subpathIndex+1].kind;
                    const floorChange = attributes.nodes[subpathIndex].floor !== attributes.nodes[subpathIndex+1].floor;

                    if (startNodeKind === 'elevator' || startNodeKind === 'stairs' || endNodeKind === 'elevator' || endNodeKind === 'stairs' || floorChange) {
                        elevatorArrow.visible = true;
                        sphereArrow.visible = false;
                    } else {
                        elevatorArrow.visible = false;
                        sphereArrow.visible = true;
                    }
                } else { // Handle last segment case if needed
                    elevatorArrow.visible = false;
                    sphereArrow.visible = true;
                }

                const start = rawPoints[subpathIndex];
                const end = rawPoints[subpathIndex + 1];
                const dir = new THREE.Vector3().subVectors(end, start);
                const length = dir.length(); 
                if (length === 0) { // Avoid division by zero if start/end are same
                    progress = 1; // Force moving to next segment
                } else {
                    dir.normalize();
                    const arrowSpeed = 0.5 / length; 
                    progress += arrowSpeed;
                }

                const pos = new THREE.Vector3().lerpVectors(start, end, Math.min(progress, 1)); // Clamp progress to 1
                sphereArrow.position.copy(pos); 
                elevatorArrow.position.copy(pos);

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
        },

        // --- Render: Draw the THREE.js scene ---
        render: (gl: WebGLRenderingContext, matrix: number[]) => {
            if (!scene || !camera || !renderer) return;

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

        // --- onRemove: Cleanup THREE.js resources ---
        onRemove: (mapInstance: mapboxgl.Map, gl: WebGLRenderingContext) => {
            console.log(`Removing custom layer: ${layerId}`); // Use the stored layerId variable
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
             disposables.forEach(item => item?.dispose?.());
             disposables.length = 0; // Clear array


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