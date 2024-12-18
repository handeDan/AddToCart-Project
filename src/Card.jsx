import React from "react";

function Card({
  productTitle,
  productPrice,
  productDescription,
  productImg,
  addToChart,
}) {
  return (
    <div className="card">
      <h4>{productTitle}</h4>
      <p>Price: {productPrice} TL</p>
      <div className="card-img-desc">
        <p>{productDescription}</p>
        <img src={productImg} />
      </div>
      <button onClick={addToChart} className="w3-button">
        Add to cart
      </button>
    </div>
  );
}

export default Card;
