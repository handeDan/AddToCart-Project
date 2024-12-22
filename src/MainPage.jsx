import React from "react";
import CardComponent from "./CardComponent";

function MainPage({
  products,
  addToCart,
  removeCart,
  isInCart,
  addToFav,
  isFav,
}) {
  return (
    <>
      <div className="w3-content productsSection">
        {products &&
          products.map((product, index) => (
            <CardComponent
              key={index}
              product={product}
              addToCart={addToCart}
              removeCart={removeCart}
              isInCart={isInCart}
              addToFav={addToFav}
              isFav={isFav}
            />
          ))}
      </div>
    </>
  );
}
export default MainPage;
