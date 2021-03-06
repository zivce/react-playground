import React, {Component} from 'react';
import ChatKit from '@pusher/chatkit';
import MessageList from '../components/MessageList';
import SendMessageForm from '../components/SendMessageForm';
import WhosOnlineContainer from '../containers/WhosOnlineList';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import signedUser from '../components/actions/user_signed.action';
import refreshMsgs from '../components/actions/refresh_messages.action';
import addMsgs from '../components/actions/add_messages.action';
import currRoom from '../components/actions/current_room.action';
import fetchConcurrent from '../components/actions/fetch_concurrent.action';


class ChatScreen extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            currentUser : {},
            currentRoom : new Number(),
            curr_room_id : null,
            messages: [],
            users : [],
            chat_manager : null
        }
        this.instance_locator = "v1:us1:5ec648b6-bad9-4c16-880c-869fdf2a6814";
        
        this.sendMessage = this.sendMessage.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    sendMessage(text)
    {
        this.state.currentUser.sendMessage({
            text,
            roomId : this.props.curr_room
        })
    }
    componentDidMount(){
        let user_name_from_route  =  this.props.match.params.user_name;
        this.props.signedUser(user_name_from_route);

        this.setState({
            user : user_name_from_route
        })
        
        const chatManager = new ChatKit.ChatManager({
            instanceLocator: this.instance_locator,
            userId : user_name_from_route,
            tokenProvider : new ChatKit.TokenProvider({
                url:'http://localhost:3001/authenticate'
            })
        })

        this.setState({chat_manager : chatManager})

        chatManager
            .connect()
            .then(currentUser => {
                
                this.setState({currentUser});

                let no_created_rooms = currentUser.rooms.length === 0;
                
                if(no_created_rooms)
                {
                    this.props.currRoom(7580432)
                }
                else
                {
                    
                    this.props.currRoom(currentUser.rooms[0].id);
                }
               
                return currentUser
                .subscribeToRoom({
                    roomId : this.props.curr_room ,
                    messageLimit : 100,
                    hooks : {
                        onUserCameOnline : ()=> this.forceUpdate(),
                        onUserWentOffline : () => this.forceUpdate(),
                        onUserJoined : () => this.forceUpdate(),

                        onNewMessage: message => {
                            
                            //2 sec faster load time 58 msgs
                            this.props.fetchConcurrent(message);
                            
                            //this.props.addMsgs(message);
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
                        <WhosOnlineContainer
                        room = {this.state.curr_room_id}
                        current_user = {this.state.currentUser}
                        roomname = {this.state.currentRoom.name}
                        currentUser = {this.state.currentUser.name}
                        users = {this.state.currentRoom.users} />
                    </aside>
                    
                    <section style={styles.chatListContainer} ref="chat_list">
                        
                        <MessageList 
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
      current_user_local: state.current_user,
      messages : state.messages,
      curr_room : state.currentroom
    };
  }
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        currRoom,
        signedUser,
        addMsgs,
        refreshMsgs,
        fetchConcurrent
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ChatScreen);