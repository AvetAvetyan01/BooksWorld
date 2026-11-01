import type { IOrderItem } from "../../../../../interfaces/entities/IOrderItem"
import { useTranslation } from "react-i18next"
import "./orderItemsTable.scss"

export function OrderItemsTable(props : { orderItems: IOrderItem[] }){
  const { t } = useTranslation()

  return (
    <>
      <h3 className="order-items-table-title">{t("pages.order-item.table-title")}</h3>

      <table className="order-items-table">
        <thead>
          <tr>
            <th>{t("pages.order-item.fields.id")}</th>
            <th>{t("pages.order-item.fields.book-id")}</th>
            <th>{t("pages.order-item.fields.subbook-id")}</th>
            <th>{t("pages.order-item.fields.format")}</th>
            <th>{t("pages.order-item.fields.quantity")}</th>
            <th>{t("pages.order-item.fields.unit-price")}</th>
            <th>{t("pages.order-item.fields.coupon-id")}</th>
            <th>{t("pages.order-item.fields.price-id")}</th>
          </tr>
        </thead>

        <tbody>
          {props.orderItems.map(oi => 
            <tr key={oi.id}>
              <td className="id">{oi.id}</td>
              <td className="book-id">{oi.bookId}</td>
              <td className="subbook-id">{oi.subbookId}</td>
              <td className="format">{oi.format}</td>
              <td className="quantity">{oi.quantity || '-'}</td>
              <td className="unit-price">{oi.unitPrice}</td>
              <td className="coupon-id">{oi.stripeCouponId}</td>
              <td className="price-id">{oi.stripePriceId}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}