// import { useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js"
// import { useState } from "react"
// import "./checkoutForm.scss"

// export function CheckoutForm(){
//   const [message, setMessage] = useState<string>()
//   const [isLoading, setIsLoading] = useState(false)

//   const stripe = useStripe()
//   const elements = useElements()

//   const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     if (!stripe || !elements) return;

//     setIsLoading(true)
    
//     const confirmResult = await stripe?.confirmPayment({
//       elements,
//       redirect: "if_required",
//       confirmParams: {
//         return_url: "/complete"
//       }
//     })

//     console.log(confirmResult)

//     if (confirmResult != null || confirmResult != undefined)
//     {
//       if (confirmResult.error.type === "card_error" || 
//           confirmResult.error.type === "validation_error") setMessage(confirmResult.error.message);
//       else setMessage("An unexpected error occurred.");
//     }
    
//     setIsLoading(false);
//   }

//   // if (!stripe || !elements)
//   return (
//     <form onSubmit={handleSubmit} id="payment-form" className="checkout-form">
//       <h3>Payment</h3>
//       <PaymentElement id="payment-element" options={{ layout: "accordion" }}/>

//       <button disabled={isLoading || !stripe || !elements}>
//         {isLoading
//           ? <p>isLoading...</p>
//           : <p>Pay now</p>}
//         {/* : <p>Pay ${checkoutState.checkout.total.total.amount} now</p>} */}
//       </button>

//       {message && <p style={{color: "red"}}>{message}</p>}
//     </form>
//   )
// }

// ----------------------------------------------------

import { ContactDetailsElement, PaymentElement, useCheckoutElements } from "@stripe/react-stripe-js/checkout"
import { useState } from "react"
import "./checkoutForm.scss"

export function CheckoutForm(){
  const [message, setMessage] = useState<string>()
  const [paymnetIsReady, setPaymnetIsReady] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const checkoutState = useCheckoutElements()

  if (checkoutState.type == "loading")
    return <p>Loading...</p>
  
  if (checkoutState.type == "error")
    return <p style={{color: "red"}}>Error: {checkoutState.error.message}</p>

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(1)

    if (paymnetIsReady && checkoutState.type == "success" && checkoutState.checkout.canConfirm)
    {
      console.log(2)

      const { checkout } = checkoutState

      if (!checkout.canConfirm) return;
      
      console.log(3)

      setIsSubmitting(true)

      const confirmResult = await checkout.confirm()

      console.log(confirmResult)
      
      if (confirmResult.type === "error")
        setMessage(confirmResult.error.message);  
  
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
    {/* <form onSubmit={(e) => { console.log("000000000000"); handleSubmit(e) }}> */}
    {/* <form onClick={(e) => { e.preventDefault(); e.stopPropagation() }}> */}
    {/* <form> */}
      {/* 
        Uncaught (in promise) IntegrationError: Please ensure that the Payment Element is mounted and the ready event has been emitted before calling confirm(). 
      */}

      {/* We don't use that if user is authenticated */}
      <ContactDetailsElement />

      <PaymentElement 
        id="payment-element" 
        onReady={() => setPaymnetIsReady(true)}/>

      <button
        id="submit-button" 
        type="button"
        disabled={!checkoutState.checkout.canConfirm || !paymnetIsReady || isSubmitting}>
        {isSubmitting
          ? <p>Submitting...</p>
          : <p>Pay ${checkoutState.checkout.total.total.amount} now</p>}
      </button>

      {message && <p style={{color: "red"}}>{message}</p>}
    </form>
  )
}