import React, { Component } from "react"
import { connect } from "react-redux"
import { update, genereteData, isFormValid, resetFields } from "../../../utils/Forms/FormActions"
import { getProductsByBrands, addBrand } from "../../../actions/product_actions"
import FormField from "../../../utils/Forms/FormField"

class ManageBrands extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter your brand",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
    },
  }

  showCategoryItems = () =>
    this.props.products.byBrands
      ? this.props.products.byBrands.map((item, i) => (
          <div className="category_item" key={i}>
            {item.name}
          </div>
        ))
      : null

  componentDidMount() {
    this.props.getProductsByBrands()
  }

  componentDidUpdate(prevProps){
      const { products } = this.props
      if(prevProps.products.addNewBrand !== products.addNewBrand && products.addNewBrand){
          this.resetFieldHandler()
      }

  }


  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formdata, "brands")
    this.setState({ formdata: newFormData, formSuccess: true })
    setTimeout(() => {
        this.setState({ formSuccess: false })
      }, 300)
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, "brands")
    this.setState({
      formError: false,
      formdata: newFormdata,
    })
  }

  submitForm = (event) => {
    event.preventDefault()
    let dataToSubmit = genereteData(this.state.formdata, "brands")
    let formIsValid = isFormValid(this.state.formdata)
    let existingBrands = this.props.products.byBrands
    if (formIsValid) {
      this.props.addBrand(dataToSubmit, existingBrands)
    } else {
      this.setState({ formError: true })
    }
  }
  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Brands</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">{this.showCategoryItems()}</div>
          </div>
          <div className="right">
            <form onSubmit={(event) => this.submitForm(event)}>
              <FormField
                id={"name"}
                formdata={this.state.formdata.name}
                change={(element) => this.updateForm(element)}
              />
              {this.state.formSuccess ? <div className="form_success">Success</div> : null}
              {this.state.formError ? <div className="error_label">Please check your data</div> : null}
              <button onClick={(event) => this.submitForm(event)}>Add Brand</button>
            </form>
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

const mapDispatchToProps = dispatch => {
    return {
        getProductsByBrands: () => dispatch(getProductsByBrands()),
        addBrand: (data, value) =>  dispatch(addBrand(data, value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageBrands)
