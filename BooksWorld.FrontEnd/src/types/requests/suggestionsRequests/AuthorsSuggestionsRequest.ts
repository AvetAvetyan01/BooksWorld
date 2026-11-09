import type { SuggestionsRequest } from "./SuggestionsRequest"

export type AuthorsSuggestionsRequest = SuggestionsRequest & {
  // searchField: "Id" | "FullName"
  searchField: string
}