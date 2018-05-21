import { insertionSort } from './insertion';
import { heapSort } from './heapsort';
import { mergeSort } from './mergesort';
import { quicksort } from './quicksort';

describe('sorting algorithms', () => {
    let test;
    let other;
    beforeEach(() => {
        test = [3, 6, 1, 0, 8, 9, 2];
        other = [...test];
        other.sort();
    });
    it('implements insertion sort', () => {
        expect(insertionSort(test)).toEqual(other);
    })
    it('implements heap sort', () => {
        expect(heapSort(test)).toEqual(other);
    })
    it('implements merge sort', () => {
        expect(mergeSort(test, 0, test.length - 1)).toEqual(other);
    })
    it('implements quick sort', () => {
        expect(quicksort(test, 0, test.length - 1)).toEqual(other);
    })
})