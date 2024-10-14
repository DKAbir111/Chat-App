import './welcome.css'
import liveChat from '../../../resources/live-chat-bg.png'

const Welcoome = () => {
    return (
        <div className="liveChatContainer">
            <img src={liveChat} alt="" />
            <p>View and text directly to people present in the chat Rooms
            </p>
        </div>
    )
}

export default Welcoome
