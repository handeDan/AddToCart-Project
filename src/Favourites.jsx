import React from "react";

function Favourites({ fav }) {
  return (
    <>
      <div>
        <p className="MyCart-text">My Favourites</p>
        <br />
        <div>
          <table className="w3-table w3-bordered w3-white">
            <tr>
              <th>Product Title</th>
              <th>Price</th>
            </tr>
            {fav.map((item, index) => (
              <>
                <tr>
                  <td>{item.title}</td>
                  <td>{item.price} TL</td>
                  <td className="yan">{item.quantity}</td>
                </tr>
              </>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}

export default Favourites;
