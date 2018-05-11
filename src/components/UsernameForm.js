import React, {Component} from 'react';


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

                {this.toastr}

            </div>
        )
    }

}

export default UsernameForm;