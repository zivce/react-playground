/**
 * Will contain new room for global state 
 */



export default function(state = [],action) {
    
    //Guard.
    if( typeof state === 'undefined')
    {
        return state;
    }

    //Modify state.
    switch(action.type)
    {
        case 'ROOM_ADDED' :
            let room = action.new_room
            const nextState = [...state, {room}];
            return state =  nextState;
        default:
            return state;
    }
}
