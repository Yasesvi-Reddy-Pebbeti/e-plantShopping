import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity, clearCart } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => {
        const cost = parseFloat(item.cost.replace("$", ""));
        return total + cost * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  const handleCheckout = () => {
    alert("✅ Your order has been placed successfully!");
    dispatch(clearCart());
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty 🪴</h2>
        <button className="continue-btn" onClick={onContinueShopping}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-heading">🧾 Billing Summary</h1>
      <div className="cart-items">
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img src={item.image} alt={item.name} className="cart-image" />
            <div className="cart-details">
              <h3>{item.name}</h3>
              <p className="cart-cost">{item.cost}</p>
              <div className="quantity-controls">
                <button onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
              <p className="cart-total">
                Total: $
                {(
                  parseFloat(item.cost.replace("$", "")) * item.quantity
                ).toFixed(2)}
              </p>
              <button className="remove-btn" onClick={() => handleRemove(item)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Grand Total: ${calculateTotalAmount()}</h2>
        <div className="cart-actions">
          <button className="continue-btn" onClick={onContinueShopping}>
            Continue Shopping
          </button>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
