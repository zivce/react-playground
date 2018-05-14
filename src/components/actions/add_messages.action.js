function roomAdded(msg)
{
    return {
        type: 'ADD_MESSAGES',
        message: msg
    }
}
export default roomAdded