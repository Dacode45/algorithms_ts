export interface TransverseState {
    queue?: number[];
    discovered?: {[k: number]: boolean};
    processed?: {[k: number]: boolean};
    parent?: {[k: number]: number};
    entryTime?: {[k: number]: number};
    exitTime?: {[k: number]: number};
    finished?: boolean;
}
