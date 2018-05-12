import { combineReducers } from 'redux';
import currentUser from './current_user.reducer';
import roomsAdd from './rooms.reducer';

const rootReducer = combineReducers({
    currentuser : currentUser,
    rooms : roomsAdd
})

export default rootReducer;
