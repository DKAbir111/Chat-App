import './usergroup.css'
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import icon from '../../../resources/verified-user.png'

const UserGroup = () => {
    return (
        <div className='list-container' >
            <header className='header-users'>
                <img src={icon} alt="" />
                <p className='header-title'>Online Users</p>
            </header>
            <div className='search-bar'>
                <IconButton>
                    <SearchIcon />
                </IconButton>

                <input type="text" placeholder='Search' />
            </div>
            <div className='user-list'>
                <div className='user-container'>
                    <p className="icon-user">T</p>
                    <div>
                        <p className="con-title">Test User</p>
                        <p className="con-lastMessage">Hello! This is Darun Karas Abir.
                        </p>
                    </div>


                </div>
                <div className='user-container'>
                    <p className="icon-user">T</p>
                    <div>
                        <p className="con-title">Test User</p>
                        <p className="con-lastMessage">Hello! This is Darun Karas Abir.
                        </p>
                    </div>


                </div>
                <div className='user-container'>
                    <p className="icon-user">T</p>
                    <div>
                        <p className="con-title">Test User</p>
                        <p className="con-lastMessage">Hello! This is Darun Karas Abir.
                        </p>
                    </div>


                </div>
                <div className='user-container'>
                    <p className="icon-user">T</p>
                    <div>
                        <p className="con-title">Test User</p>
                        <p className="con-lastMessage">Hello! This is Darun Karas Abir.
                        </p>
                    </div>


                </div>
                <div className='user-container'>
                    <p className="icon-user">T</p>
                    <div>
                        <p className="con-title">Test User</p>
                        <p className="con-lastMessage">Hello! This is Darun Karas Abir.
                        </p>
                    </div>


                </div>
                <div className='user-container'>
                    <p className="icon-user">T</p>
                    <div>
                        <p className="con-title">Test User</p>
                        <p className="con-lastMessage">Hello! This is Darun Karas Abir.
                        </p>
                    </div>


                </div>
                <div className='user-container'>
                    <p className="icon-user">T</p>
                    <div>
                        <p className="con-title">Test User</p>
                        <p className="con-lastMessage">Hello! This is Darun Karas Abir.
                        </p>
                    </div>


                </div>
                <div className='user-container'>
                    <p className="icon-user">T</p>
                    <div>
                        <p className="con-title">Test User</p>
                        <p className="con-lastMessage">Hello! This is Darun Karas Abir.
                        </p>
                    </div>


                </div>
                <div className='user-container'>
                    <p className="icon-user">T</p>
                    <div>
                        <p className="con-title">Test User</p>
                        <p className="con-lastMessage">Hello! This is Darun Karas Abir.
                        </p>
                    </div>


                </div>

            </div>

        </div>
    )
}

export default UserGroup
