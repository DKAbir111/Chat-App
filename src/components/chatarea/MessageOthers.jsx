
import './chatarea.css'
const MessageOthers = () => {
    const othersMessage = {
        name: 'User',
        message: 'Hello this is Darun karas Abir from Dhaka Bangladesh',
        timeStamp: '12:00 PM',
        isSelf: true
    }
    return (
        <div className='otherMessageContainer'>
            <div className="othersMessage">

                <p className='message-icon'>{othersMessage.name[0]}</p>
                <div className="othersMessage-content">
                    <p className='message-title'>{othersMessage.name}</p>
                    <p className="messageText">{othersMessage.message}</p>
                    <p className="message-timeStamp">{othersMessage.timeStamp}</p>
                </div>

            </div>
        </div>
    )
}

export default MessageOthers
