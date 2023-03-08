import {  useNavigate } from 'react-router-dom'
const NaviBar = () => {
    const navigate = useNavigate()

    const navigateToJoin = () => {
        navigate('/')
    }
    
    return (
            <div>    
                <ul className='header'>
                    <li><a href="/">Home</a></li>
                    
                </ul>
            </div>
    )
}
export default NaviBar