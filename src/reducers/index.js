import { combineReducers } from 'redux';
import currentUser from './current_user.reducer';
import roomsAdd from './rooms.reducer';
import msgsAdd from './msgsadd.reducer';
import currRoom from './curr_room.reducer';

const rootReducer = combineReducers({
    currentuser : currentUser,
    rooms : roomsAdd,
    messages : msgsAdd,
    currentroom : currRoom
})

export default rootReducer;
