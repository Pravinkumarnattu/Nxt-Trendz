// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const total = cartList.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0,
      )
      return (
        <div>
          <h1 className="total-price">
            Order Total: <span>{`Rs ${total}/-`}</span>
          </h1>
          <p>{cartList.length} Items in cart</p>
          <button type="button" className="checkout">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
