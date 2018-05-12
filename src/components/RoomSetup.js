import React, {Component} from 'react';
import toastrcss from '../toastr.css';
import toastr from 'toastr';


export default class RoomSetup extends Component{
    constructor(props)
    {
        super(props);
        this.room_name = "";
        this.room_input_users = [];
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
        this.submitInfo = this.submitInfo.bind(this);

    }

    submitInfo($event)
    {
        $event.preventDefault();
        this.props.roomUpdater(this.room_name,this.room_input_users)
    }
   
    handleRoomNameChange($event)
    {
        if(this.room_name.length > 15)
        {
            toastr.error("Long name.","Error!",{
                closeOnHover : true
            });
            return;
        }

        this.room_name = $event.target.value; 
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
                width: "200px",
                height: "fit-content",
                position: "absolute",
                top: "40px",
                left: "40px",
                padding: "1%",
                background: "#578d8d"
            }
        }
        let users = null;

        let users_check = this.props.users.map(user=>(
                <div key = {user.id}>

                    <input 
                    onInput = {this.handleInputChange}
                    
                    name={user.id} 
                    value={user.name}
                    type="checkbox">
                    </input>
                    {user.name}

                </div>
        ))

        return (
            <div style={styles.room_setup}>
                <h1>Create room</h1>
                <div>
                    <input type="text" 
                    onInput={this.handleRoomNameChange}/>
                    {users_check}
                </div>
                
                <button
                type="submit"
                style = {styles.btn_input} 
                onClick={this.submitInfo}>
                Submit
                </button>
            </div>
        )
    }


}