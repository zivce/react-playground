import React, {Component} from 'react';
import toastrcss from '../toastr.css';
import toastr from 'toastr';

//Font awesome
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faWindowClose from '@fortawesome/fontawesome-free-solid/faWindowClose'


//B3 comps
import Button from 'react-bootstrap/lib/Button';

export default class RoomSetup extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            room_name : ''
        }
        this.room_input_users = [];
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
        
        this.submitInfo = this.submitInfo.bind(this);

    }

    submitInfo($event)
    {
        $event.preventDefault();
        this.props.roomUpdater(this.state.room_name,this.room_input_users)
    }
   
    handleRoomNameChange($event)
    {

        this.setState({
            room_name : $event.target.value
        })


        if(this.state.room_name.length > 15)
        {
            toastr.error("Long name.","Error!",{
                closeOnHover : true
            });
            return;
        }
    }
    handleInputChange($event)
    {
      
        
        if($event.target.checked)
        {
            this.room_input_users.push($event.target.value);
        }
        else
        {
            let ind = this.room_input_users.indexOf($event.target.value);

            if(ind !== -1)
            {
                this.room_input_users.splice(ind,1);
            }

        }
    }
    render(){
        const styles = {
            btn_input : {
                padding: "4%"
            },
            room_setup : {
                width: "20vw",
                height: "fit-content",
                position: "absolute",
                top: "2vw",
                left: "23vw",
                padding: "2%",
                background: "rgb(44, 48, 59)"
            },
            select_users : {
                margin: "0.8vw",
            },
            users_container : {
                height: "40vh",
                overflow : "auto"
            },
            input_room: {
                color : "black"
            },
            fa_window_close : {
                cursor : "pointer",
                float: "right",
                marginTop: "-24%",
                color: "red",
                width: "20px",
                height: "20px"
            },
            check_users : {
                textAlign : "center",
                margin: "4px",
                verticalAlign: "middle"
            }
        }
        let users = null;

        let users_check = this.props.users.map(user=>(
                <div key = {user.id} style={styles.select_users}> 
                    
                    
                    <input 
                    onInput = {this.handleInputChange}
                    style = {styles.check_users}
                    name={user.id} 
                    value={user.name}
                    type="checkbox">
                    </input>
                    {user.name}

                </div>
        ))

        return (
            <div style={styles.room_setup}>

                <h3>Create room</h3>

                <FontAwesomeIcon
                onClick = {this.props.closeMe} 
                style = {styles.fa_window_close} 
                    icon = {faWindowClose}
                />
                <div>
                    <input 
                    style = {styles.input_room}
                    type="text" 
                    onInput={this.handleRoomNameChange}
                    value = {this.state.room_name}/>
                   
                    <div style={styles.users_container}>
                        {users_check}                    
                    </div>
                
                </div>
                
                <Button
                bsStyle="success"
                type="submit"
                onClick={this.submitInfo}>
                Create room
                </Button>
            </div>
        )
    }


}