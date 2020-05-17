import React, { Component } from 'react';

import Header from '../components/Header_footer/Header';
import Footer from '../components/Header_footer/Footer';
import {connect} from 'react-redux'
import {getSiteInfo} from '../actions/site_actions'

class Layout extends Component {

    componentWillMount(){
        if(Object.keys(this.props.siteInfo).length === 0){
            this.props.getSiteInfo()
        }
    }
    render() {
        return (
            <div>
                <Header/>
                <div className="page_container">
                    {this.props.children}
                </div>
                <Footer data={this.props.siteInfo}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        siteInfo: state.siteInfo
    }
}

const mapDispatchToProps  = dispatch => {
    return {
        getSiteInfo: () =>  dispatch(getSiteInfo()) 
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Layout);