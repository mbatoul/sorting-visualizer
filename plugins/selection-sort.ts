import Vue from 'vue';
import { timer, delayInMs, swap, numberOfBars } from '~/plugins/utils';

declare module 'vue/types/vue' {
  interface Vue {
    $selectionSort(): void
  }
}

Vue.prototype.$selectionSort = async function () {
  let newArray: number[] = this.$store.state.arrayOfBars;
  let startIdx: number = 0;
  while (startIdx < newArray.length - 1) {
    let smallestIdx: number = startIdx;
    this.$store.dispatch('setPointerOne', smallestIdx);
    for (let i: number = startIdx + 1; i < newArray.length; i++) {
      this.$store.dispatch('setPointerTwo', i);
      if (newArray[smallestIdx] > newArray[i]) {
        smallestIdx = i;
      }
      this.$store.dispatch('replaceArrayOfBars', []);
      this.$store.dispatch('replaceArrayOfBars', newArray);
      await timer(delayInMs(numberOfBars));
    }
    swap(smallestIdx, startIdx, newArray);
    startIdx++;
  }
  this.$store.dispatch('replaceArrayOfBars', []);
  this.$store.dispatch('replaceArrayOfBars', newArray);
  await timer(delayInMs(numberOfBars));
}