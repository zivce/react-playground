import React, {Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import userSigned from '../components/actions/user_signed.action';

import toastrcss from '../toastr.css';
import toastr from 'toastr';

//B3 comps 
import { Button } from 'react-bootstrap';


class UsernameForm extends Component{
    constructor(props)
    {
        super(props);

        this.state = {
            username: '',
            success : false,
            error : false,
            chat_now : false
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
        let user = this.state.username;
        
        this.setState({
            chat_now : true
        })

        this.props.postUsername(user);
        this.forceUpdate();

    }   

    onChange($event)
    {
        this.setState({username:$event.target.value});
    }

    render(){
        const styles =  {
            login_form : {
                display: "flex",
                flexDirection: "column"
            },
            input_login_form : {
                marginBottom: "6%"
            }
        }

        return(
            
            <div className="username_container">
                
                {/* before signed in and after signed in logic */}
                
                {
                    (!this.state.chat_now)
                    ? (<div>
                        <h1>insert your username.</h1>

                        <form 
                        style = { styles.login_form }
                        onSubmit={this.onSubmit}>
        
                        <input 
                        style = {styles.input_login_form}
                        type="text" 
                        placeholder = "username"
                        onChange = {this.onChange}
                        />
        
                        <Button bsStyle="primary"  type="submit">
                            Log in.
                        </Button>
        
                        </form>

                        </div>)
                    :(
                        <div className="welcome_container">

                            <h1>
                                {`Welcome ${this.props.current_user_local}`}
                            </h1>

                            <Button 
                            href={`/chat/${this.props.current_user_local}`} 
                            bsStyle="info">
                            
                                Chat now!
                            
                            </Button>
                        
                        </div>
                    )
                }
                

                {this.toastr}

            </div>
        )
    }

}
function mapStateToProps(state) {
    return {
      current_user_local: state.currentuser.py
    };
  }

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        userSignedLocal : userSigned,
    },dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(UsernameForm);