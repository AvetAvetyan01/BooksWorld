import { useParams } from "react-router"
import { useOrder } from "../../../../hooks/queries/orderQueries/useOrder"
import { useTranslation } from "react-i18next"
import { GoBackButton } from "../../../../components/GoBackButton/GoBackButton"
import { OrderItemsTable } from "./OrderItemsTable/OrderItemsTable"
import "./orderConfigPage.scss"

export function OrderConfigPage(){
  const params = useParams()
  const orderId = params?.id ? +params.id : undefined
  const { t } = useTranslation()
  const { data: order, isLoading } = useOrder(orderId)
  
  if (!isLoading && order && order.orderItems)
  return (
    <div className="order-page">
      <GoBackButton />

      <ul className="order-info-list">
        <li>
          <p>{t("pages.order.fields.id")}</p>
          <p>{order.id}</p>
        </li>
        
        <li>
          <p>{t("pages.order.fields.user-id")}</p>
          <p>{order.userId}</p>
        </li>
        
        <li>
          <p>{t("pages.order.fields.status")}</p>
          <p>{order.status}</p>
        </li>
        
        <li>
          <p>{t("pages.order.fields.total-amount")}</p>
          <p>{order.totalAmount} {order.currency}</p>
        </li>
        
        <li>
          <p>{t("pages.order.fields.shipping-address")}</p>
          <p>{order.shippingAddress || '-'}</p>
        </li>
        
        <li>
          <p>{t("pages.order.fields.created-at")}</p>
          <p>{`${order.createdAt}`}</p>
        </li>
        
        <li>
          <p>{t("pages.order.fields.checkout-session-id")}</p>
          <p>{order.stripeCheckoutSessionId}</p>
        </li>
      </ul>

      <OrderItemsTable orderItems={order.orderItems}/>
    </div>
  )
}