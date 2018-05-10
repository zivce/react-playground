import React, {Component} from 'react';
import {ToastContainer} from 'react-toastr';
import toastrcss from '../toastr.css';

class UsernameForm extends Component{
    constructor(props)
    {
        super(props);

        this.state = {
            username: '',
            success : false,
            error : false,
        }

        this.container = null,

    
        this.toastr = 
        <ToastContainer     
        className="toast-top-right"
        preventDuplicates = {true}
        newestOnTop = {true}
        ref = {ref => this.container = ref}
        /> 

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    shouldComponentUpdate(nextProps,nextState)
    {
        return (nextProps.success || nextProps.error)
    }

    componentWillReceiveProps()
    {
        console.log(this.props);

        if(this.props.success)
        {
            this.setState({success : true});
        }


        if(this.state.success)
        {
            this.container.success("You may proceed to chat","Welcome")
            // this.container.clear();
            this.setState({success:false})
        }    

        if(this.props.error)
        {
            this.setState({error : true});
        }

        if(this.state.error)
        {
            this.container.error("User exists","Error");

            // this.container.clear();

            this.setState({error:false})
        }
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