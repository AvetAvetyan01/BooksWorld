import { useContext } from "react";
import { BooksFormContext } from "../../contextProviders/BooksForm/BooksFormContext";

export function useBooksForm(){
  return useContext(BooksFormContext)
}