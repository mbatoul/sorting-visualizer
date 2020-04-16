<template>
  <div>
    <div id="navbar-wrapper" class='w-full h-20 bg-white shadow'>
      <div id="navbar" class='p-4 h-full flex justify-between'>
        <div class='flex'>
          <button
            class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-1"
            v-on:click='randomizeBars()'
          >
            Randomize bars
          </button>
        </div>

        <div>
          <button
            class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            v-on:click="$bubbleSort()"
          >
            Bubble sort
          </button>
          <button
            class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            v-on:click="$insertionSort()"
          >
            Insertion sort
          </button>
          <button
            class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            v-on:click="$selectionSort()"
          >
            Selection sort
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
import store from "@/store";

export default Vue.extend({
  name: 'Main',

  computed: {
    arrayOfBars: function(): number[] {
      return this.$store.state.arrayOfBars;
    },
  },

  methods: {
    randomizeBars: function (): void {
      this.$store.commit('randomizeBars');
    },
    barColor: function (index: number): string {
      if (index === this.$store.state.pointerOne) {
        return 'bg-green-500';
      } else if (index === this.$store.state.pointerTwo) {
        return 'bg-red-500';
      } else {
        return 'bg-blue-500';
      }
    },
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
