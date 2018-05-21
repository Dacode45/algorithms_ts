import { Graph } from "../../datastructures/graph";

export function minimumSpanningTree(g: Graph, start: number) {
    const distance = new Array(g.nVertices);
    const parent = new Array(g.nVertices);
    const intree = new Array(g.nVertices);
    for (let i = 0; i < g.nVertices; i++) {
        distance[i] = Infinity;
        intree[i] = false;
        parent[i] = -1;
    }

    distance[start] = 0;
    let v = start;
    while (!intree[v]) {
        // check all edges to se whats up
        intree[v] = true;
        let edge = g.edges[v];
        while (edge) {
            const w = edge.y;
            const weight = edge.weight;
            if (!intree[w] && (distance[w] > weight)) {
                distance[w] = weight;
                parent[w] = v;
            }
            edge = edge.next;
        }

        // get the min from those
        let minDistance = Infinity;
        let next = 0;
        for(let i = 0; i < g.nVertices; i++) {
            if (!intree[i] && distance[i] < minDistance) {
                minDistance = distance[i];
                next = i;
            }
        }
        v = next;
    }
}