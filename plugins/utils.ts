declare module 'vue/types/vue' {
  interface Vue {
    $timer(ms: number): Promise<void>,
    $delay(numberOfBars: number): number,
    $randomNumberBetween(min: number, max: number): number
  }
}

export const timer = function (ms: number): Promise<void> {
  return new Promise(res => setTimeout(res, ms));
}

export const delayInMs = function (numberOfBars: number): number {
  return 1 / numberOfBars * 10;
}

export const randomNumberBetween = function (min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const swap = function (i: number, j: number, array: number[]): void {
  const tmp: number = array[i];
  array[i] = array[j];
  array[j] = tmp;
}