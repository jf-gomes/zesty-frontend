import './UserProjects.css'
import { api } from '../../services/api.js'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading.jsx'
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { MdConstruction } from "react-icons/md";
import { FaRegSquarePlus } from "react-icons/fa6";

export default function UserProjects({ userData, setProject }){

    const navigate = useNavigate()

    //States
    const [myProjects, setMyProjects] = useState([])
    const [otherProjects, setOtherProjects] = useState([])
    const [invites, setInvites] = useState([])
    const [loader, setLoader] = useState(false)

    //Effect functions
    async function getProjects(){
        setLoader(true)
        const projects = await api.get('/projects/' + userData._id)
        setMyProjects(projects.data.myProjects)
        setOtherProjects(projects.data.otherProjects)
        setLoader(false)
    }

    async function getInvites(){
        const response = await api.get('/getinvites/' + userData._id)
        setInvites(response.data[0].invites)
    }

    useEffect(() => {
        getProjects()
        getInvites()
    }, [])

    //Other functions
    async function removeInvite(invite, ask){
        if (ask){
            if (window.confirm('Confirma a exclusão do convite?')){
                const removeInvite = await api.patch('/users/removeinvite/' + userData._id, {
                    "inviteFrom": invite.inviteFrom,
                    "inviteTo": invite.inviteTo,
                    "projectName": invite.projectName,
                    "projectId": invite.projectId,
                    "accepted": false
                })
                console.log(removeInvite)
                getProjects()
                getInvites()
            } else {
                alert('Operação cancelada.')
            }
        } else {
            const removeInvite = await api.patch('/users/removeinvite/' + userData._id, {
                "inviteFrom": invite.inviteFrom,
                "inviteTo": invite.inviteTo,
                "projectName": invite.projectName,
                "projectId": invite.projectId,
                "accepted": false
            })
            console.log(removeInvite)
            getProjects()
            getInvites()
        }
    }

    async function acceptInvite(invite){
        const response = await api.patch('/projects/' + invite.projectId, {
            "name": userData.name,
            "id": userData._id,
            "role": "member"
        })
        console.log(response)
        removeInvite(invite, false)
        getProjects()
        getInvites()
    }

    async function finishProject(project){
        const response = await api.patch('/projects/finish/' + project._id)
        console.log(response)
        getProjects()
        getInvites()
    }

    async function deleteProject(project){
        if (window.confirm(`Confirma a exclusão do projeto: ${project.name}?`)){
            const response = await api.delete('/projects/' + project._id)
            console.log(response)
            getProjects()
            getInvites()
        } else {
            alert('Operação cancelada!')
        }
    }

    if (loader){
        return (<Loading />)
    } else {
        return(
            <main className='userProjectsMain'>
                <div>
                    <div className='flex alignCenter'>
                        <h2 className='userProjectsH2'>Projetos criados por você</h2>
                        <FaRegSquarePlus onClick={() => navigate('/zesty-frontend/newproject')} className='iconBtn' size={32} />
                    </div>
                    {myProjects.length == 0 ? null :
                        <div>
                            {myProjects.map((project) => (
                                <div key={project._id} id={project._id} className='myProjectsIndividualDiv'>
                                    <h3 style={{color: '#1B998B'}} className='projectTitle' onClick={() => {
                                        setProject(project)
                                        navigate('/zesty-frontend/project')
                                    }}>{project.name}</h3>
                                    <div className='flex gap alignCenter spaceBetween wrap'>
                                        <div>
                                            <p>Data de início: {project.initialDate.slice(0, 10)}</p>
                                            <p>Data de término: {project.endDate.slice(0, 10)}</p>
                                            {project.finished == false ?
                                            <div className='flex alignCenter'>
                                                <p>Status: em andamento</p>
                                                <MdConstruction size={24} />
                                            </div>
                                            :
                                                <div className='flex alignCenter'>
                                                    <p>Status: concluído</p>
                                                    <CiCircleCheck size={24} />
                                                </div>
                                            }
                                        </div>
                                        <div className='flex gap justifyCenter alignCenter'>
                                            <FaTrash onClick={() => deleteProject(project)} className='iconBtn' size={32} />
                                            <FaCheck onClick={() => finishProject(project)} className='iconBtn' size={32} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }

                    <h2 className='userProjectsH2'>Projetos criados por seus colegas</h2>
                    {otherProjects.length == 0 ? null :
                        <div>
                            {otherProjects.map((project) => (
                                <div className='myProjectsIndividualDiv'>
                                    <h3 style={{color: '#1B998B'}} className='projectTitle' onClick={() => {
                                        setProject(project)
                                        navigate('/zesty-frontend/project')
                                    }}>{project.name}</h3>
                                    <div className='flex gap alignCenter spaceBetween wrap'>
                                        <div>
                                            <p>Data de início: {project.initialDate.slice(0, 10)}</p>
                                            <p>Data de término: {project.endDate.slice(0, 10)}</p>
                                            {project.finished == false ?
                                            <div className='flex alignCenter'>
                                                <p>Status: em andamento</p>
                                                <MdConstruction size={24} />
                                            </div>
                                            :
                                            <div className='flex alignCenter'>
                                                <p>Status: concluído</p>
                                                <CiCircleCheck size={24} />
                                            </div>
                                            }
                                        </div>
                                        <div>
                                            <div className='flex gap justifyCenter alignCenter'>
                                                <FaTrash onClick={() => deleteProject(project)} className='iconBtn' size={32} />
                                                <FaCheck onClick={() => finishProject(project)} className='iconBtn' size={32} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }

                    <h2 className='userProjectsH2'>Convites</h2>
                    {invites.length == 0 ? null :
                        <div>
                            <div className='invitesContainerDiv'>
                                {invites.map((invite) => (
                                    <div className='flex gap spaceBetween'>
                                        <div>
                                            <p style={{color: '#1B998B'}}>Projeto: {invite.projectName}</p>
                                            <p>Convite enviado por: {invite.inviteFrom}</p>
                                        </div>
                                        <div className='flex gap'>
                                            <FaTrash className='iconBtn' onClick={() => removeInvite(invite, true)} size={32} />
                                            <FaCheck className='iconBtn' onClick={() => acceptInvite(invite)} size={32} />   
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </main>
        )
    }
}