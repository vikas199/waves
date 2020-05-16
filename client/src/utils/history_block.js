import React from "react"
import moment from "moment"

export default function HistoryBlock(props) {
  const renderBlocks = () =>
    props.products
      ? props.products.map((val, i) => (
          <tr key={i}>
            <td>{moment(val.dateOfPurchase).format("MM-DD-YYYY")}</td>
            <td>
              {val.brand.name}  {val.name}
            </td>
            <td>${val.price}</td>
            <td>{val.quantity}</td>
          </tr>
        ))
      : null
  return (
    <div className="history_block">
      <table>
        <thead>
          <tr>
            <th>Date of purchase</th>
            <th>Product</th>
            <th>Price Paid</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{renderBlocks()}</tbody>
      </table>
    </div>
  )
}
