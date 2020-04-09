import React, { Component } from "react"
import PageTop from "../../utils/pagetop"
import { connect } from "react-redux"
import { getProductsByBrands, getProductsByWoods } from "../../actions/product_actions"
import CollapseCheckbox from "../../utils/collapseCheckbox"
import { frets } from '../../utils/Forms/fixed_categories'

class Shop extends Component {

    state = {
        grid: '',
        limit: 6,
        skip: 0,
        filters: {
            brands:[],
            frets:[],
            wood:[],
            price:[]
        }
    }
  componentDidMount() {
    this.props.getBrands()
    this.props.getWoods()
  }

  handleFilters = (filters,category) => {
     const newFilters = {...this.state.filters}
     newFilters[category] = filters;
     this.setState({ filters: newFilters})
  }
  render() {
      console.log(this.state)
    const products = this.props.products
    return (
      <div>
        <PageTop title="Browse Products" />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                initState={true}
                title={"Brands"}
                list={products.byBrands}
                handleFilters={(filters) => this.handleFilters(filters, "brand")}
              />
                 <CollapseCheckbox
                initState={false}
                title={"Frets"}
                list={frets}
                handleFilters={(filters) => this.handleFilters(filters, "frets")}
              />
                   <CollapseCheckbox
                initState={false}
                title={"Woods"}
                list={products.byWoods}
                handleFilters={(filters) => this.handleFilters(filters, "wood")}
              />
            </div>
            <div className="right">right</div>
          </div>
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
    // dispatching plain actions
    getBrands: (data) => dispatch(getProductsByBrands(data)),
    getWoods: (data) => dispatch(getProductsByWoods(data)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Shop)
