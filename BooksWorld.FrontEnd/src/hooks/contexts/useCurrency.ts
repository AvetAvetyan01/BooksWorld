import { useContext } from "react";
import { CurrencyContext } from "../../contextProviders/Currency/CurrencyContext";

export function useCurrency(){
  return useContext(CurrencyContext)
} 