import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductItem from "./components/ProductItem";
import CartDisplayItem from "./components/CartDisplayItem";

function ShoppingCartApp() {
  const [cartItems, setCartItems] = useState([]);
  const breakdown = useRef("");

  const [sampleProducts] = useState([
    { id: 1, name: "Sample Product 1", price: 10 },
    { id: 2, name: "Sample Product 2", price: 15 },
    { id: 3, name: "Sample Product 3", price: 20 },
    { id: 4, name: "Sample Product 4", price: 30 },
    { id: 5, name: "Sample Product 5", price: 45 }
  ]);

  const calculateTotal = () => {
    let total = 0;
    breakdown.current = "";
    cartItems.forEach((item) => {
      total += item.product.price * item.quantity;
      if (breakdown.current !== "") breakdown.current += ` + `;
      breakdown.current += `id:${item.product.id}=$${item.product.price}x${item.quantity}`;
    });
    return total;
  };

  const findProductById = (itemId) =>
    cartItems.findIndex((item) => item.product.id === itemId);
  const findProduct = (product) => findProductById(product.id);

  const addToCart = (product) => {
    // Add the product to the cart
    const index = findProduct(product);
    let qty = 1;
    if (index !== -1) {
      qty = cartItems[index].quantity + 1;
    }
    if (qty === 1) {
      setCartItems([...cartItems, { product, quantity: qty }]);
    } else {
      setCartItems([
        ...cartItems.slice(0, index),
        { product, quantity: qty },
        ...cartItems.slice(index + 1)
      ]);
    }
  };

  const adjustQuantity = (itemId, quantity) => {
    // Adjust the quantity of the cart item
    const index = findProductById(itemId);
    if (index !== -1) {
      const qty = parseInt(quantity, 10);
      if (qty > 0) {
        const product = cartItems[index].product;
        setCartItems([
          ...cartItems.slice(0, index),
          { product, quantity: qty },
          ...cartItems.slice(index + 1)
        ]);
      }
    }
  };

  const deleteItem = (itemId) => {
    // Delete the cart item
    setCartItems(cartItems.filter((item) => item.product.id !== itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    // Decrease the quantity of the cart item
    const index = findProductById(itemId);
    if (index !== -1) {
      const quantity = cartItems[index].quantity - 1;
      if (quantity > 0) {
        const product = cartItems[index].product;
        setCartItems([
          ...cartItems.slice(0, index),
          { product, quantity },
          ...cartItems.slice(index + 1)
        ]);
      }
    }
  };

  const handleIncreaseQuantity = (itemId) => {
    // Increase the quantity of the cart item
    const index = findProductById(itemId);
    if (index !== -1) {
      const product = cartItems[index].product;
      const quantity = cartItems[index].quantity + 1;
      setCartItems([
        ...cartItems.slice(0, index),
        { product, quantity },
        ...cartItems.slice(index + 1)
      ]);
    }
  };

  return (
    <div className="container">
      <h1 className="mb-4">Shopping Cart</h1>
      <div className="row">
        <div className="col">
          <h2>Products</h2>
          <div className="list-group">
            {sampleProducts.map((product) => (
              <ProductItem
                {...product}
                clickAction={() => addToCart(product)}
              />
            ))}
          </div>
        </div>
        <div className="col">
          <h2>Cart</h2>
          <ul className="list-group">
            {/* Example cart item */}
            {/* Add more example cart items */}
            {cartItems.map((item) => (
              <CartDisplayItem
                {...item.product}
                quantity={item.quantity}
                decreaseAction={() => handleDecreaseQuantity(item.product.id)}
                adjustAction={(e) => {
                  adjustQuantity(item.product.id, e.target.value);
                }}
                increaseAction={() => handleIncreaseQuantity(item.product.id)}
                deleteAction={() => deleteItem(item.product.id)}
              />
            ))}
          </ul>
          <div className="total mt-4">
            <h4>Total: ${/* Display the total */ calculateTotal()}</h4>
            <h6>
              <i>[Breakdown: {breakdown.current}]</i>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartApp;
