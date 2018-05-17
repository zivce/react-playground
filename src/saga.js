import { call, put, take, fork,select } from 'redux-saga/effects'

import addMsg from './components/actions/add_messages.action';
import fetchConcurrent from './components/actions/fetch_concurrent.action';


//Worker sagas 
function * fetchMessage()
{
    while(true)
    {        
        const msg = yield take(fetchConcurrent);

        const msgs = yield select(state => state.messages)
        
        console.group("fetch message")
            console.log("from fetch messages", msgs);
            console.log("from fetch messages fetch concurrent", msg);
        console.groupEnd()

    }
}


// //Bundler saga
// function* rootSaga() {
//     yield [
//         fork(fetchMessage),
//         take()
        
//     ]
    
// }

function * rootSaga () {
    yield fetchMessage()
}

export default rootSaga;
