import type { ICartBook } from "../../interfaces/entities/ICartBook";
import { useCurrencyRate } from "../../hooks/queries/commonQueries/useCurrencyRate";
import { EmptyDataPopup } from "../../components/EmptyDataPopup/EmptyDataPopup";
import { useTranslation } from "react-i18next";
import { useCartBooks } from "../../hooks/queries/cartQueries/useCartBooks";
import { useLanguage } from "../../hooks/contexts/useLanguage";
import { useCurrency } from "../../hooks/contexts/useCurrency";
import { OrderForm } from "./OrderForm/OrderForm";
import { CartBook } from "./CartBook/CartBook";
import { Loader } from "../../components/Loading/Loader";
import "./cartPage.scss"

export function CartPage(){
  const { t } = useTranslation()
  const { language } = useLanguage()
  const { currency } = useCurrency()
  const { data: currencyRate } = useCurrencyRate()
  const { data: cartBooks, isLoading } = useCartBooks()

  const sums: { total: number, discounted: number, merged: number } = (() => { 
    if (!cartBooks || !currencyRate) return { total:0, discounted:0, merged:0 };

    const discounted = Number(cartBooks?.reduce((acc: number, item: ICartBook) => {
      return acc + (item.discountPercent ? item.subbook.price - item.subbook.discountedPrice : 0)
    }, 0).toFixed(2))
    
    const total = Number(cartBooks?.reduce((acc: number, item: ICartBook) => {
      return acc + (item.discountPercent ? item.subbook.discountedPrice : item.subbook.price)
    }, 0).toFixed(2))

    const merged = total + discounted

    return { total: total, discounted: discounted, merged: merged }
  })()

  return (  
    <section className={"cart-page " + (!cartBooks?.length ? "empty" : "")}> 
      {!isLoading
        ? cartBooks?.length 
          ?
          <>
            <article className="items-details">
              <div className="title">
                <h3>{t(`pages.cart.title`)}</h3>
                <p>{cartBooks?.length} {t(`pages.cart.items`)}</p>
              </div>

              <div className="seperator-line"></div>

              <ul className="cart-books">
                {currencyRate && cartBooks?.map(cb => 
                  <CartBook 
                    key={cb.id}
                    cartBook={cb}
                    currency={currency}
                    language={language} />)}
              </ul> 
            </article>
            
            <OrderForm 
              existsPaperbook={cartBooks.some(cb => cb.bookFormat == "Paper")}
              itemsLength={cartBooks?.length}
              sum={{
                total: sums.total,
                merged: sums.merged,
                discounted: sums.discounted,
              }}/>
          </>
          : <EmptyDataPopup
              type={"cart"}
              title={t(`pages.cart.empty-popup.title`)}
              description={t(`pages.cart.empty-popup.description`)}
              />        
        : <Loader message={t(`pages.cart.loading-message`)}/>
      }
    </section>
  )
}