import CheckoutStatus from '../../components/checkout-status';
import Item from './item';
import { RootState } from 'store';
import { useSelector } from "react-redux";
import Link from 'next/link';

const ShoppingCart = () => {
  const { cartItems } = useSelector((state: RootState)  => state.cart);
  const isLoggedIn = useSelector((state: RootState) => state.isloggedin.isLoggedin);

  const priceTotal = () => {
    let totalPrice = 0;
    if(cartItems.length > 0) {
      cartItems.map(item => totalPrice += item.price * item.count);
    }

    return totalPrice;
  }

  return (
    <section className="cart">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title">Shopping Cart</h3>
          <CheckoutStatus step="cart" />
        </div>

        <div className="cart-list">
          {cartItems.length > 0 &&
            <table>
              <tbody>
                <tr>
                  <th style={{textAlign: 'left'}}>Product</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Ammount</th>
                  <th>Price</th>
                  <th></th>
                </tr>

                {cartItems.map(item => (
                  <Item 
                    key={item.productId}
                    productId={item.productId}
                    thumb={item.thumb}
                    productName={item.productName}
                    color={item.color}
                    price={item.price}
                    size={item.size}
                    count={item.count}
                  />
                ))}
              </tbody>
            </table> 
          } 
          
          {cartItems.length === 0 && 
            <p>Nothing in the cart</p>
          }
        </div>
      
        <div className="cart-actions">
          <a href="/products" className="cart__btn-back"><i className="icon-left"></i> Continue Shopping</a>
          <input type="text" placeholder="Promo Code" className="cart__promo-code" />

          <div className="cart-actions__items-wrapper">
            <p className="cart-actions__total">Total cost <strong>${priceTotal().toFixed(2)}</strong></p>
            <Link href={isLoggedIn? "/cart/checkout" : "/login" } className="btn btn--rounded btn--yellow">Checkout</Link>
          </div>
        </div>
      </div>
    </section>
  )
};
export default ShoppingCart