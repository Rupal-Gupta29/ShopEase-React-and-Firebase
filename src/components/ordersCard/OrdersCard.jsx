import React from "react";

const OrdersCard = (props) => {
  return (
    <div className="card">
      <div className="card-header">
        Placed on - <strong>{props.orderPlacedOn}</strong>
      </div>
      <div className="card-body">
        <div className="card-text">
          <table className="table table-borderless">
            <tbody>
              {props.products.map((product, index) => (
                <tr key={props.title}>
                  <td>{index + 1}</td>
                  <td>{product.title}</td>
                  <td>{product.qty}</td>
                  <td>
                    <sup>&#8377;</sup>
                    {product.totalAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <span>
          Total: <strong>&#8377;{props.orderSubTotal}</strong>
        </span>
      </div>
    </div>
  );
};

export default OrdersCard;
