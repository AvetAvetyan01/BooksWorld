import type { BooksRequest } from "../../types/requests/BooksRequest";
import type { Language } from "../../types/unions/Language";
import { useSearchParams } from "react-router";

export function useBooksSearchParams(){ 
  const [searchParams, setSearchParams] = useSearchParams()
  
  const pageParam            = searchParams.get("page")
  const sizeParam            = searchParams.get("size") 
  const genreIdParam         = searchParams.get("genreId")
  const authorIdParam        = searchParams.get("authorId")
  const sortByParam          = searchParams.get("sortBy") as "Rating" | "Newest"
  const searchFieldParam     = searchParams.get("searchField") as "Id" | "Title" | "ISBN"
  const searchLanguageParam  = searchParams.get("searchLanguage") as Language

  const formats   = searchParams.get("formats")  ?.split("-")
  const languages = searchParams.get("languages")?.split("-")

  const booksSearchParams:BooksRequest = {
    page            : pageParam && !Number.isNaN(+pageParam)? +pageParam : 1,
    size            : sizeParam && !Number.isNaN(+sizeParam)? +sizeParam : 15,
    genreId         : genreIdParam && !Number.isNaN(+genreIdParam)? +genreIdParam : 1,
    authorId        : authorIdParam && !Number.isNaN(+authorIdParam)? +authorIdParam : undefined,
    sortBy          : sortByParam && ["Rating","Newest"].includes(sortByParam) ? sortByParam : "Rating",
    searchField     : searchFieldParam && ["Id","Title","ISBN"].includes(searchFieldParam) ? searchFieldParam : "Title",
    searchLanguage  : searchLanguageParam && ["Armenian","Russian","English","Frence","German","Italian"].includes(searchLanguageParam) ? searchLanguageParam : "English",
    search          : searchParams.get("search") || "",
    highRated       : !!searchParams.get("highRated"),
    discounted      : !!searchParams.get("discounted"),
    byAscending     : !!searchParams.get("byAscending"),
    paper           : !!formats?.includes("paper"),
    electronic      : !!formats?.includes("electronic"),
    audio           : !!formats?.includes("audio"),
    armenian        : !!languages?.includes("armenian"),
    english         : !!languages?.includes("english"),
    russian         : !!languages?.includes("russian"),
    frence          : !!languages?.includes("frence"),
    german          : !!languages?.includes("german"),
    italian         : !!languages?.includes("italian"),
  }
  
  const booksDefaultSearchParams: BooksRequest = {
    page            : 1,
    size            : 15, // 30
    authorId        : undefined,
    sortBy          : "Rating",
    search          : "", // undefined
    searchField     : "Title",
    searchLanguage  : "English",
    genreId         : 1,
    highRated       : false,
    discounted      : false,
    byAscending     : false,
    paper           : false,
    audio           : false,
    electronic      : false,
    armenian        : false,
    english         : false,
    russian         : false,
    frence          : false,
    german          : false,
    italian         : false,  
  }

  const isChanged = (booksParams: BooksRequest = booksSearchParams) => {
    const paramsKeys = Object.keys(booksParams)
    const paramsDefaultKeys = Object.keys(booksDefaultSearchParams)

    if (paramsKeys.length != paramsDefaultKeys.length ||
        paramsDefaultKeys.some(key => !paramsKeys.includes(key))) return false

    for (const key in booksDefaultSearchParams)
      if (Reflect.get(booksParams, key) != Reflect.get(booksDefaultSearchParams, key)) 
        return true

    return false
  }

  const ValidateRequestParams = (rp: BooksRequest) => 
  {
    if (!rp.page || (Number.isNaN(+(rp.page)) || +rp.page < 1))
      rp.page = 1

    if (!rp.searchField || !["Id", "Title", "ISBN"].includes(rp.searchField))
      rp.searchField = "Title"
    
    if (!rp.authorId)
      rp.authorId = undefined
      
    if (rp.sortBy && !["Rating", "Newest"].includes(rp.sortBy))
      rp.sortBy = "Rating"
    
    if (rp.searchLanguage && !["English","Russian","Armenian"].includes(rp.searchLanguage))
      rp.searchLanguage = "English"

    if (rp.search && rp.search.length > 30)
      rp.search = rp.search.slice(0,30)
    
    if (rp.genreId && Number.isNaN(+rp.genreId))    
      rp.genreId = 1
    
    if (rp.authorId && Number.isNaN(+rp.authorId))    
      rp.authorId = undefined

    return rp
  }
  
  const setBooksSearchParams = (sp: BooksRequest) => {
    sp = ValidateRequestParams(sp)

    const languages = sp.armenian || sp.english || sp.russian || sp.frence || sp.german || sp.italian
    ? [
      sp.armenian ? "armenian" : null,
      sp.english ? "english" : null,
      sp.russian ? "russian" : null,
      sp.frence ? "frence" : null,
      sp.german ? "german" : null,
      sp.italian ? "italian" : null,
    ]
    .filter(l => l).join("-")
    : ''
    
    const formats = sp.audio || sp.electronic || sp.paper
    ? [
      sp.paper ? "paper" : null,
      sp.audio ? "audio" : null,
      sp.electronic ? "electronic" : null,
    ]
    .filter(f => f).join("-")
    : ''

    const changableParams = Object.fromEntries([
      ["page", sp.page],  
      ["size", sp.size],
      ["search", sp.search],
      ["searchField", sp.searchField],
      ["sortBy", sp.sortBy],
      ["searchLanguage", sp.searchLanguage],
      ["genreId", sp.genreId],
      ["byAscending", sp.byAscending],
      ["highRated", sp.highRated], 
      ["discounted", sp.discounted],
      ["authorId", sp.authorId],
      ["formats", formats],
      ["languages", languages]
    ]
    .filter(elm => elm[1]))

    setSearchParams(changableParams)
  }

  return { isChanged, booksSearchParams, setBooksSearchParams }
}