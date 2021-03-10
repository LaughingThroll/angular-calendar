import { TThemes } from './interfaces/utils'
export const TEAMS_URL: string = "https://jsonplaceholder.typicode.com/posts/1"

export const THEMES: TThemes[]  = [
  ["melrose-theme", "melrose-theme--background"],
  ["malibu-theme", "malibu-theme--background"],
  ["mona-lisa-theme", "mona-lisa-theme--background"],
  ["atomic-tangerine-theme", "atomic-tangerine-theme--background"],
]

export const OPTIONS_FOR_GET_REQUEST = {
  method: "PUT",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
}
