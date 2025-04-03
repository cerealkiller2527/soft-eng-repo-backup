class Nodef {
    public id: string;
    public neighbors: Nodef[];
    public visited: boolean;

    constructor(id: string, neighbors: Nodef[]) {
        this.id = id;
        this.neighbors = neighbors;
        this.visited = false;
    }
}

const eList: Nodef[] = [];
const A = new Nodef('A', eList);
const B = new Nodef('B', eList);
const C = new Nodef('C', eList);
const D = new Nodef('D', eList);
const E = new Nodef('E', eList);
const F = new Nodef('F', eList);
A.neighbors = [B, C];
B.neighbors = [A, E];
C.neighbors = [A, D, F];
D.neighbors = [C];
E.neighbors = [B, F];
F.neighbors = [C, E];

function findNode(startNode: Nodef, endNode: Nodef, path: Nodef[]): Nodef[] {
    let newPath = [...path, startNode];
    // console.log("checking node:" + startNode.id);

    if (startNode.id === endNode.id) {
        // base case: found the path
        console.log('Found a path!');
        printPath(newPath);
        return newPath;
    } else {
        // if we have not found the path
        startNode.visited = true;
        for (let i = 0; i < startNode.neighbors.length; i++) {
            if (!startNode.neighbors[i].visited) {
                findNode(startNode.neighbors[i], endNode, newPath);
            }
        }
    }
    return [];
}

function findBFS(startNode: Nodef, endNode: Nodef) {
    let pathQueue: Nodef[][] = [[startNode]]; // queue of paths to go through
    let visited = new Set<Nodef>(); // set of visited nodes

    while (pathQueue.length > 0) {
        let currentPath = pathQueue.shift(); // path we are investigating
        let currentNode = currentPath![currentPath!.length - 1]; // not null assertion
        console.log('checking node:' + currentNode.id);

        if (currentNode === endNode) {
            // if this node is the end node
            console.log('Found a path!');
            return currentPath;
        }

        if (!visited.has(currentNode)) {
            // if this node is unvisited
            visited.add(currentNode); // add it to the visited list

            for (let neighbor of currentNode.neighbors) {
                // unzip current path list into elements, adding neighbor at the end
                pathQueue.push([...currentPath!, neighbor]);
            }
            pathQueue.push();
        }
    }
    return []; // no path found
}

let mypath = findNode(A, F, eList);
// let mypath = findBFS(A, F);

function printPath(path: Nodef[]) {
    for (let i = 0; i < path.length; i++) {
        console.log(path[i].id);
    }
}

printPath(mypath);
