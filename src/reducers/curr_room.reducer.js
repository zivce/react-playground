/**
 * Will contain new room for global state 
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
        case 'CURR_ROOM' :
            let curr_room = action.id            
            return state =  curr_room;
        default:
            return state;
    }
}
