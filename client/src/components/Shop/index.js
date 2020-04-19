import React, { Component } from "react"
import PageTop from "../../utils/pagetop"
import { connect } from "react-redux"
import { getProductsByBrands, getProductsByWoods, getProductsToShop } from "../../actions/product_actions"
import CollapseCheckbox from "../../utils/collapseCheckbox"
import CollapseRadio from "../../utils/collapseRadio"
import { frets, price } from "../../utils/Forms/fixed_categories"

class Shop extends Component {
  state = {
    grid: "",
    limitValue:6,
    skip:0,
    filters: {
      brand: [],
      frets: [],
      wood: [],
      price: [],
    },
  }
  componentDidMount() {
    const { skip, limitValue, filters } = this.state
    this.props.getBrands()
    this.props.getWoods()
    this.props.getProductsToShop(skip,limitValue,filters)
  }

  handlePrice = (value) => {
    const data = price
    let array = []
    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = [data[key].array]
      }
    }
    return array
  }

  // showFilteredResults = (filters) => {
  //   const { limit } = this.state
  //   console.log('newFilters', filters)
  //   this.props.getProductsToShop(0,limit,filters).then(()=>{
  //     this.setState({skip: 0})
  //   })
  // }



  showFilteredResults = (filters) =>{
    this.props.dispatch(getProductsToShop(
        0,
        this.state.limit,
        filters
    )).then(()=>{
        this.setState({
            skip:0
        })
    })
}
  handleFilters = (filters, category) => {
    const newFilters = {...this.state.filters}
    newFilters[category] = filters

    if (category === "price") {
      let priceValues = this.handlePrice(filters)
      newFilters[category] = priceValues
    }
    this.showFilteredResults(newFilters)
    this.setState({ filters: newFilters })
  }

  render() {
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
              <CollapseRadio
                initState={true}
                title="Price"
                list={price}
                handleFilters={(filters) => this.handleFilters(filters, "price")}
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
    getProductsToShop: (data) => dispatch(getProductsToShop(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Shop)
