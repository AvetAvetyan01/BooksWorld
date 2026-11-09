/* eslint-disable react-hooks/incompatible-library */
import type { BookConfigModel } from "../../../../types/requests/configModels/BookConfigModel"
import { pickAuthorFullname, pickGenreName } from "../../../../utilities/languagePickers"
import { FormProvider, useForm } from "react-hook-form"
import { SubbooksConfigSection } from "./SubbooksConfigSection/SubbooksConfigSection"
import { FormTextareaField } from "../../../../components/Forms/Common/FormTextareaField/FormTextareaField"
import { AuthorDataSearch } from "../Common/DataSetters/AuthorDataSearch/AuthorDataSearch"
import { GenreDataSearch } from "../Common/DataSetters/GenreDataSearch/GenreDataSearch"
import { useCreateBook } from "../../../../hooks/mutations/bookMutations/useCreateBook"
import { useDeleteBook } from "../../../../hooks/mutations/bookMutations/useDeleteBook"
import { ConfigHeader } from "../Common/ConfigHeader/ConfigHeader"
import { useEditBook } from "../../../../hooks/mutations/bookMutations/useEditBook"
import { useBook } from "../../../../hooks/queries/bookQueries/useBook"
import { useParams } from "react-router"
import { useLanguage } from "../../../../hooks/contexts/useLanguage"
import { supabase } from "../../../../utilities/supabase"
import { BucketsNames } from "../../../../constants/BucketsNames"
import { FormFileField } from "../../../../components/Forms/Common/FormFileField/FormFileField"
import FormField from "../../../../components/Forms/Common/FormField/FormField"
import "./bookConfigPage.scss"
import { useTranslation } from "react-i18next"

export function BookConfigPage(){
  const params = useParams()
  const bookId = params.id ? +params.id : undefined
  const { t } = useTranslation()
  const { language } = useLanguage()
  const { data: book, isLoading } = useBook(bookId)
  const { mutate: createBook, isPending: createBookPending } = useCreateBook()
  const { mutate: deleteBook, isPending: deleteBookPending } = useDeleteBook()
  const { mutate: editBook,   isPending: editBookPending }   = useEditBook()

  const bookImage = book?.imagePath && supabase.storage.from(BucketsNames.public).getPublicUrl(book.imagePath)

  const methods = useForm<BookConfigModel>({
    mode: "onChange",
    values: book && { // book
      Id: book.id,
      Title_AM : book.title_AM,
      Title_EN : book.title_EN,
      Title_RU : book.title_RU,
      Description_AM  : book.description_AM,
      Description_EN  : book.description_EN,
      Description_RU  : book.description_RU,
      GenreId  : book.genre?.id,
      AuthorId : book.author?.id,
      DiscountPercent  : book.discountPercent,
      DiscountDeadline : book.discountDeadline // format - "2026-07-17T10:30:25.123Z"
    } as BookConfigModel
  })

  const { watch, handleSubmit } = methods
  
  // useEffect(() => book && reset(book), [book, reset])

  const onCreate = (data: BookConfigModel) => {
    if (data.DiscountPercent)
    {
      data.DiscountPercent  = data.DiscountPercent  ? data.DiscountPercent  : undefined
      data.DiscountDeadline = data.DiscountDeadline ? data.DiscountDeadline : undefined
    }
    createBook(data)
  }
  
  const onEdit = (data: { Id: number } & BookConfigModel) => 
    bookId && editBook({...data, Id: bookId})

  const onDelete = handleSubmit(() => bookId && deleteBook(bookId))
  
  if (!isLoading)
  return (
  <FormProvider {...methods}>      
  <div className="book-config-page">
    <ConfigHeader<BookConfigModel>
      id={book?.id}
      mutations={{
        delete: { mutation: onDelete, pending: deleteBookPending },
        create: { mutation: onCreate, pending: createBookPending },
        edit:   { mutation: onEdit,   pending: editBookPending }
      }}/>

    <div className="top-fields">
      <div className="left-side">
        <FormField 
          fieldName={t("pages.book-config.title_am")} 
          // registerName={"Title_AM"} 
          registerName={"Title_AM"} 
          isRequired={true} />

        <FormField 
          fieldName={t("pages.book-config.title_en")} 
          registerName={"Title_EN"} 
          isRequired={true} />
        
        <FormField 
          fieldName={t("pages.book-config.title_ru")} 
          registerName={"Title_RU"} 
          isRequired={true} />

        <FormFileField 
          title={t("pages.book-config.image")} 
          fieldName={"Image"} 
          fileType="image/*"
          isRequired={true} />

        <FormField 
          fieldName={t("pages.book-config.discount-percent")}
          registerName={"DiscountPercent"}
          type="number" />

        {/* // eslint-disable-next-line react-hooks/incompatible-library */}
        {watch("DiscountPercent", book?.discountPercent) &&
          <FormField 
            fieldName={t("pages.book-config.discount-deadline")}
            registerName={"DiscountDeadline"} />}

        <div className="data-setters">
          {<AuthorDataSearch 
            registerName="AuthorId"
            defaultAuthor={book?.author && { id: book?.author.id, fullName: pickAuthorFullname(language, book.author) }}/>}

          {<GenreDataSearch
            fieldName={t("models.genre.model-name")}  
            registerName="GenreId"
            defaultGenre={book?.genre && { id: book?.genre.id,  name: pickGenreName(language, book.genre) }}/>}
        </div>
      </div>
      
      <div className="right-side">
        {/* <img src={book?.imageUrl}/> */}
        {bookImage && <img src={bookImage.data.publicUrl}/>}
      </div>
    </div>

    <FormTextareaField 
      fieldName={t("pages.book-config.description_am")} 
      registerName={"Description_AM"} 
      rows={5}
      isRequired={true} />
    
    <FormTextareaField 
      fieldName={t("pages.book-config.description_en")} 
      registerName={"Description_EN"} 
      rows={5}
      isRequired={true} />
      
    <FormTextareaField 
      fieldName={t("pages.book-config.description_ru")} 
      registerName={"Description_RU"} 
      rows={5}
      isRequired={true} />

    {book?.id && <SubbooksConfigSection bookId={book?.id} />}
  </div>
  </FormProvider>
  )
}