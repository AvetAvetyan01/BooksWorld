import type { BooksRequest } from "../../../types/requests/BooksRequest";
import type { PagedCollection } from "../../../generics/PagedCollection.ts";
import { useLanguage } from "../../contexts/useLanguage.ts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { IBookCard } from "../../../interfaces/cards/IBookCard.ts";

export function useBooks(request: BooksRequest){
  const { language } = useLanguage()

  return useQuery({
    queryKey: ["GET", "books", language, request],
    queryFn: async () => 
    {
      const requestUrl = `${import.meta.env.VITE_API_URL}/books${GetSearchUrlByRequestParams({...request, searchLanguage: language })}`

      const books = await axios.get<PagedCollection<IBookCard>>(requestUrl)      

      return books
    },
    select: (d) => d.data,
    placeholderData: (p) => p
  }) 
}

function GetSearchUrlByRequestParams(rp: BooksRequest)
{
  const requestUrl = 
    `?page=${rp.page && rp.page}` + 
    (rp.size            ? `&size=${rp.size}` :  '') + 
    (rp.sortBy          ? `&sortBy=${rp.sortBy}` : '') + 
    (rp.search          ? `&search=${rp.search}` : '') + 
    (rp.searchLanguage  ? `&searchLanguage=${rp.searchLanguage}` : '') + 
    (rp.searchField     ? `&searchField=${rp.searchField}` : '') + 
    (rp.byAscending     ? `&byAscending=${rp.byAscending}` : '') + 
    (rp.discounted      ? `&discounted=${rp.discounted}` : '') +
    (rp.highRated       ? `&highRated=${rp.highRated}` : '') +
    (rp.authorId        ? `&authorId=${rp.authorId}` : '') +
    (rp.genreId         ? `&genreId=${rp.genreId}` : '') +
    
    (rp.audio || rp.electronic || rp.paper
      ? "&formats=" + 
        [
          rp.paper ? "paper" : [],
          rp.audio ? "audio" : [],
          rp.electronic ? "electronic" : []
        ]
        .flat().join(',')
      : ''
    ) + 
    (rp.armenian || rp.english || rp.russian || rp.frence || rp.german || rp.italian 
      ? "&languages=" +
        [
          rp.armenian  ? "armenian" : [],
          rp.english   ? "english"  : [],
          rp.russian   ? "russian"  : [],
          rp.frence    ? "frence"   : [],
          rp.german    ? "german"   : [],
          rp.italian   ? "italian"  : [],
        ]
        .flat().join(',')
      : ''
    );

  return requestUrl
}