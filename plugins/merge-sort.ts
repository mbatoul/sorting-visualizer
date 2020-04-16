import Vue from 'vue';
import { timer, delayInMs, swap, numberOfBars } from '~/plugins/utils';

declare module 'vue/types/vue' {
  interface Vue {
    $mergeSort(): void
  }
}

Vue.prototype.$mergeSort = async function () {
  let newArray: number[] = this.$store.state.arrayOfBars;
  this.$store.dispatch('setPointerOne', null);
  this.$store.dispatch('setPointerTwo', null);
  this.$store.dispatch('replaceArrayOfBars', []);
  await this.$store.dispatch('replaceArrayOfBars', newArray);
  await timer(delayInMs(numberOfBars));
}