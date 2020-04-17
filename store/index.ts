import Vuex from 'vuex';
import { numberOfBars, randomNumberBetween } from '~/plugins/utils';

const createStore = () => {
  return new Vuex.Store({
    state: {
      arrayOfBars: [] as number[],
      sortedArray: [] as number[],
      pointerOne: null as any,
      pointerTwo: null as any,
      pivot: null as any,
      isRunning: false as boolean,
      algorithms: [
        'bubble',
        'heap',
        'insertion',
        'merge',
        'quick',
        'selection'
      ] as string[]
    },
  
    mutations: {
      replaceArrayOfBars: async function (state, newArray: number[]): Promise<void> {
        state.arrayOfBars = newArray;
      },
      addToSortedArray: function (state, index: number) {
        state.sortedArray.push(index);
      },
      replaceSortedArray: function (state, newArray: number[]): void {
        state.sortedArray = newArray;
      },
      setPointerOne: function (state, index: number): void {
        state.pointerOne = index;
      },
      setPointerTwo: function (state, index: number): void {
        state.pointerTwo = index;
      },
      setPivot: function (state, index: number): void {
        state.pivot = index;
      },
      randomizeBars: function (state): void {
        const array: number[] = [];
        for (let i = 0; i < numberOfBars; i++) {
          const value: number = randomNumberBetween(10, 100);
          array.push(value);
        }
        state.arrayOfBars = array;
      },
      toggleIsRunning(state): void {
        state.isRunning = !state.isRunning
      }
    },
  
    actions: {
      replaceArrayOfBars: async function (context, newArray: number[]): Promise<void> {
        context.commit('replaceArrayOfBars', newArray);
      },
      replaceSortedArray: async function (context, newArray: number[]): Promise<void> {
        context.commit('replaceSortedArray', newArray);
      },
      addToSortedArray: function (context, index: number) {
        context.commit('addToSortedArray', index);
      },
      setPointerOne: function (context, index: number): void {
        context.commit('setPointerOne', index)
      },
      setPointerTwo: function (context, index: number): void {
        context.commit('setPointerTwo', index)
      },
      setPivot: function (context, index: number): void {
        context.commit('setPivot', index)
      },
      randomizeBars: function (context) {
        context.commit('randomizeBars')
      },
      toggleIsRunning: function (context) {
        context.commit('toggleIsRunning');
      }
    }
  });
};

export default createStore;
