import { ProcessVertex } from "./processor";
import { TransverseState } from "./tranversState";
import { Graph, EdgeClassification } from "../../datastructures/graph";

export function dfs(g: Graph, start: number, processor?: ProcessVertex, oldState?: TransverseState) {
    const stack = [];
    const state: TransverseState = oldState || {
        discovered: {},
        processed: {},
        parent: {},
        entryTime: {},
        exitTime: {},
    };

    if (!state.discovered) {
        state.discovered = {};
    }
    if (!state.processed) {
        state.processed = {};
    }
    if (!state.parent) {
        state.parent = {};
        for(let i = 0; i < g.nVertices; i++) {
            state.parent[i] = -1;
        }
    }
    if (!state.entryTime) {
        state.entryTime = {};
    }
    if (!state.exitTime) {
        state.exitTime = {};
    }

    let time = 0;

    const discovered = state.discovered;
    const processed = state.processed;
    const parent = state.parent;
    const entryTime = state.entryTime;
    const exitTime = state.exitTime;

    inner(start);

    function inner(v: number) {
        if (state.finished) return;
        discovered[v] = true;
        entryTime[v] = time++;
        if (processor) processor.processVertexEarly(g, v);

        let p = g.edges[v];
        while (p) {
            const y = p.y;
            if (!discovered[y]) {
                state.parent[y] = v;
                if (processor) processor.processEdge(g, v, y);
                inner(y);
            }
            else if ((!processed[y]) || (g.directed)) {
                if (processor) processor.processEdge(g, v, y);
            }
            if (state.finished) return;
            p = p.next;
        }
        if (processor) processor.processVertexLate(g, v);

        exitTime[v] = time++;
        processed[v] = true;
    }
}