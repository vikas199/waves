import React, { Component } from "react"
import PaypalExpressBtn from "react-paypal-express-checkout"




export default class Paypal extends Component {
  render() {
    const onSuccess = (payment) => {
    //   console.log(JSON.stringify(payment))
    this.props.onSuccess(payment)
    }

    const onCancel = (data) => {
      console.log(JSON.stringify(data))
    }

    const onError = (error) => {
      console.log(JSON.stringify(error))
    }
    let env = "sandbox"
    let currency = "USD"
    let total = this.props.toPay
    const client = {
      sandbox: "AR-k5PGkUvG9Xp9tHruy4hRJ5dq7HL6Rr9SDAF7pozrrjttgXUILCif35uu-771edLkB7EHuWykJkMaW",
      production: "",
    }
    return (
      <div>
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: "large",
            color: "blue",
            shape: "rect",
            label: "checkout",
          }}
        />
      </div>
    )
  }
}


// {"paid":true,
// "cancelled":false,
// "payerID":"CAFTNXS3LS992",
// "paymentID":"PAYID-L24KTIY6DY78717TC096562G",
// "paymentToken":"EC-3TR63656Y53894631",
// "returnUrl":"https://www.paypal.com/checkoutnow/error?paymentId=PAYID-L24KTIY6DY78717TC096562G&token=EC-3TR63656Y53894631&PayerID=CAFTNXS3LS992",
// "address":{
//     "recipient_name":"John Doe",
//     "line1":"1 Main St",
//     "city":"San Jose",
//     "state":"CA",
//     "postal_code":"95131",
//     "country_code":"US"
// },
// "email":"sb-7gydg1732055@personal.example.com"}