import { FaMessage } from "react-icons/fa6";
import './ProjectTeam.css'
import { AuthContext } from "../../contexts/auth.jsx"
import { useContext, useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa6";
import { api } from '../../services/api.js'
import { FcInvite } from "react-icons/fc";
import { FaUserXmark } from "react-icons/fa6";
import Loading from "../Loading/Loading.jsx";

export default function ProjectTeam({ project }){

    const navigate = useNavigate()

    //States
    const [loader, setLoader] = useState(false)
    const [team, setTeam] = useState([])
    const [addTeamMemberInput, setAddTeamMemberInput] = useState(false)

    //Contexts
    const { userData, setMessageTo } = useContext(AuthContext)

    //Refs
    const inviteName = useRef(null)

    //Effect functions
    async function getTeam(){
        setLoader(true)
        const response = await api.get('/projects/getone/' + project._id)
        const projectResponse = response.data.project[0]
        const team = projectResponse.team.filter((member) => member.id != userData._id)
        if (projectResponse.createdBy[0].id != userData._id){
            team.push(projectResponse.createdBy[0])
        }
        setTeam(team)
        setLoader(false)
    }

    useEffect(() => {
        getTeam()
    }, [])

    //Other functions
    async function sendInvite(){
        if (!inviteName.current?.value){
            alert('Usuário não encontrado.')
        } else {
            const userId = await api.get('/getid/' + inviteName.current.value)
            if (!userId.data[0]){
                alert('Usuário não encontrado.')
            } else {
                const idTo = userId.data[0]._id
                const response = await api.patch('/users/invites/' + idTo, {
                    "inviteFrom": userData.name,
                    "inviteTo": inviteName.current?.value,
                    "projectName": project.name,
                    "projectId" :project._id,
                    "accepted": false
                })
                console.log(response)
                inviteName.current.value = ''
                alert('Convite enviado!')
            }
        }
    }

    async function removeMember(member){
        if (window.confirm(`Confirma a exclusão do membro ${member.name} da equipe?`)){
            const response = await api.patch('/projects/removemember/' + project._id, {
                name: member.name,
                id: member.id,
                role: member.role
            })
            console.log(response)
            getTeam()
        } else {
            alert('Operação cancelada!')
        }
    }

    if (loader){
        return (<Loading />)
    } else {
        return (
            <main className="projectFinancesMain">
                <div className="flex column">
                    <div className="flex alignCenter">
                        <h2 className="padding">Sua equipe</h2>
                        <FaUserPlus className="addTeamMemberBtn" size={24} onClick={() => setAddTeamMemberInput(!addTeamMemberInput)} />
                    </div>
                    <div style={addTeamMemberInput ? null : {display: 'none'}} className="flex gap addTeamMemberInputDiv">
                        <input ref={inviteName} className="addTeamMemberName" type="text" name="addTeamMemberName" id="addTeamMember" placeholder="Nome de usuário para convidar" />
                        <FcInvite className="fancyIconBtn" size={32} onClick={sendInvite} />
                    </div>
                </div>
                <div>
                    {team.length == 0 ? null :
                    team.map((member) => (
                        <div key={member.name} className="projectTeamMembersDiv flex gap alignCenter">
                            <p>{member.name}</p>
                            <FaMessage size={24} className="iconBtn" onClick={() => {
                                setMessageTo([
                                    {
                                        id: member.id,
                                        name: member.name
                                    }
                                ])
                                navigate('/zesty-frontend/message')
                            }} />
                            <FaUserXmark onClick={() => removeMember(member)} className="iconBtn" size={24} />
                        </div>
                    ))
                    }
                </div>
            </main>
        )
    }
}