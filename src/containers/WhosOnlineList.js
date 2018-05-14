import React, {Component} from 'react';
import RoomSetup from '../components/RoomSetup';
import toastrcss from '../toastr.css';
import toastr from 'toastr';

import addRoom from '../components/actions/new_room.action';
import addMsgs from '../components/actions/add_messages.action';
import refreshMsgs from '../components/actions/refresh_messages.action';
import currRoom from '../components/actions/current_room.action';


import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class WhosOnlineList extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            room_setup : false,
        }

        this.rooms = null;
        this.run  = 1;
        this.createRoom = this.createRoom.bind(this);
        this.addRoom = this.addRoom.bind(this);
        this.new_room = ""

        this.fetchMessages = this.fetchMessages.bind(this);
        this.expandRoom = this.expandRoom.bind(this);
    }


    expandRoom ( $event,   roomid )
    {
        let container = $event.target.parentNode.parentNode;

        let room_users = container.querySelector('.room_container');

        let closed_users_container = room_users.style.display === "none";

        if(closed_users_container)
            room_users.style.display = "block";
        else 
            room_users.style.display = "none";
    } 


    changeRoom ( roomid )
    {   
        this.props.currRoom(roomid);
    }


    fetchMessages(roomid)
    {
        this.props.refreshMsgs();
        debugger;
        this.props.current_user.subscribeToRoom({
            roomId : roomid,
            hooks : {
                onNewMessage : message => {
                    this.props.addMsgs(message);
                }
            }
        })
    }
    createRoom(){
       this.setState({room_setup:true})
    }
    componentDidMount(){
        
    }
    addRoom(arg_name,users)
    {

        if(arg_name==="")
        {
            toastr.error("Insert name","Error!",{
                closeOnHover:true
            });
            return;
        }

        let th = this;
        this.props.current_user.createRoom({
            name: arg_name,
            private: true,
            addUserIds: users
            }).then(room => {
                
                th.props.addRoom(room);
                debugger;
                this.props.refreshMsgs();

                th.props.current_user.joinRoom({
                    roomId : room.id,
                    hooks : {
                        onNewMessage: message => {
                            this.props.addMsgs(message);
                        }
                    }
                })

                console.log(`Created room called ${room.name}`)

                toastr.success("Created new room",`${room.name}`,{
                    closeOnHover:true
                  })
               
                //Setting component state will trigger repaint
                this.setState({room_setup : false});

            })
            .catch(err => {
                console.log(`Error creating room ${err}`)
            })
    }


    render(){
        
        let arr = this.props.current_user.rooms;
        this.rooms = arr;

        if(arr && this.run === 1){
            arr.forEach((room)=>{
                this.props.addRoom(room);
            })
            this.run++;            
        }

        

        const styles = {
            roomstyle: {
                color : "#6ab902",
                padding: "3%"
            },
            new_room_btn : {
                padding: "5%"
            },
            room_container : {
                display: "none"
            }
        }
        let RoomSetupModal = null;

        if(this.state.room_setup)
        {
            RoomSetupModal = 
                <RoomSetup 
                roomUpdater = {this.addRoom}
                users = {this.props.users}/>
            
        }
        if(this.props.users)
        {

            return ( 
                <div>
                    {this.rooms.map (room => (
                    
                    <ul key = {room.id}>
                    <div
                    className = "room_name"
                    >
                        <h1
                        onClick = { (e) => this.expandRoom(e,room.id)}
                        style = {styles.roomstyle}
                        >
                        Room &nbsp;
                        {room.name}</h1> 
                        <button 
                        onClick={() => this.fetchMessages(room.id)}>
                        
                            subscribe
                        </button>
                        
                         {/* <button onClick={this.changeRoom(room.id)}>
                            subscribe
                        </button> */}
                    </div>
                    
                    <div 
                    className="room_container"
                    style = {styles.room_container}

                    >

                        {
                        room.userIds.map((user,index)=>{
                            if(user === this.props.currentUser){
                                return (
                                    
                                    <WhosOnlineListItem key = {index} 
                                    presenceState = "online">

                                    {user} (You)
                                    </WhosOnlineListItem>)
                            }

                            return (
                                <WhosOnlineListItem 
                                key = {index}
                                presenceState = {room.userStore.presenceStore.store[user].state}>
                                
                                {user}
                                
                                </WhosOnlineListItem>)
                        })

                            
                        }
                        
                    </div>

                </ul>
                ))}
                <button onClick = {this.createRoom}>Add new room </button>

                {RoomSetupModal}
            </div>
            )
        }
        else
        {
            return (<p>Loading...</p>)
        }
    }
}

class WhosOnlineListItem extends Component {
    render(){
        const styles = {
            li:{
                display:'flex',
                alignItems : "center"
                ,margin: "2%",
                padding : "2%"
            }
            ,
            div : {
                width : 20,
                height : 20,
                borderRadius : "50%",
                marginRight : 15
            }
        }

        return (
            <li style={styles.li}>
                <div
                style= {{
                    ...styles.div,
                    backgroundColor : 
                    this.props.presenceState === "online" ? "#0f0" : "#fefefe",
                }}/>
                {this.props.children}

            </li>
        )
    }
}

function mapStateToProps(state) {
    return {
      rooms: state.rooms,
      messages : state.messages
    };
  }

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        currRoom,
       addRoom,
       refreshMsgs,
       addMsgs
    },dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(WhosOnlineList);