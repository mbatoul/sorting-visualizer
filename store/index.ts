import Vuex from 'vuex';
import { numberOfBars, randomNumberBetween } from '~/plugins/utils';

const createStore = () => {
  return new Vuex.Store({
    state: {
      arrayOfBars: <number[]> [],
      pointerOne: <any> null,
      pointerTwo: <any> null,
      pivot: <any> null,
    },
  
    mutations: {
      replaceArrayOfBars: async function (state, newArray: number[]): Promise<void> {
        state.arrayOfBars = newArray;
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
    },
  
    actions: {
      replaceArrayOfBars: async function (context, newArray: number[]): Promise<void> {
        context.commit('replaceArrayOfBars', newArray);
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
      }
    }
  });
};

export default createStore;
