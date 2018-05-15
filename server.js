const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const ChatKit = require('pusher-chatkit-server');

const app = express()

const chatkit = new ChatKit.default({
  instanceLocator : 'v1:us1:5ec648b6-bad9-4c16-880c-869fdf2a6814',
  key : '546cd609-83d0-4cd4-86c4-eaccbb57d10c:pOmHVWyqczi4LCqe1uNLScMbWUeiV//KBfk6eSV9ncs='
})


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/getallrooms',)


/**
 * Used for sending username to server
 */

app.post('/users',(req,res)=>{
  const {username}  = req.body;
  
  chatkit
    .createUser({
      id:username,
      name:username
    })
    .then(()=>res.sendStatus(201))
    .catch((err)=>{

      if(err.error === 'services/chatkit/user_already_exists')
      {
        res.sendStatus(409);
      }
      else
      {
        res.status(error.status).json(error);
      }

    })
})




/**
 * Used for auth
 */
app.post('/authenticate',(req,res)=>{
  const authData = chatkit.authenticate({userId:req.query.user_id})
  res.status(authData.status).send(authData.body);

})

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
