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
            class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            v-on:click="startSort('insertion')"
          >
            Insertion sort
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

    <div id="footer-wrapper" class='w-full h-24 bg-white'>
      <div id="footer" class='flex justify-center items-center h-full'>
        <p class='text-gray-500'>This project was made by <a href='https://github.com/mbatoul/' class='underline text-blue-500 hover:no-underline' target='_blank'>Mathis Batoul</a> with <span class='text-gray-600 font-bold'>NuxtJS</span>, <span class="text-gray-600 font-bold">Typescript</span> and <span class="text-gray-600 font-bold">TailwindCSS</span>.</p>
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
      pointerOne: <any> null,
      pointerTwo: <any> null,
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
      this.pointerOne = null;
      this.pointerTwo = null;
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
        case 'insertion': this.insertionSort();
      }
    },

    bubbleSort: async function () {
      let isSorted: boolean = false;
      let counter: number = 0;
      while (!isSorted) {
        isSorted = true;
        for (let i = 0; i < this.arrayOfBars.length - 1 - counter; i++) {
          this.pointerOne = i;
          this.pointerTwo = i + 1;
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
      this.pointerOne = null;
      this.pointerTwo = null;
    },

    insertionSort: async function () {
      for (let i = 1; i < this.arrayOfBars.length; i++) {
        let j = i;
        let newArray: number[] = this.arrayOfBars;
        while (j > 0 && newArray[j] < newArray[j - 1]) {
          this.pointerOne = j;
          this.pointerTwo = j - 1;
          const tmp = newArray[j];
          newArray[j] = newArray[j - 1];
          newArray[j - 1] = tmp;
          j -= 1;
          this.arrayOfBars = [];
          this.arrayOfBars = newArray;
          await this.timer(this.delay);
        }
      }
      this.pointerOne = null;
      this.pointerTwo = null;
    },

    barColor: function (index: number): string {
      if (index === this.pointerOne) {
        return 'bg-green-500';
      } else if (index === this.pointerTwo) {
        return 'bg-red-500';
      } else {
        return 'bg-blue-500';
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
