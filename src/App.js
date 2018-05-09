import React, { Component } from 'react'
import UsernameForm from './components/UsernameForm';
import ChatScreen from './ChatScreen';
import { Switch, Route} from 'react-router';

class App extends Component {
  constructor()
  {
    super();
    this.state = {
      currentUsername : ""
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this);
  }

  onUsernameSubmitted (username){

    fetch("http://localhost:3001/users",{
    method : "POST",
    headers : {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({username})
    })
    .then(resp=>{

      this.setState({
        currentUsername:username
      })
    })
    .catch(err=>{
      console.error(err);
    })
}

  render() {
    return(
    <Switch>
      <Route path="/chat" 
      render = {()=><ChatScreen currentUsername={this.state.currentUsername}/>}
      />
    
      <Route path="/" 
      render = {
      
        ()=><UsernameForm postUsername={this.onUsernameSubmitted}/>
      
      }/>

      </Switch>
    )
  }
}

export default App
