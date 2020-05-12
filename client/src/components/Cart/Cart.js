import React, { Component } from "react"
import UserLayout from "../../hoc/userlayout"
import { connect } from "react-redux"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import faFrown from "@fortawesome/fontawesome-free-solid/faFrown"
import faSmile from "@fortawesome/fontawesome-free-solid/faSmile"
import { getCartItems, removeCartItem } from "../../actions/user_actions"
import ProductBlock from "../../utils/User/product_block"
import Paypal from "../../utils/Paypal"

class Cart extends Component {
  state = {
    loading: true,
    total: 0,
    showSuccess: false,
    showTotal: false,
  }

  componentDidMount() {
    let cartItem = []
    let user = this.props.user
    if (user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach((item) => {
          cartItem.push(item.id)
        })
        this.props.getCartItems(cartItem, user.userData.cart)
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.cartDetail !== this.props.user.cartDetail && this.props.user.cartDetail.length <= 0) {
      this.setState({ showTotal: false })
    } else if (prevProps.user.cartDetail !== this.props.user.cartDetail && this.props.user.cartDetail.length > 0) {
      this.calculateTotal(this.props.user.cartDetail)
    }
  }

  calculateTotal = (cartDetail) => {
    let total = 0
    cartDetail.forEach((item) => {
      total += parseInt(item.price, 10) * item.quantity
    })
    this.setState({ total, showTotal: true })
  }
  showNoItemMsg = () => (
    <div className="cart_no_items">
      <FontAwesomeIcon icon={faFrown} />
      <div>You have no items</div>
    </div>
  )

  removeItem = (id) => {
    this.props.removeCartItem(id)
  }
  transactionError = () => {
    console.log('paypal error')
  }

  transactionError = () => {
    console.log('Tranaction cancelled')
  }

  transactionSuccess = (data) => {
    this.setState({
      showTotal: false,
      showSuccess: true
    })
  }

  render() {
    return (
      <div>
        <UserLayout>
          <div>
            <h1>My Cart</h1>
            <div className="user_cart">
              <ProductBlock products={this.props.user} type="cart" removeItem={(id) => this.removeItem(id)} />
              {this.state.showTotal ? (
                <div>
                  <div className="user_cart_sum">
                    <div>Total Amount: ${this.state.total}</div>
                  </div>
                </div>
              ) : this.state.showSuccess ? (
                <div className="cart_success">
                  <div className="cart_no_items">
                    <FontAwesomeIcon icon={faSmile} />
                    <div>Thank you</div>
                    <div>Your order is now complete</div>
                  </div>
                </div>
              ) : (
                this.showNoItemMsg()
              )}
            </div>
            {this.state.showTotal ? (
              <div className="paypal_button_container">
                <Paypal
                  toPay={this.state.total}
                  transactionError={(data) => this.transactionError(data)}
                  transactionCancelled={(data) => this.transactionError(data)}
                  onSuccess={(data) => this.transactionSuccess(data)}
                />
              </div>
            ) : null}
          </div>
        </UserLayout>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCartItems: (data, value) => dispatch(getCartItems(data, value)),
    removeCartItem: (data) => dispatch(removeCartItem(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
