import { Graph } from "../../datastructures/graph";

export function dijkstra(g: Graph, start: number) {
    const distance = [];
    const intree = [];
    const parent = [];
    for (let i = 0; i < g.nVertices; i++) {
        distance[i] = false;
        intree[i] = false;
        parent[i] = -1;
    }

    distance[start] = 0;
    let v = start;
    while(intree[v] === false) {
        intree[v] = true;
        let edge = g.edges[v];
        while (edge) {
            const w = edge.y;
            const weight = edge.weight;
            if(distance[w] > (distance[v] + weight)) {
                distance[w] = distance[v] + weight;
                parent[w] = v;
            }
            edge = edge.next;
        }
        v = 0;
        let dist = Infinity;
        for(let i = 0; i < g.nVertices; i++) {
            if ((!intree[i]) && (dist > distance[i])) {
                dist = distance[i];
                v = i;
            }
        }
    }
}