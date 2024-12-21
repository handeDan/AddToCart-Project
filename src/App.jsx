import { useState, useEffect } from "react";
import CartPage from "./CartPage";
import MainPage from "./MainPage";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]); //axios api/endpointinden gelen datayı products değişkenimde saklamak için. çünkü data bilgisi değişse de bana gelsin, kullanim istiyorum..
  const [cart, setCart] = useState([]); //sepete eklemekle alakalı kısım..
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products?limit=6")
      .then(function (response) {
        setProducts(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []); //ilk açılışta çok bekletmesin diye, 1 kere getiriyoruz datayı
  const isInCart = (productId) =>
    cart.some((product) => product.id === productId);

  //butona tıklayınca sepette sayı artsın:
  const addToCart = (product) => {
    // Sepete ekleme fonksiyonu
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Ürün zaten sepetteyse, miktarı arttır
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Ürün sepette yoksa, ekle
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  //butona tıklayınca sepette sayı azalsın:
  const removeCart = (product) => {
    // Sepetten çıkarma fonksiyonu
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Eğer ürün varsa, adedi 1 azaltıyoruz
        if (existingProduct.quantity > 1) {
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          // Eğer miktar 1 ise, ürünü sepetten tamamen çıkarıyoruz
          return prevCart.filter((item) => item.id !== product.id);
        }
      }
      return prevCart;
    });
  };
  return (
    <Router>
      <div>
        {/* Sayfalar arasında geçiş yapacak linkler */}
        <div className="chart">
          <header>
            <h2 className="fa fa-spinner"> E-SHOP</h2>
            <div className="nav">
              <Link to="/">Main Page</Link>
              <Link to="/Favourites.jsx">Favourites</Link>
            </div>
            <div className="cart-button">
              <Link to="/CartPage">
                <div className="fa fa-shopping-cart"></div>
                <h2 className="chart-text">Cart: {cart.length}</h2>
              </Link>
            </div>
          </header>
        </div>
        <br />
        <br />
        <hr />
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                products={products}
                addToCart={addToCart}
                removeCart={removeCart}
                isInCart={isInCart}
              />
            }
          />
          <Route path="/CartPage" element={<CartPage cart={cart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
