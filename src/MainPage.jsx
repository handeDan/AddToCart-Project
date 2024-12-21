import React from "react";
import Card from "./card";

function MainPage({ products, addToCart, removeCart, isInCart }) {
  return (
    <>
      <div className="w3-content productsSection">
        {products &&
          products.map((product, index) => (
            <Card
              key={index}
              product={product}
              addToCart={addToCart}
              removeCart={removeCart}
              isInCart={isInCart}
            />
          ))}
      </div>
    </>
  );
}
export default MainPage;
