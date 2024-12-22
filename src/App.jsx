import { useState, useEffect } from "react";
import CartPage from "./CartPage";
import MainPage from "./MainPage";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Favourites from "./Favourites";

function App() {
  const [products, setProducts] = useState([]); //axios api/endpointinden gelen datayı products değişkenimde saklamak için. çünkü data bilgisi değişse de bana gelsin, kullanim istiyorum..
  const [cart, setCart] = useState([]); //sepete eklemekle alakalı kısım..
  const [fav, setFav] = useState([]); //favorilere eklemekle alakalı kısım..
  const [loading, setLoading] = useState(true); // Loading durumu

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products?limit=6")
      .then(function (response) {
        setProducts(response.data);
        setLoading(false); // Yükleme tamamlandığında loading durumu false olacak
      })
      .catch(function (error) {
        console.error(error);
        setLoading(false); // Yükleme hatalı olsa da loading durumu false olacak
      });
  }, []); //ilk açılışta çok bekletmesin diye, 1 kere getiriyoruz datayı
  if (loading) {
    // Loading işlemi sırasında gösterilecek imge
    return (
      <div className="loading">
        <div>
          Loading...{" "}
          <img className="loading-img" src="spinner.gif" alt="loading" />
        </div>
      </div>
    );
  }
  const isInCart = (productId) =>
    cart.some((product) => product.id === productId);

  const isFav = (productId) => fav.some((product) => product.id === productId);

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

  //fav ikonuna tıklayınca:
  const addToFav = (product) => {
    if (fav.find((i) => i.id === product.id)) {
      setFav(fav.filter((i) => i.id !== product.id));
    } else {
      setFav([...fav, product]);
    }
  };

  return (
    <Router>
      <div>
        {/* Sayfalar arasında geçiş yapacak linkler */}
        <div className="chart">
          <header>
            <h2 className="fa fa-spinner">
              <Link to="/"> E-SHOP</Link>
            </h2>
            <div className="nav">
              <Link to="/">
                Main Page
                <i className="fa fa-home" aria-hidden="true"></i>
              </Link>
              <div className="fav-button">
                <Link to="/Favourites">
                  Favourites
                  <div className="fa fa-heart"></div>
                </Link>
              </div>
            </div>
            <div className="cart-button">
              <Link to="/MyCart">
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
                addToFav={addToFav}
                isFav={isFav}
              />
            }
          />
          <Route path="/MyCart" element={<CartPage cart={cart} />} />
          <Route path="/Favourites" element={<Favourites fav={fav} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
