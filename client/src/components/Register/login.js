import React, { Component } from 'react';
import { update, genereteData, isFormValid } from '../../utils/Forms/FormActions';
import { connect } from 'react-redux';
import FormField from '../../utils/Forms/FormField'
import { loginUser } from '../../actions/user_actions';
import { withRouter } from 'react-router-dom';

 class Login extends Component {
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
          password:{
            element: 'input',
            value: '',
            config:{
                name: 'password_input',
                type: 'password',
                placeholder: 'Enter your passoword'
            },
            validation:{
                required: true,
                password: true
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

  submitForm = (event) => {
      event.preventDefault();
      let dataToSubmit = genereteData(this.state.formdata,'login')
      let formIsValid = isFormValid(this.state.formdata)
      if(formIsValid){
        this.props.loginUser(dataToSubmit);
      } else {
          this.setState({formError: true})
      }
    }

    componentDidUpdate(previousProps, previousState){
        if(previousProps.loginSucess.loginSucess !== this.props.loginSucess.loginSucess){
            this.props.history.push('/user/dashboard')
        }

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
                   formdata={this.state.formdata.password}
                   change={(element) => this.updateForm(element)}
                   />
                   {this.state.formError ? 
                   <div className="error_label">Please check your data</div> : null}
                   <button onClick={(event) => this.submitForm(event)}>Log in</button>
              </form>
          </div>
      )
  }
}

const mapStateToProps = state => {
   return {
    loginSucess: state.user.loginSucess
   }
}

const mapDispatchToProps = dispatch => {
    return {
      // dispatching plain actions
      loginUser: (data) => dispatch(loginUser(data)),
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))