import { NothingProcessor } from "./processor";
import { Graph, edgeClassification, EdgeClassification } from "../../datastructures/graph";
import { TransverseState } from "./tranversState";
import { dfs } from "./dfs";

export function findArticulations(g: Graph): ArticulationProcessor {
    const processor = new ArticulationProcessor();
    dfs(g, 0, processor, processor.state);
    return processor;
}

export class ArticulationProcessor extends NothingProcessor {
    state: TransverseState = {};
    // earliest reachable ancestor of v through a back edge.
    reachableAncestor = {}
    treeOutDegree = {}

    rootArticulations = [];
    parentArticulations = [];
    bridgeArticulations = [];

    processVertexEarly(g: Graph, v: number) {
        this.reachableAncestor[v] = v;
    }

    processEdge(g: Graph, x: number, y: number) {
        const kind = edgeClassification(this.state, x, y);
        if (kind == EdgeClassification.TREE) {
            this.treeOutDegree[x] = (this.treeOutDegree[x] || 0) + 1;
        }
        if ((kind == EdgeClassification.BACK) && (this.state.parent[x] != y)) {
            if (this.state.entryTime[y] < this.state.entryTime[this.reachableAncestor[x]]) {
                this.reachableAncestor[x] = y;
            }
        }
    }

    processVertexLate(g: Graph, v: number) {
        // Check if root articulation
        // if the root node has more than 1 child it is a articulation vertex
            if (this.state.parent[v] == -1) {
                if (this.treeOutDegree[v] > 1) {
                    this.rootArticulations.push(v);
                    return;
                }
            }    

            const parentIsRoot = (this.state.parent[this.state.parent[v]] === -1)
            if ((this.reachableAncestor[v] === this.state.parent[v]) && (!parentIsRoot)) {
                this.parentArticulations.push(this.state.parent[v]);
            }

            if (this.reachableAncestor[v] == v) {
                this.bridgeArticulations.push(this.state.parent[v]);
                if (this.treeOutDegree[v] > 0) { // check if v is not a leaf
                    this.bridgeArticulations.push(v);
                }
            }

            const timeV = this.state.entryTime[this.reachableAncestor[v]];
            const timeP = this.state.entryTime[this.reachableAncestor[parent[v]]];
            if (timeV < timeP) {
                this.reachableAncestor[this.state.parent[v]] = this.reachableAncestor[v];
            }
        }
}