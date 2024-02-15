import './UserHeader.css'
import { CgLogOff } from "react-icons/cg";
import icon from '../../img/icon.png'
import { useNavigate } from 'react-router-dom';

export default function UserHeader({ userData }){

    const navigate = useNavigate()

    return (
        <header className='userHeader flex alignCenter spaceBetween'>
            <div className='flex alignCenter'>
                <img src={icon} alt="" style={{width: '80px', height: '80px'}} />
                <p style={{color: 'white'}}>Bem vindo(a), {userData.name.toUpperCase()}!</p>
            </div>
            <CgLogOff onClick={() => navigate('/')} size={32} className='iconBtn' />
        </header>
    )
}