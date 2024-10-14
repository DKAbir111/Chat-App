import './chatarea.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MessageOthers from './MessageOthers';
import MessageSelf from './MessageSelf';

const Chatarea = ({ props }) => {
    return (
        <div className='chatarea-container'>
            <div className="header-container">
                <div className='user-info'>
                    <p className="message-icon">{props.name[0]}</p>
                    <div className='user'>
                        <p className="message-title">{props.name}</p>
                        <p className="message-lastMessage">Active</p>
                    </div>
                </div>
                <IconButton>
                    < DeleteIcon />
                </IconButton>

            </div>
            <div className='message-container'>
                <MessageOthers />
                <MessageSelf />
                <MessageOthers />
                <MessageSelf />
                <MessageOthers />
                <MessageSelf />
                <MessageOthers />
                <MessageSelf />
                <MessageOthers />
                <MessageSelf />
                <MessageOthers />
                <MessageSelf />
            </div>

            <div className='text-input'>
                <input type="text" placeholder='Message' />
                <IconButton>
                    <SendIcon />
                </IconButton>

            </div>
        </div>
    )
}

export default Chatarea

