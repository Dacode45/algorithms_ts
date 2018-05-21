import { backtrack } from "./backtrack";

export function allPermutations(n) {
    let a = [false];
    backtrack(a, 0, n, new PermutationProcessor());
}

export class PermutationProcessor {
    isASolution(a, k: number, n: number): boolean {
        return k == n;
    }

    constructCandidates(a, k: number, n: number): number[] {
        const inPermutation = [];
        for (let i = 1; i <= n; i++) {
            inPermutation[i] = false;
        }
        for (let i = 0; i < k; i++) {
            inPermutation[a[i]] = true;
        }
        const candidates = [];
        for (let i = 1; i <= n; i++) {
            if (!inPermutation[i]) {
                candidates.push(i);
            }
        }
        return candidates
    }

    processSolution(a, k) {
        console.log(a.join(','));
    }
}