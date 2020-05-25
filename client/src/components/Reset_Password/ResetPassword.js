import React, { Component } from "react"
import { update, genereteData, isFormValid } from "../../utils/Forms/FormActions"
import FormField from "../../utils/Forms/FormField"
import axios from "axios"

export default class ResetPassword extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
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
  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, "resetEmail")
    this.setState({
      formError: false,
      formdata: newFormdata,
    })
  }

  submitForm = (event) => {
    event.preventDefault()
    let dataToSubmit = genereteData(this.state.formdata, "register")
    let formIsValid = isFormValid(this.state.formdata)
    if (formIsValid) {
      axios.post("/api/users/reset_user", dataToSubmit).then((response) => {
        if (response.data.success) {
          this.setState({ formSuccess: true })
        }
      })
    } else {
      this.setState({ formError: true })
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Reset Password</h1>
        <form onSubmit={(event) => this.submitForm(event)}>
          <FormField id={"email"} formdata={this.state.formdata.email} change={(element) => this.updateForm(element)} />
          {this.state.formSuccess ? <div className="form_success">Done, check your email</div> : null}
          {this.state.formError ? <div className="error_label">Please check your data</div> : null}
          <button onClick={(event) => this.submitForm(event)}>Send email to reset password</button>
        </form>
      </div>
    )
  }
}
