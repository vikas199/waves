import React, { Component } from 'react';
import { update, genereteData, isFormValid } from '../../utils/Forms/FormActions';
import FormField from '../../utils/Forms/FormField'
import { connect } from 'react-redux';
import { registerUser } from '../../actions/user_actions';
import Dialog from '@material-ui/core/Dialog'
import { withRouter } from 'react-router-dom';



class Register extends Component {
   state= {
        formError: false,
        formSuccess: false,
        formdata:{
            name:{
                element: 'input',
                value: '',
                config:{
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                validation:{
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            lastname:{
                element: 'input',
                value: '',
                config:{
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Enter your last name'
                },
                validation:{
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
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
                placeholder: 'Enter your password'
            },
            validation:{
                required: true,
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        confirmPassword:{
            element: 'input',
            value: '',
            config:{
                name: 'confirm_password_input',
                type: 'password',
                placeholder: 'confirm your password'
            },
            validation:{
                required: true,
                confirm: 'password'
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        }
    }
    submitForm = (event) => {
        event.preventDefault();
        let dataToSubmit = genereteData(this.state.formdata,'register')
        let formIsValid = isFormValid(this.state.formdata)
        if(formIsValid){
            this.props.registerUser(dataToSubmit);
        } else {
            this.setState({formError: true})
        }
      }

    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'register');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    } 

    componentDidUpdate(previousProps, previousState){
        if (previousProps.register.success !== this.props.register.success) {
            this.setState({ formError: false, formSuccess: true})
            setTimeout(()=> {
                this.props.history.push('/register_login')
            }, 3000)
        }
    }
    render(){
        return(
            <div className="page_wrapper">
                <div className="container">
                    <div className="register_login_container">
                        <div className="left">
                            <form onSubmit={(event) => this.submitForm(event)}>
                            <h2>Personal Info</h2>
                            <div className="form_block_two">
                                <div className="block">
                                <FormField 
                                 id={'name'}
                                formdata={this.state.formdata.name}
                                change={(element) => this.updateForm(element)}
                                 /> 
                                </div>
                                <div className="block">
                                <FormField 
                                id={'lastname'}
                                formdata={this.state.formdata.lastname}
                                change={(element) => this.updateForm(element)}
                                  /> 
                                </div>
                            </div>
                            <div>
                            <FormField 
                             id={'email'}
                             formdata={this.state.formdata.email}
                            change={(element) => this.updateForm(element)}
                             />
                            </div>
                            <h2>Verify Password</h2>
                            <div className="form_block_two">
                            <div className="block">
                                <FormField 
                                 id={'password'}
                                formdata={this.state.formdata.password}
                                change={(element) => this.updateForm(element)}
                                 /> 
                                </div>
                                <div className="block">
                                <FormField 
                                id={'confirmPassword'}
                                formdata={this.state.formdata.confirmPassword}
                                change={(element) => this.updateForm(element)}
                                  /> 
                                </div>
                            </div>
                            {this.state.formError ? 
                        <div className="error_label">Please check your data</div> : null}
                            <button onClick={(event) => this.submitForm(event)}>Create an account</button>
                            </form>
                        </div>
                    </div>
                </div>
                <Dialog open={this.state.formSuccess}>
                    <div className="dialog_alert"><div>Congratulation ..@@@</div><div>You will be redirecting to login page</div></div>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
     register: state.user.register
    }
 }


const mapDispatchToProps = dispatch => {
    return {
      // dispatching plain actions
      registerUser: (data) => dispatch(registerUser(data)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register))