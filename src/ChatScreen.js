import React, {Component} from 'react';
import ChatKit from '@pusher/chatkit';
import MessageList from './components/MessageList';

class ChatScreen extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            currentUser : {},
            currentRoom : {},
            messages: []
        }
    }

    componentDidMount(){
        const chatManager = new ChatKit.ChatManager({
            instanceLocator: 'v1:us1:5ec648b6-bad9-4c16-880c-869fdf2a6814',
            userId : this.props.currentUsername,
            tokenProvider : new ChatKit.TokenProvider({
                url:'http://localhost:3001/authenticate'
            })
        })

        chatManager
            .connect()
            .then(currentUser => {
                this.setState({currentUser});

                return currentUser.subscribeToRoom({
                    roomId : 7557536,
                    messageLimit : 100,
                    hooks : {
                        onNewMessage: message => {
                            this.setState({
                                messages: [...this.state.messages,message]
                            })
                        }
                    }
                })

            })

    }
    render(){
        
        console.log("chat",this.props);

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
                    </aside>
                    
                    <section style={styles.chatListContainer}>
                        
                        <MessageList 
                        messages = {this.state.messages}
                        style = {styles.chatList}/>

                    </section>

                </div>
                

            </div>
        )
    }
}

export default ChatScreen;