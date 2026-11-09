import type { GetOrdersRequest } from "../../../../../types/requests/GetOrdersRequest"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"
import { useOrders } from "../../../../../hooks/queries/orderQueries/useOrders"
import { useState } from "react"
import { Search } from "../../../../../components/Search/Search"
import { Pager } from "../../../../../components/Pager/Pager"
import orderSearchTypes from "./OrdersSearchTypes.json"
import "./ordersTable.scss"

export function OrdersTable(){
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [request, setRequset] = useState({ page: 1, size: 15 } as GetOrdersRequest)
  const { data: orders, isLoading } = useOrders(request)

  const onSearch = (
    searchString: string, 
    _searchType: string, //'Id' | 'Title' | 'ISBN', 
    searchField: string, 
    // searchLanguage: string // Language
  ) => {
    setRequset({
      page: 1,
      size: request.size,
      search: searchString,
      searchField: searchField
    } as GetOrdersRequest)
  }

  if (!isLoading)
  return (
    <>
      <div className="actions">
        <Search 
          onSearch={onSearch}
          searchTypes={orderSearchTypes} />
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>{t("pages.order.fields.id")}</th>
            <th>{t("pages.order.fields.user-id")}</th>
            <th>{t("pages.order.fields.status")}</th>
            <th>{t("pages.order.fields.total-amount")}</th>
            <th>{t("pages.order.fields.shipping-address")}</th>
            <th>{t("pages.order.fields.created-at")}</th>
          </tr>
        </thead>

        <tbody>
          {orders?.collection.map(o => {
            return (
              <tr key={o.id} onClick={() => navigate(`/admin/config/order/${o.id}`)}>
                <td className="id">{o.id}</td>
                <td className="userid">{o.userId}</td>
                <td className="status">{o.status}</td>
                <td className="total-amount">{o.totalAmount} {o.currency}</td>
                <td className="shipping-address">{o.shippingAddress || '-'}</td>
                <td className="created-date">{`${o.createdAt}`}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
          
      {orders &&
        <Pager 
          data={orders}
          submit={(newPage) => setRequset({...request, page: newPage})} />}
    </>
  )
}