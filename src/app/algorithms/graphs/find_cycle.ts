import { NothingProcessor, PrintProcessor } from "./processor";
import { TransverseState } from "./tranversState";
import { Graph } from "../../datastructures/graph";
import { dfs } from "./dfs";

export function hasCycles(g: Graph): boolean {
    const processor = new CycleProcessor();
    const state = processor.state;
    dfs(g, 0, processor, state);
    if (processor.foundCycle) return true;
    return false;
}

class CycleProcessor extends NothingProcessor {
    state: TransverseState = {};
    foundCycle = false;
    processEdge(g: Graph, x: number, y: number) {
        // PrintProcessor.prototype.processEdge.call(this, g, x, y);
        if (this.state.discovered[y] && this.state.parent[x] != y) {
            // console.log(`found cycle from ${x} to ${y}`)
            this.foundCycle = true;
            this.state.finished = true;
        }
    }

    processVertexLate(g: Graph, x: number) {
        // console.log('process late', x);
    }
}