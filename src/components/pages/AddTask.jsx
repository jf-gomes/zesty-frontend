import { useEffect, useRef, useState, useContext } from 'react'
import Loading from '../Loading/Loading.jsx'
import { api } from '../../services/api.js'
import CloseBtn from '../CloseBtn/CloseBtn.jsx'
import { AuthContext } from '../../contexts/auth.jsx'
import { useNavigate } from 'react-router-dom'

export default function AddTask({ project, setShowAddTask, getTasks }){

    const navigate = useNavigate()

    //States
    const [loader, setLoader] = useState(false)
    const [allMembers, setAllMembers] = useState([])
    const [assignedTo, setAssignedTo] = useState('noAssignment')

    //Contexts
    const { userData } = useContext(AuthContext)

    //Refs
    const taskNameRef = useRef(null)
    const taskDescriptionRef = useRef(null)

    useEffect(() => {
        if (!userData.name){
            navigate('/')
        } else {
            setAllMembers(project.createdBy.concat(project.team))
        }
    }, [])

    //Other functions
    async function handleSubmit(e){
        setLoader(true)
        e.preventDefault()
        const response = await api.patch('/projects/addtask/' + project._id, {
            taskName: taskNameRef.current.value,
            assignedTo: assignedTo,
            status: "to do",
            description: taskDescriptionRef.current.value
        })
        console.log(response)
        setLoader(false)
        setShowAddTask(false)
        getTasks()
    }

    if (!userData.name){
        return (
            <div>
                <p>Usuário não encontrado. <a href="" onClick={() => navigate('/login')}>Fazer login.</a></p>
            </div>
        )
    } else {
        return (
            <form style={{backdropFilter: 'blur(10px)'}} className='signUpForm flex column alignCenter justifyCenter biggerGap'>
                <CloseBtn close={setShowAddTask} />
                <h2>Criar uma nova tarefa</h2>
                <div className='flex column relative'>
                    <input ref={taskNameRef} className='input' type="text" name="taskName" id="taskName" required />
                    <label className='label' htmlFor="taskName">Nome da tarefa</label>
                </div>
                <div className='flex column relative'>
                    <input ref={taskDescriptionRef} className='input' type="text" name="taskDescription" id="taskDescription" required />
                    <label className='label' htmlFor="taskDescription">Descrição da tarefa</label>
                </div>
                <div className='flex column relative'>
                    <select className='select' id='assignmentSelect' onChange={(v) => setAssignedTo(v.target.value)}>
                        {allMembers.map((member) => (
                            <option value={member.name}>{member.name}</option>
                        ))}
                        <option value="noAssignment" selected>Sem atribuição</option>
                    </select>
                    <label className='dateLabel' htmlFor="assignmentSelect">Atribuido a</label>
                </div>
                <input onClick={handleSubmit} className='btn' type="submit" value="Criar" />
                {loader ? <Loading /> : null}
            </form>
        )
    }
}