export default function (props,roomid){
    
    if(!props || !roomid)
        return;

    props.subscribeToRoom({
        roomId : roomid,
        hooks : {
            onNewMessage : message => {
                this.props.addMsgs(message);
            }
        }
    })

}