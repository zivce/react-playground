/**
 * Will contain current user for sesh
 */


const initState = 
[];

export default function(state = initState,action) {
    
    //Guard.
    if( typeof state === 'undefined')
    {
        return state;
    }

    //Modify state.
    switch(action.type)
    {
        case 'REFRESH_MESSAGES' :
            let freshState = []; 
            return freshState;
        case 'ADD_MESSAGES' :
            let msg = action.message
            const nextState = [...state, msg];
            return state = nextState;
        default:
            return state;
    }
}
