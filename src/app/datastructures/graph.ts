import { TransverseState } from "../algorithms/graphs/tranversState";

const MAX_V = 100;

export interface EdgeNode {
    y: number;
    weight?: number;
    capacity?: number;
    flow?: number;
    residual?: number;
    next: EdgeNode;
}

export class Graph {
    // adjacency
    edges = new Array<EdgeNode>(MAX_V);
    // out degree
    degree = new Array<number>(MAX_V);
    // values
    nVertices: number;
    nEdges: number;

    constructor(public directed: boolean) {
        this.nVertices = 0;
        this.nEdges = 0;

        for (let i = 0; i < MAX_V; i++) this.degree[i] = 0;
        for (let i = 0; i < MAX_V; i++) this.edges[i] = null;
    } 
    insertEdge(x: number, y: number, directed?: boolean) {
        const p: EdgeNode = {
            y,
            next: this.edges[x]
        }
        this.edges[x] = p;
        this.degree[x]++;
        if (!directed) {
            this.insertEdge(y, x, true);
        } else {
            this.nEdges++;
        }
    }
}

export enum EdgeClassification {
    UNCLASSIFIED,
    TREE,
    BACK,
    FORWARD,
    CROSS,
}

export function edgeClassification(state: TransverseState, x: number, y: number): EdgeClassification {
    if (state.parent[y] == x) return EdgeClassification.TREE;
    if (state.discovered[y] && !state.processed[y]) return EdgeClassification.BACK;
    if (state.processed[y] && (state.entryTime[y] > state.entryTime[x])) return EdgeClassification.FORWARD;
    if (state.processed[y] && (state.entryTime[y] < state.entryTime[x])) return EdgeClassification.CROSS;
}
