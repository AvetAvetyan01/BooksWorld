import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useLocation } from "react-router"
import { useMemo } from "react"
import "./checkoutPage.scss"

const stripePromise = loadStripe(import.meta.env.VITE_CLIENT_PUBLIC_STRIPE_PUBLIC_KEY)

export function CheckoutPage(){
  const location = useLocation()
  const clientSecret = useMemo(() => location.state.secret, [location.state.secret])

  if (stripePromise && clientSecret)
  return ( 
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={{ 
        clientSecret: clientSecret }}> 

      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  )
}
