import { type ReactNode, useEffect, useState } from "react";
import { CurrencyContext } from "./CurrencyContext";
import type { Currency } from "../../types/unions/Currency";

// it's temporary, in future we will change all 
export function CurrencyProvider({ children } : { children: ReactNode }){
  const [currency, setCurrency] = useState<Currency>
    (() => JSON.parse(localStorage.getItem("currency")!) || "AMD")

  // const [currencyValue, setCurrencyValue] = useState(() => JSON.parse(localStorage.getItem("currencyValue")) || 1)
  // const { data: rate } = useCurrencyRate("AMD", currency)
  
  useEffect(() => localStorage.setItem("currency", JSON.stringify(currency)),
  [currency])

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}
// import { type ReactNode, useEffect, useState } from "react";
// import { CurrencyContext } from "./CurrencyContext";
// import type { Currency } from "../../types/unions/Currency";

// // it's temporary, in future we will change all 
// export function CurrencyProvider({ children } : { children: ReactNode }){
//   const [currency, setCurrency] = useState<Currency>
//     (() => JSON.parse(localStorage.getItem("currency")!) || "AMD")

//   // const [currencyValue, setCurrencyValue] = useState(() => JSON.parse(localStorage.getItem("currencyValue")) || 1)
//   // const { data: rate } = useCurrencyRate("AMD", currency)
  
//   useEffect(() => localStorage.setItem("currency", JSON.stringify(currency)),
//   [currency])

//   return (
//     <CurrencyContext.Provider value={{ currency, setCurrency }}>
//       {children}
//     </CurrencyContext.Provider>
//   )
// }