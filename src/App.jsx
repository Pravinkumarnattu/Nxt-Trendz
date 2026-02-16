import { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductItemDetails from "./components/ProductItemDetails";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import CartContext from "./context/CartContext";
import "./App.css";

class App extends Component {
  state = {
    cartList: [],
  };

  removeAllCartItems = () => {
    this.setState({ cartList: [] });
  };

  addCartItem = (product) => {
    this.setState((prevState) => ({
      cartList: [...prevState.cartList, product],
    }));
  };

  removeCartItem = (productId) => {
    const { cartList } = this.state;
    const filteredList = cartList.filter((each) => each.id !== productId);
    this.setState({ cartList: filteredList });
  };

  incrementCartItemQuantity = (id, newQuantity) => {
    const { cartList } = this.state;
    const updated = cartList.map((each) =>
      each.id === id
        ? { ...each, quantity: each.quantity + newQuantity }
        : each,
    );
    this.setState({ cartList: updated });
  };

  decrementCartItemQuantity = (id) => {
    const { cartList } = this.state;
    const updated = cartList.map((each) =>
      each.id === id
        ? {
            ...each,
            quantity: each.quantity > 1 ? each.quantity - 1 : 0,
          }
        : each,
    );
    const filtered = updated.filter((each) => each.quantity > 0);
    this.setState({ cartList: filtered });
  };

  render() {
    const { cartList } = this.state;

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            removeAllCartItems: this.removeAllCartItems,
            removeCartItem: this.removeCartItem,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
          }}
        >
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/:id"
              element={
                <ProtectedRoute>
                  <ProductItemDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </CartContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
