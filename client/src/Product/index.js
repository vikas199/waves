import React, { Component } from "react"
import PageTop from "../utils/pagetop"
import { connect } from "react-redux"
import { getProductDetail, clearProductDetail } from "../actions/product_actions"
import { addToCart } from "../actions/user_actions"
import ProdInfo from "./ProdInfo"
import ProdImage from "./ProdImg"

class ProductDetail extends Component {
  componentDidMount() {
    const { match, getProductDetail } = this.props
    const id = match.params.id
    getProductDetail(id)
  }

  componentDidUpdate() {
    if (!this.props.products.productDetail) {
      this.props.history.push("/")
    }
  }

  componentWillUnmount() {
    this.props.clearProductDetail()
  }

  addToCartHandler = (id) => {
    this.props.addToCart(id)
  }
  render() {
    const { products } = this.props
    return (
      <div>
        <PageTop title="Product_detail" />
        <div className="container">
          {products.productDetail ? (
            <div className="product_detail_wrapper">
              <div className="left">
                <div style={{ width: "500px" }}>
                  <ProdImage detail={products.productDetail} />
                </div>
              </div>
              <div className="right">
                <ProdInfo addToCart={(id) => this.addToCartHandler(id)} detail={products.productDetail} />
              </div>
            </div>
          ) : (
            "loading"
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductDetail: (data) => dispatch(getProductDetail(data)),
    clearProductDetail: () => dispatch(clearProductDetail),
    addToCart: (data) => dispatch(addToCart(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
