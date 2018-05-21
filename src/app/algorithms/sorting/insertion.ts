export function insertionSort<T>(arr: Array<T>): Array<T> {
    for (let i = 0; i < arr.length; i++) {
        let j = i;
        while ((j > 0) && arr[j] < arr[j - 1]) {
            swap(j, j - 1);
            j--;
        }
    }
    return arr;

    function swap(i: number, j: number) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}