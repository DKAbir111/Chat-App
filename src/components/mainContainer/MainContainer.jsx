import Sidebar from '../sidebar/Sidebar'
import './mainContainer.css'
import Chatarea from '../chatarea/Chatarea'
import { useState } from 'react'
import Welcoome from '../welcome/Welcoome'
import Creategroup from '../createGroup/Creategroup'
import UserGroup from '../userGroup/UserGroup'

const MainContainer = () => {
    const [conversations, setConversations] = useState([
        {
            id: 1,
            name: "Demo User-1",
            lastMessage: "Hello! This is last message-1",
            timeStamp: "today",
            unread: true
        },
        {
            id: 2,
            name: "Demo User-2",
            lastMessage: "Hello! This is last message-2",
            timeStamp: "today",
            unread: true
        },
        {
            id: 3,
            name: "Demo User-3",
            lastMessage: "Hello! This is last message-3",
            timeStamp: "today",
            unread: true
        }
    ])
    return (
        <div className='main-container' >
            <Sidebar />
            {/* <Chatarea key={conversations.id} props={conversations[0]} /> */}
            {/* <Welcoome /> */}
            {/* <Creategroup /> */}
            <UserGroup />
        </div>
    )
}

export default MainContainer
