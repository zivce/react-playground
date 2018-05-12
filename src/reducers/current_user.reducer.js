/**
 * Will contain current user for sesh
 */


const initState = 
{};

export default function(state = initState,action) {
    
    //Guard.
    if( typeof state === 'undefined')
    {
        return state;
    }

    //Modify state.
    switch(action.type)
    {
        case 'USER_SIGNED' :
            let py = action.payload
            const nextState = {...state, py};
            return state =  nextState;
        case 'GET_USER' : 
            return state;
        default:
            return state;
    }
}
