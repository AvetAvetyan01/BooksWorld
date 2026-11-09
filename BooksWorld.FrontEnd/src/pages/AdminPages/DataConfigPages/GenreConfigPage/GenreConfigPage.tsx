import { FormProvider, useForm } from "react-hook-form";
import type { GenreConfigModel } from "../../../../types/requests/configModels/GenreConfigModel";
import { useDeleteGenre } from "../../../../hooks/mutations/genreMutations/useDeleteGenre";
import { useCreateGenre } from "../../../../hooks/mutations/genreMutations/useCreateGenre";
import { ConfigHeader } from "../Common/ConfigHeader/ConfigHeader";
import { useEditGenre } from "../../../../hooks/mutations/genreMutations/useEditGenre";
import { useParams } from "react-router";
import { useGenre } from "../../../../hooks/queries/genreQueries/useGenre";
import { useTranslation } from "react-i18next";
import { GenreDataSearch } from "../Common/DataSetters/GenreDataSearch/GenreDataSearch";
import { pickGenreName } from "../../../../utilities/languagePickers";
import { useLanguage } from "../../../../hooks/contexts/useLanguage";
import FormField from "../../../../components/Forms/Common/FormField/FormField";
import "./genreConfigPage.scss"

export function GenreConfigPage(){
  const params = useParams()
  const genreId = params.id ? +params.id : undefined
  const { t } = useTranslation()
  const { language } = useLanguage()
  const { data: genre, isLoading: isGenreLoading } = useGenre(genreId)
  const { data: baseGenre, isLoading: isBaseGenreLoading } = useGenre(genre?.baseId)
  const { mutate: createGenre, isPending: createGenrePending } = useCreateGenre()
  const { mutate: deleteGenre, isPending: deleteGenrePending } = useDeleteGenre()
  const { mutate: editGenre,   isPending: editGenrePending   } = useEditGenre()

  const methods = useForm<GenreConfigModel>({
    mode: "onChange",
    values: {
      Id: genre?.id,
      BaseId: genre?.baseId,
      Name_AM:  genre?.name_AM,
      Name_EN:  genre?.name_EN,
      Name_RU:  genre?.name_RU
    } as GenreConfigModel
  })

  const onCreate = (data: GenreConfigModel) => {
    createGenre(data)
  }
  const onDelete = () => {
    deleteGenre(genreId)
  }
  const onEdit = (data: GenreConfigModel) => {
    editGenre(data)
  }

  if (!isGenreLoading)
  return (
    <div className="genre-config-page">
    <FormProvider {...methods}>
      <ConfigHeader 
        id={genre?.id}
        mutations={{
          create: { mutation: onCreate, pending: createGenrePending },
          delete: { mutation: onDelete, pending: deleteGenrePending },
          edit:   { mutation: onEdit  , pending: editGenrePending   }
        }} />

      <FormField 
        fieldName={t("pages.genre-config.name_am")}
        registerName={"Name_AM"}
        isRequired={true} />

      <FormField 
        fieldName={t("pages.genre-config.name_en")}
        registerName={"Name_EN"}
        isRequired={true} />
      
      <FormField 
        fieldName={t("pages.genre-config.name_ru")}
        registerName={"Name_RU"}
        isRequired={true} />
      
      {(!isGenreLoading && !isBaseGenreLoading) &&
        <GenreDataSearch
          fieldName={t("models.genre.base-genre")}
          registerName="BaseId" 
          defaultGenre={(genre && baseGenre) && { id: genre.baseId, name: pickGenreName(language, baseGenre)}}/>}

    </FormProvider>
    </div>
  )
}