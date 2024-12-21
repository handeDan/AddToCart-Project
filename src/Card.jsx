import React from "react";

function Card({ product, isInCart, addToCart, removeCart }) {
  return (
    <div className="card">
      <div className="card-texts">
        <h4>{product.title}</h4>
        <p>Price: {product.price} TL</p>
      </div>
      <div className="card-img-desc">
        <p>{product.description}</p>
        <img src={product.image} />
      </div>
      <button
        onClick={() => {
          if (isInCart(product.id)) {
            removeCart(product); // Eğer sepetteyse, çıkartıyoruz
          } else {
            addToCart(product); // Eğer sepette değilse, ekliyoruz
          }
        }}
      >
        {isInCart(product.id) ? "Remove" : "Add to Cart"}
      </button>
    </div>
  );
}

export default Card;
