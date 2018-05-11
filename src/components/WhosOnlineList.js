import React, {Component} from 'react';

export default class WhosOnlineList extends Component{
    render(){
        
        if(this.props.users)
        {
            return ( 
                <ul>    
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
                

            </ul>)
        }
        else
        {
            return (<li>Loading</li>)
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