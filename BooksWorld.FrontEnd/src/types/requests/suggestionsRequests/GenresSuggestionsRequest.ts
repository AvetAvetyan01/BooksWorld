import type { SuggestionsRequest } from "./SuggestionsRequest";

export type GenresSuggestionsRequest = SuggestionsRequest & {
  // searchField: "Id" | "Name"
  searchField: string
}