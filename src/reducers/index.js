import { combineReducers } from 'redux';
import currentUser from './current_user.reducer';
import roomsAdd from './rooms.reducer';
import msgsAdd from './msgsadd.reducer';

const rootReducer = combineReducers({
    currentuser : currentUser,
    rooms : roomsAdd,
    msgs : msgsAdd
})

export default rootReducer;
