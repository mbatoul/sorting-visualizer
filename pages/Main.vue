<template>
  <div>
    <div id="navbar-wrapper" class='w-full h-20 bg-white shadow'>
      <div id="navbar" class='p-4 h-full flex justify-between'>
        <div class='flex'>
          <button
            class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-1"
            v-on:click='generateBars'
          >
            Generate bars
          </button>
        </div>

        <div>
          <button
            class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            v-on:click="startSort('bubble')"
          >
            Bubble sort
          </button>
          <button
            class="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded opacity-50 cursor-not-allowed"
          >
            Merge sort
          </button>
          <button
            class="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded opacity-50 cursor-not-allowed"
          >
            Quick sort
          </button>
          <button
            class="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded opacity-50 cursor-not-allowed"
          >
            Heap sort
          </button>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Main',

  data: function () {
    return {
      numberOfBars: <number> 50,
      arrayOfBars: <number[]> [],
      currentSorted: <number[]> [],
      currentBubble: <any> null,
      nextBubble: <any> null,
    }
  },

  computed: {
    delay: function (): number {
      return 1 / this.numberOfBars * 5;
    }
  },

  methods: {
    randomNumberBetween: function (min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    generateBars: function () {
      this.currentBubble = null;
      this.nextBubble = null;
      this.numberOfBars = this.randomNumberBetween(5, 200);
      const array: number[] = [];
      for (let i = 0; i < this.numberOfBars; i++) {
        const value: number = this.randomNumberBetween(10, 100); 
        array.push(value);
      }
      this.arrayOfBars = [];
      this.arrayOfBars = array;
    },

    startSort: function (algorithm: string) {
      switch (algorithm) {
        case 'bubble': this.bubbleSort();
      }
    },

    bubbleSort: async function () {
      let isSorted: boolean = false;
      let counter: number = 0;
      while (!isSorted) {
        isSorted = true;
        for (let i = 0; i < this.arrayOfBars.length - 1 - counter; i++) {
          this.currentBubble = i;
          this.nextBubble = i + 1;
          let newArray: number[] = this.arrayOfBars;
          if (this.arrayOfBars[i] > this.arrayOfBars[i + 1]) {
            const tmp = newArray[i];
            newArray[i] = newArray[i + 1];
            newArray[i + 1] = tmp;
            isSorted = false;
          }
          this.arrayOfBars = [];
          this.arrayOfBars = newArray;
          await this.timer(this.delay);
        }
        counter += 1;
      }
    },

    barColor: function (index: number): string {
      if (index === this.currentBubble) {
        return 'bg-red-300';
      } else if (index === this.nextBubble) {
        return 'bg-blue-500';
      } else {
        return 'bg-gray-600';
      }
    },

    timer: function (ms: number): Promise<void> {
      return new Promise(res => setTimeout(res, ms));
    }
  },

  mounted: function () {
    this.generateBars();
  }
})
</script>

<style>
  #bars-container {
    height: calc(100vh - 5rem);
  }
</style>
