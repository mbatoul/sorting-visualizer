import Vue from 'vue';
import { timer, delayInMs, swap, numberOfBars } from '~/plugins/utils';

declare module 'vue/types/vue' {
  interface Vue {
    $bubbleSort(): void
  }
}

Vue.prototype.$bubbleSort = async function () {
  let isSorted: boolean = false;
  let counter: number = 0;
  let newArray: number[] = this.$store.state.arrayOfBars;
  while (!isSorted) {
    isSorted = true;
    for (let i: number = 0; i < newArray.length - 1 - counter; i++) {
      this.$store.dispatch('setPointerOne', i);
      this.$store.dispatch('setPointerTwo', i - 1);
      if (newArray[i] > newArray[i + 1]) {
        swap(i, i + 1, newArray);
        isSorted = false;
      }
      this.$store.dispatch('replaceArrayOfBars', []);
      this.$store.dispatch('replaceArrayOfBars', newArray);
      await timer(delayInMs(numberOfBars));
    }
    counter++;
  }
}
