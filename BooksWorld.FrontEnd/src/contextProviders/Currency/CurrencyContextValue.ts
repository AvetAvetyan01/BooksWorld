import type { Currency } from "../../types/unions/Currency"

export type CurrencyContextValue = {
  currency: Currency,
  setCurrency: (currency: Currency) => void
}