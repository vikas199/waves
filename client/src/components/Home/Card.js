import React, { Component } from "react"
import MyButton from "../../utils/button"
import { connect } from 'react-redux'
import { addToCart } from '../../actions/user_actions'

class Card extends Component {
  renderCardImage(images) {
    if (images.length > 0) {
      return images[0].url
    } else {
      return "/images/image_not_available.png"
    }
  }
  render() {
    const props = this.props
    return (
      <div className={`card_item_wrapper ${props.grid}`}>
        <div className="image" style={{ background: `url(${this.renderCardImage(props.images)}) no-repeat` }}></div>
        <div className="action_container">
          <div className="tags">
            <div className="brand">{props.brand && props.brand.name ? props.brand.name : 'No Name available'}</div>
            <div className="name">{props.name}</div>
            <div className="name">${props.price}</div>
          </div>
        {props.grid ? <div className="description">
    <p>{props.description}</p>
        </div> : null}
        <div className="actions">
          <div>
            <MyButton
              type="default"
              altClass="card_link"
              title="View Product"
              linkTo={`/product_detail/${props._id}`}
              addStyles={{ margin: "10px 0 0 0" }}
            />
          </div>
          <div className="button_wrapp">
            <MyButton 
            type="bag_link"
             runAction={() => {
               props.user.userData.isAuth ? this.props.addToCart(props._id) : 
               console.log('You need to be signed in')
             }}
              />
          </div>
        </div>
        </div>
      </div>
    )
  }
}

export const mapStateToProps = state => {
  return {
    user: state.user,
    products: state.products
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    addToCart: (data) => dispatch(addToCart(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)