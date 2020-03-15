import React, { Component } from 'react';
import { update } from '../../utils/Forms/FormActions';
import { connect } from 'react-redux';
import FormField from '../../utils/Forms/FormField'

export default class Login extends Component {
  state = {
      formError: false,
      formSuccess: '',
      formdata:{
          email:{
              element: 'input',
              value: '',
              config:{
                  name: 'email_input',
                  type: 'email',
                  placeholder: 'Enter your email'
              },
              validation:{
                  required: true,
                  email: true
              },
              valid: false,
              touched: false,
              validationMessage: ''
          },
          passoword:{
            element: 'input',
            value: '',
            config:{
                name: 'password_input',
                type: 'password',
                placeholder: 'Enter your passoword'
            },
            validation:{
                required: true,
                passowrd: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        }
      }
  }

  updateForm = (element) => {
    const newFormdata = update(element,this.state.formdata,'login');
    this.setState({
        formError: false,
        formdata: newFormdata
    })
}

  submitForm = () => {

    }
  render(){
      return(
          <div className="signin_wrapper">
              <form onSubmit={(event) => this.submitForm(event)}>
                  <FormField 
                   id={'email'}
                   formdata={this.state.formdata.email}
                   change={(element) => this.updateForm(element)}
                   />
                      <FormField 
                   id={'password'}
                   formdata={this.state.formdata.passoword}
                   change={(element) => this.updateForm(element)}
                   />
              </form>
          </div>
      )
  }
}