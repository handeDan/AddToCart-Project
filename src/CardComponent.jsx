import React from "react";

export default function CardComponent({
  product,
  isInCart,
  addToCart,
  removeCart,
  addToFav,
  isFav,
}) {
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
      <i
        className="fa fa-heart card-fav"
        onClick={() => {
          addToFav(product);
        }}
        style={{ color: isFav(product.id) ? "red" : null }}
      ></i>
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
