import Vue from 'vue';
import { timer, delayInMs, swap, numberOfBars } from '~/plugins/utils';

declare module 'vue/types/vue' {
  interface Vue {
    $mergeSort(): void
  }
}

Vue.prototype.$mergeSort = async function () {
  let newArray: number[] = this.$store.state.arrayOfBars;
  console.log(typeof this.$store)
  mergeSort(newArray);
}

async function mergeSort(array: number[]) {
  if (array.length < 2) return;
  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle + 1, array.length - 1);
  mergeSort(left);
  mergeSort(right);
  merge(array, left, right);
}

async function merge(array: number[], left: number[], right: number[]) {
  let i = 0
  let j = 0
  let k = 0
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      array[k] = left[i]
      i += 1
    } else {
      array[k] = right[j]
      j += 1
    }
    k += 1
  }
  while (i < left.length) {
    array[k] = left[i]
    k += 1
    i += 1
  }
  while (j < right.length) {
    array[k] = right[j]
    k += 1
    j += 1
  }
}
