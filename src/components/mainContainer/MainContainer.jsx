import Sidebar from '../sidebar/Sidebar'
import Workarea from '../workarea/Workarea'

import './mainContainer.css'

const MainContainer = () => {
    return (
        <div className='main-container' >
            <Sidebar />
            <Workarea />
        </div>
    )
}

export default MainContainer
