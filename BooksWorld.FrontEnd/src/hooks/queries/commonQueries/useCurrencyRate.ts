// import { useQuery } from "@tanstack/react-query";
// import { useCurrency } from "../../contexts/useCurrency";
// import axios from "axios";

// export function useCurrencyRate(){
//   const { currency } = useCurrency()
//   const baseCurr = "AMD"

//   return useQuery({
//     queryKey: ['GET', 'currency', currency],  
//     placeholderData: (p) => p,
//     queryFn: async () => {
//       const exchangeApiKey:string = import.meta.env.VITE_CLIENT_PUBLIC_STRIPE_PUBLIC_KEY
//       const url = `https://v6.exchangerate-api.com/v6/${exchangeApiKey}/pair/${baseCurr}/${currency}`

//       const response = await axios.get(url, {headers : {}})

//       console.log("Currency Rate ", response) 

//       return response
//     },
//     select: d => d.data.conversion_rate
//   })
// }


// ⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️
// that is temprorary solution, because the count of our requests to geting currencies
// rates are limited

import { useQuery } from "@tanstack/react-query";
import { useCurrency } from "../../contexts/useCurrency";
import currenciesRates from "../../../contextProviders/Currency/currencies.json"; 

export function useCurrencyRate(){
  const currContext = useCurrency()

  return useQuery({
    queryKey: ['GET', 'currency', currContext.currency],  
    placeholderData: (p) => p,
    queryFn: async () => {
      const response = currenciesRates[currContext.currency]
      return response 
    },
  })
}