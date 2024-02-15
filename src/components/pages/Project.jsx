import { AuthContext } from '../../contexts/auth.jsx'
import { useContext, useState, useEffect } from 'react'
import ProjectHeader from '../ProjectHeader/ProjectHeader.jsx'
import ProjectSection from '../ProjectSection/ProjectSection.jsx'
import logoGrey from '../../img/logo_grey.png'
import { useNavigate } from 'react-router-dom'

export default function Project(){

    const navigate = useNavigate()

    //States
    const [activeSection, setActiveSection] = useState()

    //Contexts
    const { project, userData } = useContext(AuthContext)

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
        if (!activeSection){
            return (
                <div>
                    <ProjectHeader project={project} activeSection={activeSection} setActiveSection={setActiveSection} />
                    <div className='flex justifyCenter alignCenter' style={{width: '100vw', height: '90vh'}}>
                        <img style={{width: '400px', height: '400px'}} src={logoGrey} alt="Zesty" />
                    </div>
                </div>
            )
        } else {
            return (
                <>
                    <ProjectHeader project={project} activeSection={activeSection} setActiveSection={setActiveSection} />
                    <ProjectSection project={project} activeSection={activeSection} />
                </>
            )
        }
    }
}