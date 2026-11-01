import { useUpdateCartBookCount } from "../../hooks/mutations/cartMutations/useUpdateCartBookCount"
import { useAuth } from "../../hooks/contexts/useAuth"
import "./cartBookCounter.scss"

export function CartBookCounter({ subbookId } : { subbookId: number }){
  const { user, subbookCountInCart } = useAuth()
  const { mutate: updateCartBookCount } = useUpdateCartBookCount()

  const changeCount = (isIncrease: boolean) => { 
    if (!isIncrease && subbookCountInCart(subbookId) < 2) return;

    const cartBookId = user?.cartBooks.find(b => b.subbookId == subbookId)?.id
    
    if (cartBookId)
      updateCartBookCount({ cartBookId: cartBookId, isIncrease: isIncrease })
  }

  return (
    <div className="cart-book-counter">
      <i 
        className={"fa-solid fa-minus" + ((subbookCountInCart(subbookId) < 2 ? " disabled" : ""))} 
        onClick={() => changeCount(false)}></i>
        
      <p className="count">{subbookCountInCart(subbookId)}</p>

      <i 
        className={"fa-solid fa-plus" + ((subbookCountInCart(subbookId) > 9 ? " disabled" : ""))}  
        onClick={() => changeCount(true)}></i>
    </div>
  )
}