import React, { Component } from "react"
import PageTop from "../../utils/pagetop"
import { connect } from "react-redux"
import { getProductsByBrands, getProductsByWoods, getProductsToShop } from "../../actions/product_actions"
import CollapseCheckbox from "../../utils/collapseCheckbox"
import CollapseRadio from "../../utils/collapseRadio"
import { frets, price } from "../../utils/Forms/fixed_categories"
import LoadMoreCards from './loadMoreCards'
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import faBars from "@fortawesome/fontawesome-free-solid/faBars"
import faTh from "@fortawesome/fontawesome-free-solid/faTh"

class Shop extends Component {
  state = {
    grid:'',
    limit:6,
    skip:0,
    filters:{
        brand:[],
        frets:[],
        wood:[],
        price:[]
    }
}
  componentDidMount() {
    const { skip, limit, filters } = this.state
    this.props.getBrands()
    this.props.getWoods()
     this.props.dispatch(getProductsToShop(skip,limit,filters))
   // this.props.getProductsToShop(skip,limit,filters)
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

  loadMoreCards = () => {
    const { skip, limit, filters } = this.state;
    const { products: { toShop }} = this.props;
    let newSkip = skip + limit
    this.props.getProductsToShop(newSkip,limit,filters,toShop)
    this.setState({skip})
  }

  handleGrid = () => {
    this.setState({
      grid: !this.state.grid ? 'grid_bars' : ''
    })
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
            <div className="right">
              <div className="shop_options">
                <div className="shop_grids clear">
                  <div className={`grid_btn ${this.state.grid ? '' : 'active'}`}
                  onClick={() => this.handleGrid()}>
                    <FontAwesomeIcon icon={faTh}/>
                  </div>
                  <div className={`grid_btn ${!this.state.grid ? '' : 'active'}`}
                  onClick={() => this.handleGrid()}>
                    <FontAwesomeIcon icon={faBars}/>
                  </div>
                </div>
              </div>
              <div>
                <LoadMoreCards grid={this.state.grid}
                limit={this.state.limit}
                size={products.toShopSize} 
                products={products.toShop}
                loadMore={() => this.loadMoreCards()}/>
              </div>
            </div>
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
    getBrands: () => { dispatch(getProductsByBrands())},
    getWoods: () => { dispatch(getProductsByWoods())},
    getProductsToShop: () => { dispatch(getProductsToShop())}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Shop)
