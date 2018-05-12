function roomAdded(room)
{
    return {
        type: 'ROOM_ADDED',
        new_room: room
    }
}
export default roomAdded