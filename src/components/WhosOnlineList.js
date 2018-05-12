import React, {Component} from 'react';
import RoomSetup from './RoomSetup';
import toastrcss from '../toastr.css';
import toastr from 'toastr';

export default class WhosOnlineList extends Component{

    constructor(props){
        super(props);
        this.state = {
            room_setup : false
        }
        this.createRoom = this.createRoom.bind(this);
        this.addRoom = this.addRoom.bind(this);
        this.new_room = ""
    }

    createRoom(){
       this.setState({room_setup:true})
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
        this.props.current_user.createRoom({
            name: arg_name,
            private: true,
            addUserIds: users
            }).then(room => {
                console.log(`Created room called ${room.name}`)

                toastr.success("Created new room",`${room.name}`,{
                    closeOnHover:true
                  })
                this.setState({room_setup : false});
            })
            .catch(err => {
                console.log(`Error creating room ${err}`)
            })
    }


    render(){
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
                    <ul>
                    <h1
                    style = {styles.roomstyle}
                    >
                    Room &nbsp;
                    {this.props.roomname}</h1>    
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