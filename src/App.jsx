import { useState, useEffect } from "react";
import CartPage from "./CartPage";
import MainPage from "./MainPage";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]); //axios api/endpointinden gelen datayı products değişkenimde saklamak için. çünkü data bilgisi değişse de bana gelsin, kullanim istiyorum..
  const [inChart, setInChart] = useState(0); //sepete eklemekle alakalı kısım..
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products?limit=6")
      .then(function (response) {
        setProducts(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const addToChart = () => {
    setInChart(inChart + 1);
  };
  return (
    <Router>
      <div>
        {/* Sayfalar arasında geçiş yapacak linkler */}
        <div className="chart">
          <header>
            <h2 className="fa fa-spinner"> CHART</h2>
            <div className="nav">
              <Link to="/">Main Page</Link>
              <Link to="/Favourites.jsx">Favourites</Link>
            </div>
            <div className="cart-button">
              <Link to="/CartPage">
                <div className="fa fa-shopping-cart"></div>
              </Link>
              <h2 className="chart-text">Cart: {inChart}</h2>
            </div>
          </header>
        </div>
        <br />
        <br />
        <hr />
        {/* Sayfaların render edilmesi */}
        <Routes>
          <Route
            path="/"
            element={<MainPage products={products} addToChart={addToChart} />}
          />
          <Route path="/CartPage" element={<CartPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
