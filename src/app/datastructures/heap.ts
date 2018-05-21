export class Heap<T> {
    arr: Array<T>;
    n = 0;
    constructor(size?: number) {
        this.arr = new Array(size || 100);
    }

    bubbleUp(i: number) {
        if (this.parent(i) === -1) return;
        if (this.arr[this.parent(i)] > this.arr[i]) {
            this.swap(i, this.parent(i));
            this.bubbleUp(this.parent(i));
        }
    }

    bubbleDown(i: number) {
        let child = this.child(i);
        let minIndex = i;
        for (let j = 0; j <= 1; j++) {
            if ((child + j) <= this.n) {
                if (this.arr[minIndex] > this.arr[child + j]) {
                    minIndex = child + j;
                }
            }
        }
        if (minIndex != i) {
            this.swap(minIndex, i);
            this.bubbleDown(minIndex);
        }
    }

    parent(i: number): number {
        if (i <= 1) return -1;
        return Math.floor(i / 2);
    }
    child(i: number): number {
        return 2 * i;
    }

    head() {
        return this.arr[1];
    }

    insert(x: T) {
        this.arr[++this.n] = x;
        this.bubbleUp(this.n);
    }

    swap(i: number, j: number) {
        const temp = this.arr[i];
        this.arr[i] = this.arr[j];
        this.arr[j] = temp;
    }

    extractMin(): T {
        const min = this.arr[1];
        this.arr[1] = this.arr[this.n--];
        this.bubbleDown(1);
        return min;
    }

    isEmpty(): boolean {
        return this.n < 1;
    }



    static fromArray<T>(arr: Array<T>) {
        const heap = new Heap<T>(2 * arr.length);
        heap.n = arr.length;
        for (let i = 0; i < arr.length; i++) {
            heap.arr[i + 1] = arr[i];
        }
        for(let i = heap.n; i >= 1; i--) heap.bubbleDown(i)
        return heap;
    }
}