import { NothingProcessor } from "./processor";
import { Graph } from "../../datastructures/graph";
import { TransverseState } from "./tranversState";
import { dfs } from "./dfs";

export function topoSort(g: Graph) {
    const processor = new TopoProcessor();
    for (let i = 0; i < g.nVertices; i++) {
        if (processor.state.discovered[i] == false) {
            dfs(g, i, processor, processor.state);
        }
    }
    return processor.sorted;
}

export class TopoProcessor extends NothingProcessor{
    state: TransverseState = {};
    sorted = [];

    processVertexLate(g: Graph, v: number) {
        this.sorted.push(v);
    }
}