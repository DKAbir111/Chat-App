import { IconButton } from '@mui/material';
import './sidebar.css'
import ConversationItems from "./ConversationItems"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const Sidebar = () => {
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
        <div className='sidebar-container'>
            <header className='header'>
                <div>
                    <IconButton>
                        <AccountCircleIcon />
                    </IconButton>
                </div>
                <div>
                    <IconButton>
                        <PersonAddAlt1Icon />
                    </IconButton>
                    <IconButton>
                        <GroupAddIcon />
                    </IconButton>
                    <IconButton>
                        <AddCircleIcon />
                    </IconButton>
                    <IconButton>
                        <NightlightIcon />
                    </IconButton>
                </div>

            </header>
            <div className='search-bar'>
                <IconButton>
                    <SearchIcon />
                </IconButton>

                <input type="text" placeholder='Search' />
            </div>
            <div className='conversation'>
                {
                    conversations.map((conversation) => {
                        return <ConversationItems key={conversation.id} props={conversation} />
                    })

                }
            </div>
        </div>
    )
}

export default Sidebar
