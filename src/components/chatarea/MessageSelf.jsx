import './chatarea.css'

const MessageSelf = () => {
    const selfMessage = {
        name: 'User',
        message: 'Hello this is Darun karas Abir from Dhaka Bangladesh',
        timeStamp: '12:00 PM',
        isSelf: true
    }
    return (
        <div className='selfMessageContainer'>
            <div className="selfMessage">
                <p className="messageText">{selfMessage.message}</p>
                <p className="message-timeStamp ">{selfMessage.timeStamp}</p>
            </div>
        </div>
    )
}

export default MessageSelf
