import React, { Component } from 'react'
import { connect } from "react-redux"
import { update, genereteData, isFormValid, resetFields } from "../../../utils/Forms/FormActions"
import { getProductsByWoods, addWood } from "../../../actions/product_actions"
import FormField from "../../../utils/Forms/FormField"


class ManageWoods extends Component {

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
              placeholder: "Enter the wood",
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
      this.props.products.byWoods
        ? this.props.products.byWoods.map((item, i) => (
            <div className="category_item" key={i}>
              {item.name}
            </div>
          ))
        : null
  
    componentDidMount() {
      this.props.getProductsByWoods()
    }
  
    componentDidUpdate(prevProps){
        const { products } = this.props
        if(prevProps.products.addNewWoods !== products.addNewWoods && products.addNewWoods){
            this.resetFieldHandler()
        }
  
    }
  
  
    resetFieldHandler = () => {
      const newFormData = resetFields(this.state.formdata, "woods")
      this.setState({ formdata: newFormData, formSuccess: true })
      setTimeout(() => {
          this.setState({ formSuccess: false })
        }, 300)
    }
  
    updateForm = (element) => {
      const newFormdata = update(element, this.state.formdata, "woods")
      this.setState({
        formError: false,
        formdata: newFormdata,
      })
    }
  
    submitForm = (event) => {
      event.preventDefault()
      let dataToSubmit = genereteData(this.state.formdata, "woods")
      let formIsValid = isFormValid(this.state.formdata)
      let existingBrands = this.props.products.byWoods
      if (formIsValid) {
        this.props.addWood(dataToSubmit, existingBrands)
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
                  <button onClick={(event) => this.submitForm(event)}>Add Wood</button>
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
          getProductsByWoods: () => dispatch(getProductsByWoods()),
          addWood: (data, value) =>  dispatch(addWood(data, value))
      }
  }


export default connect(mapStateToProps, mapDispatchToProps)(ManageWoods)
