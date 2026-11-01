import { GoBackButton } from "../../../../../components/GoBackButton/GoBackButton"
import { type FieldErrors, type FieldValues, useFormContext } from "react-hook-form"
import "./configHeader.scss"
import { useTranslation } from "react-i18next"

type Props<TModel> = {
  id?: number
  mutations: {
    delete: { mutation: () => void, pending: boolean }
    create: { mutation: (data: TModel) => void, pending: boolean }
    edit:   { mutation: (data: TModel) => void, pending: boolean }
  }
}

// export function ConfigHeader({ id, mutations } : Props){
export function ConfigHeader<TModel extends FieldValues>({ id, mutations } : Props<TModel>){
  const { t } = useTranslation()
  const { handleSubmit } = useFormContext<TModel>()

  const onError = (err: FieldErrors<TModel>) => console.log("Error", err)
  
  return (
    <div className="config-header"> 
      <GoBackButton />

      {(!Number.isNaN(id) && id) && <h2 className="id">ID: {id}</h2>}

      <div className="buttons">
        {id
          ? 
          <>
            <button 
              className="edit"   
              onClick={handleSubmit(mutations.edit.mutation, onError)} 
              disabled={mutations.edit.pending}>
              {t("config-header.edit-button")}
            </button>

            <button 
              className="delete" 
              onClick={handleSubmit(mutations.delete.mutation, onError)} 
              disabled={mutations.delete.pending}>
              {t("config-header.delete-button")}
            </button>
          </>
          : 
          <button 
            className="create"  
            onClick={handleSubmit(mutations.create.mutation, onError)} 
            disabled={mutations.create.pending}>
            {t("config-header.create-button")}
          </button>}
      </div>
    </div>
  )
}