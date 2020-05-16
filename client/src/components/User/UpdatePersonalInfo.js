import React, { Component } from "react"
import FormField from "../../utils/Forms/FormField"
import { connect } from "react-redux"
import { update, genereteData, isFormValid, populateFields } from "../../utils/Forms/FormActions"
import { updateUserData, clearUserData } from "../../actions/user_actions"

class UpdatePersonalInfo extends Component {
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
          placeholder: "Enter your name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          name: "lastname_input",
          type: "text",
          placeholder: "Enter your last name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email",
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
    },
  }

  componentDidMount() {
    const newFormdata = populateFields(this.state.formdata, this.props.user.userData)
    this.setState({ formdata: newFormdata })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.user.updatedUserValue !== nextProps.user.updatedUserValue){
      this.setState({formSuccess: true})
      setTimeout(()=>{
        this.props.clearUserData()
        this.setState({formSuccess: false})
      },500)
    }
  }

  // componentDidUpdate(){
  //       if(this.props.user.updatedUserValue){
  //     this.setState({formSuccess: true})
  //     setTimeout(()=>{
  //       this.props.clearUserData()
  //       this.setState({formSuccess: false})
  //     },500)
  //   }
  // }

  submitForm = (event) => {
    event.preventDefault()
    let dataToSubmit = genereteData(this.state.formdata, "update_user")
    let formIsValid = isFormValid(this.state.formdata)
    if (formIsValid) {
      this.props.updateUserData(dataToSubmit)
    } else {
      this.setState({ formError: true })
    }
  }

  updateUser = (element) => {
    const newFormdata = update(element, this.state.formdata, "update_user")
    this.setState({
      formError: false,
      formdata: newFormdata,
    })
  }
  render() {
    console.log('props', this.props)
    return (
      <div>
        <form onSubmit={(event) => this.submitForm()}>
          <h2>Personal Information</h2>
          <div className="form_block_two">
            <div className="block">
              <FormField
                id={"name"}
                formdata={this.state.formdata.name}
                change={(element) => this.updateUser(element)}
              />
            </div>
            <div className="block">
              <FormField
                id={"lastname"}
                formdata={this.state.formdata.lastname}
                change={(element) => this.updateUser(element)}
              />
            </div>
          </div>
          <div className="block">
            <FormField
              id={"email"}
              formdata={this.state.formdata.email}
              change={(element) => this.updateUser(element)}
            />
          </div>
          {this.state.formSuccess ? <div className="form_success">Success</div> : null}
          {this.state.formError ? <div className="error_label">Please check your data</div> : null}
          <button onClick={(event) => this.submitForm(event)}>Update Personal Information</button>
        </form>
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
    updateUserData: (data) => dispatch(updateUserData(data)),
    clearUserData: () => dispatch(clearUserData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePersonalInfo)
