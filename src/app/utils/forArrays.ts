import { ID } from 'src/app/interfaces/common'

export const createArrayFromNumber = (number: number): number[] => new Array(number).fill(0).map((_, i) => i + 1)


declare global {
  interface Array<T> {
    toNumber(): number[] 
  } 
}


Array.prototype.toNumber = function() {
  return this.map(Number)
}

