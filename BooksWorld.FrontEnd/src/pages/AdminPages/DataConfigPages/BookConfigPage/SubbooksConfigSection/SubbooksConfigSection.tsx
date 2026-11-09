import { useBookSubbooks } from "../../../../../hooks/queries/subbookQueries/useBookSubbooks"
import { SubbooksTable } from "./SubbooksTable/SubbooksTable"
import { SubbookForm } from "./SubbookConfigForm/SubbookForm"
import { useState } from "react"
import { Wrapper } from "../../../../../components/Wrapper/Wrapper"
import type { ISubbook } from "../../../../../interfaces/entities/ISubbook"
import { useTranslation } from "react-i18next"
import "./subbooksConfigSection.scss"

export function SubbooksConfigSection({ bookId } : { bookId: number }){
  const { t } = useTranslation()
  const { data: subbooks } = useBookSubbooks(bookId)
  const [activeSubbook, setActiveSubbook] = useState<ISubbook>()
  const [subbookFormIsOpen, setSubbookFormIsOpen] = useState(false)

  return (
    <>
    {subbookFormIsOpen && activeSubbook ?
      <Wrapper closer={() => setSubbookFormIsOpen(false)} isActive={subbookFormIsOpen}> 
        <SubbookForm
          subbook={activeSubbook}
          closer={() => setSubbookFormIsOpen(false)} />
      </Wrapper> : <></>}
    
    <div className="subbooks-config-section">
      <div className="header">
        <h3 className="title">{t("pages.subbook-config.title")} ( {subbooks?.length || 0} )</h3>

        <button 
          className="create-button" 
          onClick={() => {
            setActiveSubbook({ bookId } as ISubbook)
            setSubbookFormIsOpen(true)
          }}>
          <i className="fa-solid fa-plus"></i>
          <p>{t("pages.subbook-config.create-button")}</p>
        </button>

        <p className="error"></p>
      </div>


      {subbooks?.length ?
        <SubbooksTable 
          subbooks={subbooks}   
          onClick={(newSubbook) => {setActiveSubbook(newSubbook); setSubbookFormIsOpen(true)}}/> : false}
    </div>
    </>
  )
}