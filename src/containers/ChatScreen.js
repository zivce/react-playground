import React, {Component} from 'react';
import ChatKit from '@pusher/chatkit';
import MessageList from '../components/MessageList';
import SendMessageForm from '../components/SendMessageForm';
import WhosOnlineContainer from '../containers/WhosOnlineList';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import getUser from '../components/actions/get_user.action';
import signedUser from '../components/actions/user_signed.action';

class ChatScreen extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            currentUser : {},
            currentRoom : {},
            messages: [],
            users : [],
            chat_manager : null
        }
        
        this.sendMessage = this.sendMessage.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    sendMessage(text)
    {
        this.state.currentUser.sendMessage({
            text,
            roomId : 7580432
        })
    }
    componentDidMount(){
        let user = localStorage.getItem("user");
        this.props.signedUser(user);

        const chatManager = new ChatKit.ChatManager({
            instanceLocator: 'v1:us1:5ec648b6-bad9-4c16-880c-869fdf2a6814',
            userId : user,
            tokenProvider : new ChatKit.TokenProvider({
                url:'http://localhost:3001/authenticate'
            })
        })

        this.setState({chat_manager : chatManager})

        chatManager
            .connect()
            .then(currentUser => {
                
                this.setState({currentUser});

                return currentUser.subscribeToRoom({
                    roomId : 7580432,
                    messageLimit : 100,
                    hooks : {
                        onUserCameOnline : ()=> this.forceUpdate(),
                        onUserWentOffline : () => this.forceUpdate(),
                        onUserJoined : () => this.forceUpdate(),

                        onNewMessage: message => {
                            this.setState({
                                messages: [...this.state.messages,message]
                            })
                        }
                    }
                })

            })
            .then(currentRoom => {
                this.setState({currentRoom});
                this.setState({users:currentRoom.users})
            })
            

    }
    render(){
        
        
        const styles = {    
            container : {
                height: "100vh",
                display: "flex",
                flexDirection:"column"
            },
            
            chatContainer : {
                display:'flex',
                flex:1,
            },
            
            whosOnlineContainer : {
                overflow : "auto",
                width: "300px",
                flex : "none",
                padding : 20,
                backgroundColor : "#2c303b",
                color:"white"
            },

            chatListContainer : {
                padding : 20,
                width:"85%",
                display:"flex",
                flexDirection : "column"
            },
            
        }
        


        return (
            <div style={styles.container}>
                
                <div style={styles.chatContainer}>
                    
                    <aside style={styles.whosOnlineContainer}>
                        <h2>Whos online</h2>
                        <WhosOnlineContainer
                        current_user = {this.state.currentUser}
                        roomname = {this.state.currentRoom.name}
                        currentUser = {this.state.currentUser.name}
                        users = {this.state.currentRoom.users} />
                    </aside>
                    
                    <section style={styles.chatListContainer} ref="chat_list">
                        
                        <MessageList 
                        messages = {this.state.messages}
                        style = {styles.chatList}/>
                       
                        <SendMessageForm sendMsg = {this.sendMessage}/>
                    </section>

                </div>
                

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
        signedUser,
       getUser
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ChatScreen);