import { BooksFilterContext } from "../../contextProviders/OpenedBooksFilter/BooksFilterContext";
import { useContext } from "react";

export function useBooksFilter(){
  return useContext(BooksFilterContext)
}