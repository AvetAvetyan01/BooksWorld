import { useCreateOrder } from "../../../hooks/mutations/orderMutations/useCreateOrder";
import { useCurrency } from "../../../hooks/contexts/useCurrency";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import "./orderForm.scss";

type Props = { 
  existsPaperbook: boolean
  itemsLength: number
  sum: {
    total: number
    discounted: number
    merged: number
  } 
}

export function OrderForm({ existsPaperbook, itemsLength, sum } : Props){
  const { currency } = useCurrency()
  const { t } = useTranslation()
  const addressInputRef = useRef<HTMLTextAreaElement>(null)
  const [shippingAddress, setShippingAddress] = useState('')
  const [isAgreeWithPrivacyPolicy, setIsAgreeWithPrivacyPolicy] = useState(false)
  const isValidAddress = shippingAddress.trim().length 
  
  const { mutate: createOrder, isPending: isOrderCreateingPending } = useCreateOrder()

  return (
    <article className="order-form">
      {existsPaperbook &&
        <button onClick={() => addressInputRef.current?.focus() } className="set-address">
          <i className="fa-solid fa-map-location-dot"></i>
          <p>{t(`pages.cart.order-form.set-delivery-address`)}</p>
        </button>}

      <ul className="order-details">
        <li className="detail">
          <p className="name">{t(`pages.cart.items`)} {itemsLength}</p>
          <p className="value">{sum.merged} {currency}</p>
        </li>
        
        <li className="detail">
          <p className="name">{t(`pages.cart.order-form.details.discounts`)}</p>
          <p className="value">{sum.discounted} {currency}</p>
        </li>

        {existsPaperbook &&
          <li className="detail">
            <p className="name">{t(`pages.cart.order-form.details.address`)}</p>
            <textarea
              ref={addressInputRef} 
              onChange={(e) => setShippingAddress(e.target.value)} 
              className="value-textarea" 
              spellCheck={false}
              value={shippingAddress}></textarea>
          </li>}
      </ul>

      <div className="sum-container">
        <p className="text">{t(`pages.cart.order-form.details.totaly`)}</p>

        <div className="sum">
          <p className="value">{!!sum.total && sum.total}</p>
          <p className="currency">{currency}</p>
        </div>
      </div>

      {/* <Link 
        to={"/checkout/payment"}
        className={`order-button ${(!isAgreeWithPrivacyPolicy || (existsPaperbook ? !isValidAddress : false)) && "disabled"}`}>
        {t(`pages.cart.order-form.order-button`)}
      </Link> */}

      <button
        onClick={() => createOrder({ description: '', shippingAddress: shippingAddress })}
        disabled={isOrderCreateingPending}
        className={`order-button ${(!isAgreeWithPrivacyPolicy || (existsPaperbook ? !isValidAddress : false)) && "disabled"}`}>
        {t(`pages.cart.order-form.order-button`)}
      </button>

      <div className="aggreement"> 
        <input type="checkbox" onChange={() => setIsAgreeWithPrivacyPolicy(p => !p)} />
        <p>{t(`pages.cart.order-form.aggreement-text`)}</p>
      </div>

      <ul className="warnings">
        {/* {!address.trim().length && <li>- {t("pages.cart.order-form.warnings.valid-address")}</li>} */}
        {(existsPaperbook ? !isValidAddress : false) && <li>- {t("pages.cart.order-form.warnings.valid-address")}</li>}
        {!isAgreeWithPrivacyPolicy && <li>- {t("pages.cart.order-form.warnings.agree-privacy-policy")}</li>}
      </ul>
    </article>
  )
}