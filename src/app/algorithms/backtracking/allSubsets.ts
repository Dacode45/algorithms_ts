import { backtrack } from "./backtrack";

export function allSubsets(n) {
    let a = [false];
    backtrack(a, 0, n, new SubsetProcessor());
}

export class SubsetProcessor {
    isASolution(a, k: number, n: number): boolean {
        return k == n;
    }

    constructCandidates(a, k: number, n: number): boolean[] {
        return [true, false];
    }

    processSolution(a, k) {
        let string = a.slice(1).reduce((s, found, index) => {
            if (found) {
                s += ` ${index}`;
            }
            return s;
        }, '{');
        string += ' }'
        console.log(string, a, k);
    }
}