import { Graph } from "../../datastructures/graph";
import { bfs } from "./bfs";
import { nothingProcessor, printProcessor } from "./processor";

export function connectedComponents(g: Graph) {
    let c = 0;
    const state = {
        discovered: {}
    };
    const discovered = state.discovered;
    const processor = nothingProcessor;
    for (let i = 0; i < g.nVertices; i++) {
        if (!discovered[i]) {
            c = c + 1;
            bfs(g, i, processor, state);
        }
    }
    return c;
}