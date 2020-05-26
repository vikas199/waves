import React, { Component } from "react"
import { update, genereteData, isFormValid } from "../../utils/Forms/FormActions"
import FormField from "../../utils/Forms/FormField"
import axios from "axios"
import Dialog from "@material-ui/core/Dialog"

class ResetConfirmPassword extends Component {
  state = {
    resetToken: "",
    formErrorMsg: "",
    formError: false,
    formSuccess: false,
    formdata: {
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your password",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      confirmPassword: {
        element: "input",
        value: "",
        config: {
          name: "confirm_password_input",
          type: "password",
          placeholder: "confirm your password",
        },
        validation: {
          required: true,
          confirm: "password",
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
    },
  }

  componentDidMount() {
    const resetToken = this.props.match.params.token
    this.setState({ resetToken })
  }
  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, "resetPassword")
    this.setState({
      formError: false,
      formdata: newFormdata,
    })
  }

  submitForm = (event) => {
    event.preventDefault()
    let dataToSubmit = genereteData(this.state.formdata, "resetPassword")
    let formIsValid = isFormValid(this.state.formdata)
    if (formIsValid) {
      axios.post("/api/users/reset_password", {
          ...dataToSubmit,
          resetToken: this.state.resetToken,
        })
        .then((response) => {
          if (!response.data.success) {
            this.setState({ formError: true, formErrorMsg: response.data.message })
          }
          else {
            this.setState({ formError:false, formSuccess:true })
            setTimeout(() => {
              this.props.history.push("/register_login")
            }, 3000)
          }
        })
    }
  }
  render() {
    return (
      <div className="container">
        <h1>Reset Password</h1>
        <form onSubmit={(event) => this.submitForm(event)}>
          <div className="form_block_two">
            <div className="block">
              <FormField
                id={"password"}
                formdata={this.state.formdata.password}
                change={(element) => this.updateForm(element)}
              />
            </div>
            <div className="block">
              <FormField
                id={"confirmPassword"}
                formdata={this.state.formdata.confirmPassword}
                change={(element) => this.updateForm(element)}
              />
            </div>
          </div>
          {this.state.formError ? <div className="error_label">{this.state.formErrorMsg}</div> : null}
          <button onClick={(event) => this.submitForm(event)}>Reset password</button>
        </form>
        <Dialog open={this.state.formSuccess}>
          <div className="dialog_alert">
            <div>Your Password is changed</div>
            <div>You will be redirecting to login page</div>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default ResetConfirmPassword
