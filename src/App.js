import React, { Component } from 'react'
import UsernameForm from './components/UsernameForm';
import ChatScreen from './ChatScreen';
import { Switch, Route} from 'react-router';
// https://hackernoon.com/a-basic-react-redux-introductory-tutorial-adcc681eeb5e
// https://medium.com/async-la/a-stately-guide-to-react-navigation-with-redux-1f90c872f96e
// import {ToastContainer} from 'react-toastr';
import toastrcss from './toastr.css';
import toastr from 'toastr';

class App extends Component {
  constructor()
  {
    super();
    this.state = {
      currentUsername : "",
      container : "",
      success : false,
      error : false
    }

    this.container = null,

    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this);
  }

  func(){
    // this.toastr.clear();
  }
  //save user into redux.. 
  
  onUsernameSubmitted (username){
    let r_instance = this;
    fetch("http://localhost:3001/users",{
    method : "POST",
    headers : {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({username})
    })
    .then(resp=>{
      if(resp.status === 201)
      {
        toastr.success("Proceed to /chat","Welcome",{
          closeOnHover:true
        })
      }
      else if (resp.status === 400)
      {
        toastr.error("User exists","Error!",{
          closeOnHover:true
        })
      }

      window.localStorage.setItem("user",username);

      r_instance.setState({
        currentUsername:username
      })
    })
    .catch(err=>{
      console.error(err);
    })
}

  render() {
    
    return(
    <div>

    {this.toastr}
    <Switch>
    
      <Route path="/chat" 
      render = {()=><ChatScreen currentUsername={this.state.currentUsername}/>}
      />
    
      <Route path="/" 
      render = {
        ()=><UsernameForm 
        postUsername={this.onUsernameSubmitted} 
        success= {this.state.success}
        error = {this.state.error} />  
      }/>
      
    </Switch>
    </div>
    )
  }
}

export default App
