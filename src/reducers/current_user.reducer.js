/**
 * Will contain current user for sesh
 */


export default function(state = {},action) {
    
    //Guard.
    if( typeof state === 'undefined')
    {
        return state;
    }

    //Modify state.
    switch(action.type)
    {
        case 'USER_SIGNED' :
            const nextState = {...state,  currentuser :  action.payload};
            return state =  nextState;
        case 'GET_USER' : 
            return state;
        default:
            return state;
    }
}
