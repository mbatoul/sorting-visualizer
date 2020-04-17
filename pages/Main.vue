<template>
  <div>
    <div id="navbar-wrapper" class='w-full h-20 bg-white shadow'>
      <div id="navbar" class='p-4 h-full flex justify-between'>
        <div class='flex'>
          <button
            v-bind:class='randomizeBarsButtonClasses()'
            v-on:click='randomizeBars()'
          >
            Randomize bars
          </button>
        </div>
        <div class='flex'>
          <div
            class="mr-2"
            v-for='(algorithm, index) in algorithms'
            v-bind:key='index'
          >
            <button
              v-bind:class='algoButtonClasses()'
              v-on:click="startSorting(algorithm)"
            >
              {{ algorithm }} sort
            </button>
          </div>
        </div>

      </div>
    </div>

    <div id="bars-container" class='w-full h-full flex flex-grow justify-center items-end px-6 pt-6'>
      <div
        v-for='(element, index) in arrayOfBars'
        v-bind:key='index'
        class='flex-grow mr-1'
        v-bind:style="{ 'height': `${element}%` }"
        v-bind:class='barColor(index)'
      >
      </div>
    </div>

    <div id="footer-wrapper" class='w-full h-24 bg-white'>
      <div id="footer" class='flex justify-center items-center h-full'>
        <p class='text-gray-500'>This project was made by <a href='https://github.com/mbatoul/' class='underline text-blue-500 hover:no-underline' target='_blank'>Mathis Batoul</a> with <span class='text-gray-600 font-bold'>NuxtJS</span>, <span class="text-gray-600 font-bold">Typescript</span> and <span class="text-gray-600 font-bold">TailwindCSS</span>.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import store from "@/store";
import { timer, delayInMs, swap, numberOfBars } from '~/plugins/utils';

export default Vue.extend({
  name: 'Main',

  computed: {
    arrayOfBars: function(): number[] {
      return this.$store.state.arrayOfBars;
    },
    algorithms: function(): number[] {
      return this.$store.state.algorithms;
    },
  },

  methods: {
    resetPointers: function (): void {
      this.$store.dispatch('setPointerOne', null);
      this.$store.dispatch('setPointerTwo', null);
    },
    randomizeBars: function (): void {
      if (this.$store.state.isRunning) return;
      
      this.$store.dispatch('replaceSortedArray', []);
      this.$store.dispatch('randomizeBars');
    },
    barColor: function (index: number): string {
      if (index === this.$store.state.pointerOne) {
        return 'bg-red-500';
      } else if (index === this.$store.state.pointerTwo) {
        return 'bg-green-500';
      } else if (this.$store.state.sortedArray.includes(index)) {
        return 'bg-pink-500';
      } else {
        return 'bg-blue-500';
      }
    },
    algoButtonClasses: function(): string {
      if (this.$store.state.isRunning) {
        return 'bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed';
      } else {
        return 'bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded';
      }
    },
    randomizeBarsButtonClasses: function (): string {
      if (this.$store.state.isRunning) {
        return 'bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-1 opacity-50 cursor-not-allowed';
      } else {
        return 'bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-1';
      }
    },
    startSorting: async function (algorithm: string): Promise<void> {
      if (this.$store.state.isRunning) return;

      this.$store.dispatch('toggleIsRunning');
      switch(algorithm) {
        case 'bubble':
          await this.$bubbleSort();
          break;
        case 'insertion':
          await this.$insertionSort();
          break;
        case 'selection':
          await this.$selectionSort();
          break;
        case 'merge':
          await this.$mergeSort();
          break;
        case 'quick':
          await this.$quickSort();
          break;
        case 'heap':
          await this.$heapSort();
          break;
      }
      this.resetPointers();
      for (let i = this.$store.state.arrayOfBars.length; i >= 0; i--) {
        this.$store.dispatch('addToSortedArray', i);
        await timer(delayInMs(numberOfBars));
      }
      this.$store.dispatch('toggleIsRunning');
    }
  },

  mounted: function (): void {
    this.randomizeBars();
  }
})
</script>

<style>
  #bars-container {
    height: calc(100vh - 5rem);
  }
</style>
