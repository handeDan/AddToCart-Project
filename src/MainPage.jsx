import React from "react";
import Card from "./card";

function MainPage({ products, addToChart }) {
  return (
    <>
      <div className="w3-content productsSection">
        {products &&
          products.map((product, index) => (
            <Card
              key={index}
              productTitle={product.title}
              productPrice={product.price}
              productDescription={product.description}
              productImg={product.image}
              addToChart={addToChart}
            />
          ))}
      </div>
    </>
  );
}
export default MainPage;
