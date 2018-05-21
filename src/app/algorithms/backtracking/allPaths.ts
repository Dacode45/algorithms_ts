import { backtrack } from "./backtrack";
import { Graph } from "../../datastructures/graph";

export function allPaths(g: Graph, start: number, end: number) {
    let a = [false];
    backtrack(a, start, { g, end}, new SimplePathProcessor());
}

interface FromTo {
    g: Graph,
    end: number,
}

export class SimplePathProcessor {
    solutionCount = 0;
    isASolution(a, k: number, t: FromTo): boolean {
        return a[k] == t.end;
    }

    constructCandidates(a, k: number, t: FromTo): number[] {
        const inSolution = [];
        for (let i = 0; i < t.g.nVertices; i++) {
            inSolution[i] = false;
        }
        for (let i = 1; i < k; i++) inSolution[a[i]] = true;

        if (k == 1) {
            return [1];
        }
        
        const candidates = [];
        const last = a[k - 1];
        let edge = t.g.edges[last];
        while (edge) {
            if (!inSolution[edge.y]) {
                candidates.push(edge.y);
            }
            edge = edge.next;
        }
        return candidates;
    }

    processSolution(a, k) {
        this.solutionCount++;
        console.log('solution count');
    }
}