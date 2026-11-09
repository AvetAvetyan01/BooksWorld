import { FormProvider, useForm } from "react-hook-form"
import { FormTextareaField } from "../Common/FormTextareaField/FormTextareaField"
import { useDeleteReview } from "../../../hooks/mutations/reviewMutations/useDeleteReview"
import { useCreateReview as useCreateReview } from "../../../hooks/mutations/reviewMutations/useCreateReview"
import { useTranslation } from "react-i18next"
import { useUserReview } from "../../../hooks/queries/reviewQueries/useUserReview"
import { useEditReview } from "../../../hooks/mutations/reviewMutations/useEditReview"
import { useState } from "react"
import type { ReviewConfigModel } from "../../../types/requests/configModels/ReviewConfigModel"
import "./reviewForm.scss"

type Props = {
  bookId: number
  closer: () => void
  isActive: boolean
  page: number
}

export function ReviewForm({ bookId, closer, isActive, page } : Props){
  const { t } = useTranslation()
  const { data: userReview } = useUserReview({ bookId: bookId })
  const { mutate: createReview, isPending: leaveReviewPending  } = useCreateReview()
  const { mutate: deleteReview, isPending: deleteReviewPending } = useDeleteReview()
  const { mutate: editReview,   isPending: editReviewPending   } = useEditReview()

  const methods = useForm<ReviewConfigModel>({
    mode: "onChange",
    values: {
      Id: userReview?.id,
      BookId: bookId,
      Grade: userReview?.grade || 0,
      Comment: userReview?.comment || ''
    }
  })

  const { handleSubmit, setValue, register, getValues } = methods
  const [grade, setGrade] = useState(0); 
  
  // useEffect(() => userReview?.grade && setGrade(userReview?.grade),[userReview])

  // const isValidForm = grade >= 1 && grade <= 5 && comment.length < 250 
  //   && (userReview ? (userReview?.grade != grade || userReview?.comment != comment) : true)

  // ----- validate and refresh urls of invalidateQueries ----- 
  const onCreate = (request: ReviewConfigModel) => {
    createReview(request)
    closer()
  }
  const onDelete = () => {
    if (userReview?.id)
    {
      deleteReview({ reviewId: userReview?.id, bookId: bookId, page: page })
      closer()
    }
  }
  const onEdit = (request: ReviewConfigModel) => {
    editReview(request)
    closer()
  }

  return (
    <FormProvider {...methods}>
      <form 
        onClick={(e) => {e.stopPropagation(); e.preventDefault()}} 
        className={`review-form ${isActive ? `active` : ``}`}>

        <p className="title">{userReview ? t(`review-form.change-review`) : t(`review-form.leave-review`) }</p>

        <div className="grade">
          <input {...register("Grade")} value={userReview?.grade || 0} type="number" hidden />

          {[1,2,3,4,5].map(g => 
            <i key={g} className={`fa-star ${g <= (getValues("Grade") || grade) ? `fa-solid`: `fa-regular`}`}
              onClick={() => {setGrade(g); setValue("Grade", g)}}>
            </i>)}
        </div>

        <FormTextareaField
          fieldName={t("review-form.comment")}
          registerName={"Comment"}
          rows={10} 
          isRequired={false} />

        <div className="buttons">
          {!userReview
            ?
            <button 
              className={'leave-button'}
              disabled={leaveReviewPending} 
              onClick={handleSubmit(onCreate)}>
                <i className={`fa-solid fa-plus`}></i>
                <p>{t(`review-form.leave-review`)}</p>
            </button>
            :        
            <>
              <button 
                className={'change-button'}
                disabled={editReviewPending} 
                onClick={handleSubmit(onEdit)}>
                  <i className={`fa-solid fa-arrows-rotate`}></i>
                  <p>{t(`review-form.change-review`)}</p>
              </button>

              <button 
                disabled={deleteReviewPending}
                onClick={handleSubmit(onDelete)} 
                className="delete-button">
                  <i className="fa-solid fa-x"></i>
                  <p>{t(`review-form.delete-review`)}</p>
              </button>
            </>}
        </div>
      </form>
    </FormProvider>
  )
}