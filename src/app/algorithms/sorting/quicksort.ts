export function quicksort<T>(arr: Array<T>, low: number, high: number): Array<T> {
    if ((high - low) > 0) {
        const p = partition(low, high);
        quicksort(arr, low, p - 1);
        quicksort(arr, p + 1, high);
    }
    return arr;

    function partition(l: number, high: number): number {
        const p = high;
        let firstHigh = l;
        for (let i = l; i <= high; i++) {
            if (arr[i] < arr[p]) {
                swap(i, firstHigh++);
            }
        }
        swap(p, firstHigh);
        return firstHigh;
    }

    function swap(i: number, j: number) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}