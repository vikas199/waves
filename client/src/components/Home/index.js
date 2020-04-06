import React, { Component } from 'react';
import HomeSlider from './home_slider';
import PromotionSlider from './home_promotions'
import { connect } from 'react-redux';
import { getProductsByArrival, getProductsBySale } from '../../actions/product_actions'
import CardBlock from './card_block';



class Home extends Component {

    componentDidMount(){
       this.props.getProductsBySale()
       this.props.getProductsByArrival()
    }
    render() {
        return (
            <div>
              <HomeSlider />
              <CardBlock list={this.props.products.bySale} title="Best Selling Guitars"/>
              <PromotionSlider />
              <CardBlock list={this.props.products.byArrival} title="New Arrivals"/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.products
    }
}
const mapDispatchToProps = dispatch => {
    return {
      // dispatching plain actions
      getProductsBySale: (data) => dispatch(getProductsBySale(data)),
      getProductsByArrival: data => dispatch(getProductsByArrival(data))
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Home)
