import { Graph } from "../../datastructures/graph";
import { SetUnion } from "../../datastructures/set_union";

export function minimumSpanningTree(g: Graph) {
    const set = new SetUnion(g.nVertices);
    const edges = [];

    // convert edges to array
    for(let i = 0; i < g.nVertices; i++) {
        let edge = g.edges[i];
        while (edge) {
            edges.push(edge);
            edge = edge.next;
        }
    }

    edges.sort((a, b) => {
        return a.weight - b.weight;
    });

    for (let i = 0; i < edges.length; i++) {
        if (!set.sameComponent(edges[i].x, edges[i].y)) {
            set.union(edges[i].x, edges[i].y);
        }
    }
}