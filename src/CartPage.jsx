import React from "react";

function CartPage({ cart }) {
  return (
    <>
      <div>
        <p className="MyCart-text">My Cart</p>
        <br />
        <table className="w3-table w3-bordered w3-white">
          <tr>
            <th>Product Title</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
          {cart.map((item, index) => (
            <>
              <tr>
                <td>{item.title}</td>
                <td>{item.price} TL</td>
                <td className="yan">{item.quantity}</td>
              </tr>
            </>
          ))}
        </table>
        <br />
        <button className="cartPage-button">Click to Order</button>
      </div>
    </>
  );
}

export default CartPage;
