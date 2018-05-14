import React,{Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class MessageList extends Component{
    componentDidMount(){
    }

    render(){
        const styles = {
            container:{
                overflowY: "scroll",
                flex:1,
            },
            ul:{
                listStyle : "none"
            },
            li:{
                marginTop : 13,
                marginBottom : 13
            },
            senderUsername : {
                fontWeight : "bold"
            },
            message : {fontSize: 15}
        }
        console.log(this.props);

        if(this.props.messages)
            return (
                <div
                    style={{
                        ...this.props.style,
                        ...styles.container
                    }}
                >
                    <ul style = {styles.ul}>
                        {
                            this.props.messages.map((message,index)=>(

                                <li 
                                ref = {this.lastMessage}
                                key={index} 
                                style={styles.li}>
                                    <div>
                                        <span style = {styles.senderUsername}>
                                        {message.senderId}
                                        </span>
                                    </div>
                                    <p style={styles.message}>{message.text}</p>
                                </li>
                            )

                            )}
                    
                    </ul>


                </div>
            )


    }
}

//Just for fetching messages from store
//one object for fetching messages between rooms


function mapStateToProps(state) {
    return {
      messages : state.messages
    };
  }
function mapDispatchToProps(dispatch)
{ 
    return bindActionCreators({
    
    },dispatch)
   
}

export default connect(mapStateToProps,mapDispatchToProps)(MessageList);