import Vue from 'vue';
import { timer, delayInMs, swap } from '~/plugins/utils';

declare module 'vue/types/vue' {
  interface Vue {
    $heapSort(): void
  }
}

Vue.prototype.$heapSort = async function () {
  let newArray: number[] = this.$store.state.arrayOfBars;
  this.$store.dispatch('setPointerOne', null);
  this.$store.dispatch('setPointerTwo', null);
  this.$store.dispatch('replaceArrayOfBars', []);
  await this.$store.dispatch('replaceArrayOfBars', newArray);
  await timer(delayInMs(this.$store.state.numberOfBars));
}