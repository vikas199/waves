import React from "react"

export default function HistoryBlock(props) {
  const renderBlocks = () =>
    props.products
      ? props.products.map((val, i) => (
          <tr key={i}>
            <td>{val.porder}</td>
            <td>
              {val.brand.name} {val.name}
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
            <th>Oder Number</th>
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
