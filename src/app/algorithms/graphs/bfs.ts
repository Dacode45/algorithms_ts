import { Graph, EdgeNode } from "../../datastructures/graph";
import { ProcessVertex } from "./processor";
import { TransverseState } from "./tranversState";

export function bfs(g: Graph, start: number, processor?: ProcessVertex, oldState?: TransverseState) {
    const state: TransverseState = oldState || {
        discovered: {},
        processed: {},
        parent: {}
    };

    if (!state.discovered) {
        state.discovered = {};
    }
    if (!state.processed) {
        state.processed = {};
    }
    if (!state.parent) {
        state.parent = {};
    }
    const queue = [];    
    const discovered = state.discovered;
    const processed = state.processed;
    const parent = state.parent;

    queue.push(start);
    discovered[start] = true;
    while (queue.length > 0) {
        const v = queue.shift();
        if (processor) processor.processVertexEarly(g, v);
        processed[v] = true;
        let p = g.edges[v];
        while (p) {
            let y = p.y;
            if ((!processed[y]) || g.directed) {
                if (processor) processor.processEdge(g, v, y);
            }
            if (!discovered[y]) {
                queue.push(y);
                discovered[y] = true;
                parent[y] = v;
            }
            p = p.next;
        }
        if (processor) processor.processVertexLate(g, v);
    }
}