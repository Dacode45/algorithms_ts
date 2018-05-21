import { Heap } from "../../datastructures/heap";

export function heapSort<T>(arr: Array<T>): Array<T> {
    const heap = Heap.fromArray<T>(arr);
    const sorted = [];
    while (heap.n !== 0) {
        sorted.push(heap.extractMin());
    }
    return sorted;
}