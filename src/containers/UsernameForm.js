import React, {Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import userSigned from '../components/actions/user_signed.action';
import getUser from '../components/actions/get_user.action';

class UsernameForm extends Component{
    constructor(props)
    {
        super(props);

        this.state = {
            username: '',
            success : false,
            error : false,
        }


        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    shouldComponentUpdate(nextProps,nextState)
    {
        return (nextProps.success || nextProps.error)
    }

    componentWillReceiveProps()
    {

    }
    onSubmit($event)
    {

        $event.preventDefault();

        //Action dispatch here.
        this.props.userSignedLocal(this.state.username);
    }

    onChange($event)
    {
        this.setState({username:$event.target.value});
    }

    render(){

        return(
            
            <div>
            
                <h1>insert your username.</h1>

                <form onSubmit={this.onSubmit}>

                <input 
                type="text" 
                placeholder = "username"
                onChange = {this.onChange}
                />

                <input type="submit"/>

                </form>

                {this.toastr}

            </div>
        )
    }

}
function mapStateToProps(state) {
    return {
      current_user_local: state.current_user
    };
  }

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        userSignedLocal : userSigned,
        getUser
    },dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(UsernameForm);