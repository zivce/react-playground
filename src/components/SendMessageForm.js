import React, {Component} from 'react';

class SendMessageForm extends Component{
    constructor(props)
    {
        super(props);
        this.state ={
            text:''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    onSubmit($event)
    {
        $event.preventDefault();
        this.props.sendMsg(this.state.text);
        this.setState({text:''})
    }

    onChange($event)
    {
        this.setState({text : $event.target.value});

        if(this.props.changeText)
            this.props.changeText();
    }

    render(){
        const styles = {
            container:{
                padding : 20,
                borderTop : '1px #fff solid',
                marginBottom: 20,
            },
            form : {
                display:'flex'
            },
            input : {
                color: 'inherit',
                background:"none",
                outline:"none",
                border:'none',
                flex:1,
                fontSize:16,
            }
        }

        return ( 
            <div style = {styles.container}>
                <div>
                    
                    <form onSubmit = {this.onSubmit} style = {styles.form}>
                        <input 
                        type="text"
                        placeholder="Type a message here then hit ENTER"
                        onChange = {this.onChange}
                        value = {this.state.text}
                        style = {styles.input}/>
                    
                    </form>
                
                </div>
            
            </div>

        )

    }

}

export default SendMessageForm;