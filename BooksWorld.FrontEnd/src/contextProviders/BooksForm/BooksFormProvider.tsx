import { FormProvider, useForm } from "react-hook-form";
import { useBooksSearchParams } from "../../hooks/router/useBookSearchParams";
import { BooksFormContext } from "./BooksFormContext";
import { BooksFilterProvider } from "../OpenedBooksFilter/BooksFilterProvider";
import type { ReactNode } from "react";
import type { BooksRequest } from "../../types/requests/BooksRequest";

export function BooksFormProvider({ children } : { children: ReactNode }){
  const { setBooksSearchParams } = useBooksSearchParams()
  
  const methods = useForm<BooksRequest>({
    // mode: "onChange",
  })

  const value = { 
    submitForm: methods.handleSubmit(setBooksSearchParams)
  }
  
  return (
    <BooksFilterProvider>
    <BooksFormContext.Provider value={value}>
      <FormProvider {...methods}>
        {children}      
      </FormProvider>
    </BooksFormContext.Provider>
    </BooksFilterProvider>
  )
}