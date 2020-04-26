import Vue from 'vue';
import { timer, delayInMs, swap, numberOfBars } from '~/plugins/utils';

declare module 'vue/types/vue' {
  interface Vue {
    $quickSort(): void,
    $quickSortHelper(): void
  }
}

Vue.prototype.$quickSort = async function () {
  let newArray: number[] = this.$store.state.arrayOfBars;
  this.$quickSortHelper(newArray, 0, newArray.length - 1);
}

Vue.prototype.$quickSortHelper = async function (array: number[], startIdx: number, endIdx: number) {
  if (startIdx >= endIdx) return;

  const pivotIdx = startIdx;
  let leftIdx = pivotIdx + 1;
  let rightIdx = endIdx;

  while (rightIdx >= leftIdx) {
    if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
      swap(leftIdx, rightIdx, array);
    }
    if (array[leftIdx] <= array[pivotIdx]) {
      leftIdx++;
    }
    if (array[rightIdx] >= array[pivotIdx]) {
      rightIdx--;
    }
    this.$store.dispatch('setPointerOne', leftIdx);
    this.$store.dispatch('setPointerTwo', rightIdx);
    this.$store.dispatch('setPivot', pivotIdx);
    this.$store.dispatch('replaceArrayOfBars', []);
    this.$store.dispatch('replaceArrayOfBars', array);
    await timer(delayInMs(numberOfBars));
  }

  swap(pivotIdx, rightIdx, array);

  const leftSubArrayIsSmaller = rightIdx - 1 - startIdx < endIdx - rightIdx + 1;

  if (leftSubArrayIsSmaller) {
    this.$quickSortHelper(array, startIdx, rightIdx - 1);
    this.$quickSortHelper(array, rightIdx + 1, endIdx);
  } else {
    this.$quickSortHelper(array, rightIdx + 1, endIdx);
    this.$quickSortHelper(array, startIdx, rightIdx - 1);
  }

  await timer(delayInMs(numberOfBars));
}
