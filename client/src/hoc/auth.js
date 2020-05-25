import React from 'react'
import { connect } from 'react-redux'
import { auth } from '../actions/user_actions'
import CircularProgress from '@material-ui/core/CircularProgress'



export default function(ComposedClass, reload,adminRoute=null){
    class AuthenticationCheck extends React.Component{
        state = {
            laoding: true
        }

        componentDidMount(){
            this.props.dispatch(auth()).then(response => {
                let user =this.props.user.userData
                if(!user.isAuth){
                    if(reload){
                        this.props.history.push('/register_login')
                    }
                } else {
                    if(adminRoute && !user.isAdmin){
                     this.props.history.push('/user/dashboard')      
                    }else{
                        if(reload === false){
                        this.props.history.push('/user/dashboard')
                        }
                    }
                }
              this.setState({ laoding: false })
            })
        }
        render(){
            if(this.state.laoding){
                return (
                    <div className="main_loader">
                        <CircularProgress style={{ color: '#2196F3'}} thickness={7}/>
                    </div>
                )
            }
            return(
                <ComposedClass {...this.props} user={this.props.user}/>
            )
        }
    }

const mapStateToProps = state => {
    return{
        user: state.user
    }
}
return connect(mapStateToProps)(AuthenticationCheck)
}

