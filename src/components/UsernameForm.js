import React, {Component} from 'react';

class UsernameForm extends Component{
    constructor(props)
    {
        super(props);

        this.state = {
            username: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit($event)
    {

        $event.preventDefault();
        console.log(this.state);

        debugger;
        this.props.postUsername(this.state.username);
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
            
            </div>
        )
    }

}

export default UsernameForm;