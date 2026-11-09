import { useCheckoutStatus } from "../../../hooks/queries/checkoutQueries/useCheckoutStatus";
import { Link, useParams } from "react-router";
import "./checkoutCompletePage.scss"

export function CheckoutCompletePage(){
  const params = useParams()
  const sessionId = params.sessionId

  const { data: checkoutStatus } = useCheckoutStatus(sessionId)

  if (checkoutStatus)
  return (
    <div className="complete-page">
      <div className="payment-status">
        {checkoutStatus.status == "complete"
          ? <i className="success-icon fa-solid fa-circle-check"></i>
          : <i className="error-icon fa-solid fa-circle-xmark"></i>}
      </div>

      <h2 className="status-text">
        {checkoutStatus.status == "complete"
          ? "Payment Successed"
          : "Something went wrong, please try again."}
      </h2>

      <div className="details-table">
        <table>
          <tbody>
            {checkoutStatus.paymentIntentId &&
              <tr>
                <td className="label">Payment Intent ID</td>
                <td className="content">{checkoutStatus.paymentIntentId}</td>
              </tr>}
            
            {checkoutStatus.subscriptionId &&
              <tr>
                <td className="label">Subscription ID</td>
                <td className="content">{checkoutStatus.subscriptionId}</td>
              </tr>}
                        
            <tr>
              <td className="label">Status</td>
              <td className="content">{checkoutStatus.status}</td>
            </tr>
            
            <tr>
              <td className="label">Payment Status</td>
              <td className="content">{checkoutStatus.paymentStatus}</td>
            </tr>
            
            {checkoutStatus.paymentIntentId && checkoutStatus.paymentIntentStatus &&
              <tr>
                <td className="label">Payment Intent Status</td>
                <td className="content">{checkoutStatus.paymentIntentStatus}</td>
              </tr>}
            
            {checkoutStatus.subscriptionId && checkoutStatus.subscriptionStatus &&
              <tr>
                <td className="label">Subscription Status</td>
                <td className="content">{checkoutStatus.subscriptionStatus}</td>
              </tr>}
          </tbody>
        </table>
      </div>

      <Link to={"/"} className="go-back">
        <i className="fa-solid fa-arrow-left"></i>
        <p>Go Back</p>
      </Link>
    </div>
  )
}