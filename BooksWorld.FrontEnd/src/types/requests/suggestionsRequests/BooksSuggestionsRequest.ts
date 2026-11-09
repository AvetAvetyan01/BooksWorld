import type { SuggestionsRequest } from "./SuggestionsRequest"

export type BooksSuggestionsRequest = SuggestionsRequest & {
  // searchField: "Id" | "Title" | "ISBN"
  searchField: string
}