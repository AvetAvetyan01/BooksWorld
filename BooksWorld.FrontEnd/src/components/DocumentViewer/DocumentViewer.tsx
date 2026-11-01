import { Document, Page } from "react-pdf"
import { useWindowSize } from "../../hooks/contexts/useWindowSize"
import { useState } from "react"
import "./documentViewer.scss"

export function DocuemntViewer({ fileSrc="/documents/GoF.pdf" }){
  const { windowWidth } = useWindowSize()
  const [pagesCount, setPagesCount] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState(1)

  const pageWidth = () => {
    if (windowWidth >= 500)      return 500
    else if (windowWidth >= 400) return 400
    else if (windowWidth >= 350) return 350
    else if (windowWidth >= 300) return 300
    else                         return 250
  }

  return (
    <div onClick={(e) => { e.preventDefault(); e.stopPropagation() }} className="document-viewer">
      <Document file={fileSrc} onLoadSuccess={(e) => setPagesCount(e.numPages)}>
        <Page 
          // height={windowHeight}
          width={pageWidth()}
          loading={<div className="page-loader"></div>}
          pageNumber={pageNumber}/>

        {(windowWidth > 1000 && pagesCount && pageNumber + 1 <= pagesCount) ?
          <Page 
            loading={<div className="page-loader"></div>}
            width={500} 
            pageNumber={pageNumber + 1}/> : ''}
      </Document>

      <div className="info">
        <div className="controls">
          <button disabled={pageNumber <= 1} onClick={() => setPageNumber(pageNumber - 1)}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          <button disabled={pagesCount != undefined && pageNumber >= pagesCount - 1} 
            onClick={() => setPageNumber(pageNumber + 1)}>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  )
}