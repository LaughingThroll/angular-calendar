import { ID } from 'src/app/interfaces/common'

export const createArrayFromNumber = (number: number): number[] => new Array(number).fill(0).map((_, i) => i + 1)

export const findById = <T extends { [key: string]: any }>(arr: T[], id: string, currentId: ID): T | undefined => {
  return arr.find((el: T) => el[id] === currentId)
}