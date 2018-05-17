import { call, put, take, fork,select } from 'redux-saga/effects'
import { takeEvery} from "redux-saga/effects"

import addMsg from './components/actions/add_messages.action';
import fetchConcurrent from './components/actions/fetch_concurrent.action';

//Worker saga
function * fetchMessage()
{
    while(true)
    {        
        const fetch_conc_rrent = yield take('FETCH_CONCURRENT');

        const msgs = yield put({
            type:'ADD_MESSAGES',
            message: fetch_conc_rrent.msg
        });
        

    }
}


//Bundler saga
function * rootSaga () {
    yield fetchMessage()
}

export default rootSaga;
