export interface BacktrackProcessor {
    isASolution(a: Array<any>, k: number, input?): boolean;
    processSolution?(a: Array<any>, k: number, input?);
    constructCandidates(a: Array<any>, k: number, input): Array<any>;
    makeMove?(a: Array<any>, k: number, input);
    unmakeMove?(a: Array<any>, k: number, input);
    finished?: boolean;
}

export function backtrack(a: Array<any>, k: number, input, processor: BacktrackProcessor) {
    if (processor.isASolution(a, k, input)) {
        if (processor.processSolution) processor.processSolution(a, k, input);
    } else {
        k = k + 1;
        const candidates = processor.constructCandidates(a, k, input);
        for (let i = 0; i < candidates.length; i++) {
            a[k] = candidates[i];
            if (processor.makeMove) processor.makeMove(a, k, input);
            backtrack(a, k, input, processor);
            if (processor.unmakeMove) processor.unmakeMove(a, k, input);
            if (processor.finished) return; // terminate early
        }
    }
}
