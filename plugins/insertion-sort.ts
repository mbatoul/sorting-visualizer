import Vue from 'vue';
import { timer, delayInMs } from '~/plugins/utils';

declare module 'vue/types/vue' {
  interface Vue {
    $insertionSort(): void
  }
}

Vue.prototype.$insertionSort = async function () {
  let newArray: number[] = this.$store.state.arrayOfBars;
  for (let i = 1; i < newArray.length; i++) {
    let j = i;
    while (j > 0 && newArray[j] < newArray[j - 1]) {
      this.$store.dispatch('setPointerOne', j);
      this.$store.dispatch('setPointerTwo', j - 1);
      const tmp = newArray[j];
      newArray[j] = newArray[j - 1];
      newArray[j - 1] = tmp;
      j -= 1;
      this.$store.dispatch('replaceArrayOfBars', []);
      await this.$store.dispatch('replaceArrayOfBars', newArray);
      await timer(delayInMs(this.$store.state.numberOfBars));
    }
  }
}