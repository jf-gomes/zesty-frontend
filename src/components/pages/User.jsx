import UserHeader from "../UserHeader/UserHeader.jsx"
import UserProjects from "../UserProjects/UserProjects.jsx"
import { AuthContext } from '../../contexts/auth.jsx'
import { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

export default function User(){
    
    const navigate = useNavigate()

    //Contexts
    const { userData, setProject } = useContext(AuthContext)

    useEffect(() => {
        if (!userData.name){
            navigate('/')
        }
    }, [])

    if (!userData.name){
        return (
            <div>
                <p>Usuário não encontrado. <a href="" onClick={() => navigate('/login')}>Fazer login.</a></p>
            </div>
        )
    } else {
        return (
            <>
                <UserHeader userData={userData} />
                <UserProjects userData={userData} setProject={setProject} />
            </>
        )
    }
}