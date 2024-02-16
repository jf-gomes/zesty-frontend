import { useEffect, useState } from "react";
import { MdOutlineAddTask } from "react-icons/md";
import AddTask from "../pages/AddTask/AddTask.jsx";
import './ProjectTasks.css'
import { api } from '../../services/api.js'
import Loading from "../Loading/Loading.jsx";
import { FaTrash } from "react-icons/fa";

export default function ProjectTasks({ project }){

    //States
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])
    const [loader, setLoader] = useState(false)

    //Effect functions
    async function getTasks(){
        setLoader(true)
        const response = await api.get('/projects/gettasks/' + project._id)
        setTasks(response.data[0].tasks)
        setLoader(false)
    }

    useEffect(() => {
        getTasks()
    }, [])

    //Other functions
    async function changeStatus(v, task){
        const deleteTask = await api.patch('/projects/deletetask/' + project._id, {
            taskName: task.taskName,
            assignedTo: task.assignedTo,
            status: task.status,
            description: task.description
        })
        console.log(deleteTask)
        const rebuildTask = await api.patch('/projects/addtask/' + project._id, {
            taskName: task.taskName,
            assignedTo: task.assignedTo,
            status: v,
            description: task.description
        })
        console.log(rebuildTask)
        getTasks()
    }

    async function deleteTask(task){
        if (window.confirm(`Confirma exclusão da tarefa ${task.taskName}?`)){
            const response = await api.patch('/projects/deletetask/' + project._id, {
                taskName: task.taskName,
                assignedTo: task.assignedTo,
                status: task.status,
                description: task.description
            })
            console.log(response)
            getTasks()
        } else {
            alert('Operação cancelada.')
        }
    }

    if (loader){
        return (<Loading />)
    } else {
        return (
            <>
            {!showAddTask ? null :
                <div className="addTaskDiv">
                    <AddTask getTasks={getTasks} setShowAddTask={setShowAddTask} project={project} />
                </div>
            }
            <main>
                <div className="flex alignCenter">
                    <h2 className="padding">Tarefas</h2>
                    <MdOutlineAddTask onClick={() => setShowAddTask(!showAddTask)} className="iconBtn" size={32} />
                </div>
                {tasks.length == 0 ? null :
                    <div className="tasksContainerDiv">
                        {tasks.map((task) => (
                            <div key={task.taskName} className="taskIndividualDiv">
                                <h3 className="taskTitle">{task.taskName}</h3>
                                {task.assignedTo == 'noAssignment' ?
                                    <p>Sem atribuição</p>
                                :
                                    <p>Atribuído a: {task.assignedTo}</p>
                                }
                                <div className="flex gap alignCenter">
                                    <label htmlFor="status">Status:</label>
                                    <select style={task.status == 'done' ? {backgroundColor: '#1B998B'} : null} className="select" value={task.status} onChange={(v) => changeStatus(v.target.value, task)} name="status" id="status">
                                        <option value="to do">Para fazer</option>
                                        <option value="doing">Fazendo</option>
                                        <option value="done">Feito</option>
                                    </select>
                                </div>
                                <p>Descrição: {task.description}</p>
                                <FaTrash onClick={() => deleteTask(task)} className="iconBtn" size={24} />
                            </div>
                        ))}
                    </div>
                }
            </main>
            </>
        )
    }
}