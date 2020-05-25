import React, { Component } from "react"
import FormField from "../../../utils/Forms/FormField"
import { connect } from "react-redux"
import { getSiteInfo, updateSiteData } from "../../../actions/site_actions"
import { update, isFormValid, populateFields, genereteData } from "../../../utils/Forms/FormActions"

class UpdateSiteInfo extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      address: {
        element: "input",
        value: "",
        config: {
          label: "Address",
          name: "address_input",
          type: "text",
          placeholder: "Enter the site address",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      hours: {
        element: "input",
        value: "",
        config: {
          label: "Working Hours",
          name: "hours_input",
          type: "text",
          placeholder: "working hours",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      phone: {
        element: "input",
        value: "",
        config: {
          label: "Enter your phone number",
          name: "phone_input",
          type: "text",
          placeholder: "enter phone number",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      email: {
        element: "input",
        value: "",
        config: {
          label: "Shop Email",
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
        showlabel: true,
      },
    },
  }

  componentDidMount() {
    this.props.getSiteInfo()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.siteInfo !== nextProps.siteInfo) {
      const newFormdata = populateFields(this.state.formdata, nextProps.siteInfo[0])
      this.setState({ formdata: newFormdata })
    } else if(this.props.updatedSiteInfo !== nextProps.updatedSiteInfo && nextProps.updatedSiteInfo.success){
        this.setState({formSuccess: true})
        setTimeout(()=>{
            this.setState({formSuccess: false})
        },2000)
    }
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, "site_info")
    this.setState({
      formError: false,
      formdata: newFormdata,
    })
  }

  submitForm = (event) => {
    event.preventDefault()
    let dataToSubmit = genereteData(this.state.formdata, "site_info")
    let formIsValid = isFormValid(this.state.formdata)
    if (formIsValid) {
      this.props.updateSiteData(dataToSubmit)
    } else {
      this.setState({ formError: true })
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={(event) => this.submitForm(event)}>
          <h1>Site Info</h1>
          <FormField
            id={"address"}
            formdata={this.state.formdata.address}
            change={(element) => this.updateForm(element)}
          />
          <FormField id={"hours"} formdata={this.state.formdata.hours} change={(element) => this.updateForm(element)} />
          <FormField id={"phone"} formdata={this.state.formdata.phone} change={(element) => this.updateForm(element)} />
          <FormField id={"email"} formdata={this.state.formdata.email} change={(element) => this.updateForm(element)} />
          {this.state.formSuccess ? <div className="form_success">Success</div> : null}
          {this.state.formError ? <div className="error_label">Please check your data</div> : null}
          <button onClick={(event) => this.submitForm(event)}>Update</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    siteInfo: state.siteInfo.siteInfo,
    updatedSiteInfo: state.siteInfo.updatedSiteInfo
  }
}

const mapDispatchTOProps = (dispatch) => {
  return {
    getSiteInfo: () => dispatch(getSiteInfo()),
    updateSiteData: (data) => dispatch(updateSiteData(data)),
  }
}

export default connect(mapStateToProps, mapDispatchTOProps)(UpdateSiteInfo)
