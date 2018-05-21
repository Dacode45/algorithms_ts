import { Heap } from "../../datastructures/heap";

export function mergeSort<T>(arr: Array<T>, low: number, high: number): Array<T> {
    if (low < high) {
        const middle = Math.floor((low + high) / 2);
        mergeSort(arr, low, middle);
        mergeSort(arr, middle + 1, high);
        merge(arr, low, middle, high);
    }
    return arr;

    function merge(arr, low, middle, high) {
        const a1 = arr.slice(low, middle + 1);
        const a2 = arr.slice(middle + 1, high + 1);

        const q1 = Heap.fromArray(a1);
        const q2 = Heap.fromArray(a2);

        let index = low;
        while(!(q1.isEmpty() || q2.isEmpty())) {
            if (q1.head() > q2.head()) {
                arr[index++] = q2.extractMin();
            } else {
                arr[index++] = q1.extractMin();
            }
        }
        while(!q1.isEmpty()) arr[index++] = q1.extractMin();
        while(!q2.isEmpty()) arr[index++] = q2.extractMin();
    }
}