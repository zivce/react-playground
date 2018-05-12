import React, {Component} from 'react';
import RoomSetup from '../components/RoomSetup';
import toastrcss from '../toastr.css';
import toastr from 'toastr';
import addRoom from '../components/actions/new_room.action';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class WhosOnlineList extends Component{

    constructor(props){
        super(props);
        this.state = {
            room_setup : false
        }
        this.rooms = null;
        this.run  = 1;
        this.createRoom = this.createRoom.bind(this);
        this.addRoom = this.addRoom.bind(this);
        this.new_room = ""
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
                console.log(room);
                
                th.props.addRoom(room);

                th.props.current_user.joinRoom({
                    roomId : room.id,
                    hooks : {
                        onNewMessage: message => {
                            console.log("new msg",message);
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

                    
                    <ul>
                    <h1
                    style = {styles.roomstyle}
                    >
                    Room &nbsp;
                    {room.name}</h1>    
                    {
                    this.props.users.map((user,index)=>{
                        if(user.id === this.props.currentUser){
                            return (
                                <WhosOnlineListItem key = {index} 
                                presenceState = "online">
                                {user.name} (You)
                                </WhosOnlineListItem>)
                        }

                        return (
                            <WhosOnlineListItem 
                            key = {index} 
                            presenceState = {user.presence.state}>
                            
                            {user.name}
                            
                            </WhosOnlineListItem>)
                    })

                        
                    }
                    

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
      rooms: state.rooms
    };
  }

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
       addRoom
    },dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(WhosOnlineList);