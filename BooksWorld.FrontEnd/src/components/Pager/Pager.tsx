import type { MouseEvent } from "react"
import "./pager.scss"

type PagerProps = {
  data?: {
    page: number
    size: number
    pagesCount: number
    hasPrevious: boolean
    hasNext: boolean
  },
  submit: (newPage: number) => void
}

export function Pager({ data, submit } : PagerProps) {
  if (!data) return;

  const pages = FindNighbours(data.page, data.pagesCount, 2)

  const changePage = (e: MouseEvent<HTMLLIElement>) => {
    const newPage = e.currentTarget.dataset.page
    
    if (newPage)
    {
      window.scrollTo({ top: 0, behavior: "smooth" })
  
      submit(+newPage)
    }
  }

  if (data && data.pagesCount > 1)
  return ( 
    <ul className="pager">
      {data.hasPrevious && 
        <li data-page={data.page - 1} onClick={changePage}>{"<"}</li>}
      {
        pages.map((page) =>
          <li
            key={page}
            data-page={page}
            className={page == data.page ? "active" : ""}
            onClick={changePage}
            >
            {page}
          </li>
        )
      }
      {data.hasNext && 
        <li data-page={data.page + 1} onClick={changePage}>{">"}</li>}
    </ul>
  )
}

function FindNighbours(currentPage: number, pagesCount: number, nighboursCount: number){
  const nighbours: number[] = [currentPage]

  for (let i = 1; i <= nighboursCount; i++){
    const hasPrev = currentPage - i > 0
    const hasNext = currentPage + i <= pagesCount

    if (hasPrev) nighbours.unshift(currentPage - i)
    if (hasNext) nighbours.push(currentPage + i)
  }

  return nighbours
}