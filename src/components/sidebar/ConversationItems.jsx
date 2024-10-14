import "./sidebar.css"
const ConversationItems = ({ props }) => {
    return (
        <div className="conversation-container">
            <p className="con-icon">{props.name[0]}</p>
            <div>
                <p className="con-title">{props.name}</p>
                <p className="con-lastMessage">{props.lastMessage}</p>
            </div>
            <p className="con-timeStamp">{props.timeStamp}</p>

        </div>
    )
}

export default ConversationItems

