import './creategroup.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IconButton } from '@mui/material';
const Creategroup = () => {
    return (
        <div className='createGroup-container'>

            <input type="text" placeholder='Enter Group Name' />
            <IconButton>
                <CheckCircleIcon className='group-icon' />
            </IconButton>

        </div>
    )
}
import './creategroup.css'
export default Creategroup
