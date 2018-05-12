import { combineReducers } from 'redux';
import currentUser from './current_user.reducer';

const rootReducer = combineReducers({
    current_user : currentUser
})

export default rootReducer;
