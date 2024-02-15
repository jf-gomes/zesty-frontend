import UserHeader from "../../UserHeader/UserHeader.jsx"
import { AuthContext } from '../../../contexts/auth.jsx'
import { useContext, useEffect, useRef, useState } from 'react'
import './NewProject.css'
import { api } from '../../../services/api.js'
import { useNavigate } from "react-router-dom"
import Loading from '../../Loading/Loading.jsx'
import CloseBtn from "../../CloseBtn/CloseBtn.jsx"

export default function NewProject(){

    const navigate = useNavigate()

    //States
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState('')

    //Contexts
    const { userData } = useContext(AuthContext)

    //Refs
    const projectNameRef = useRef(null)
    const initialDateRef = useRef(null)
    const endDateRef = useRef(null)

    //Other functions
    async function handleSubmit(e){
        setError('')
        setLoader(true)
        e.preventDefault()
        console.log(endDateRef.current.value)
        if (!endDateRef.current?.value || !initialDateRef.current?.value || !projectNameRef.current?.value){
            setError('Preencha todos os campos!')
            setLoader(false)
        } else {
            const response = await api.post('/projects', {
                "name": projectNameRef.current?.value,
                "createdBy": {
                    "id": userData._id,
                    "name": userData.name
                },
                "initialDate": initialDateRef.current?.value,
                "endDate": endDateRef.current?.value
            })
            console.log(response)
            projectNameRef.current.value = ''
            initialDateRef.current.value = ''
            endDateRef.current.value = ''
            navigate('/zesty-frontend/user')
            setLoader(false)
        }
    }

    useEffect(() => {
        if (!userData.name){
            navigate('/zesty-frontend')
        }
    }, [])

    if (!userData.name){
        return (
            <div>
                <p>Usuário não encontrado. <a href="" onClick={() => navigate('/zesty-frontend/login')}>Fazer login.</a></p>
            </div>
        )
    } else {
        return (
            <>
                <UserHeader userData={userData} />
                <main className="mainSignUp">
                    <form className='signUpForm flex column alignCenter justifyCenter biggerGap'>
                        <h2>Criar um novo projeto</h2>
                        <div className='flex column relative'>
                            <input ref={projectNameRef} className='input' type="text" name="projectName" id="projectName" required />
                            <label className='label' htmlFor="projectName">Nome do projeto</label>
                        </div>
                        <div className='flex column relative'>
                            <input ref={initialDateRef} className='input' type="date" name="initialDate" id="initialDate" required />
                            <label className='dateLabel' htmlFor="initialDate">Data de início</label>
                        </div>
                        <div className='flex column relative'>
                            <input ref={endDateRef} className='input' type="date" name="endDate" id="endDate" required />
                            <label className='dateLabel' htmlFor="endDate">Data de término</label>
                        </div>
                        <p style={!error ? {display: 'none'} : {color: 'red'}}>{!error ? null : error}</p>
                        <input onClick={handleSubmit} className='btn' type="submit" value="Criar" />
                        {loader ? <Loading /> : null}
                    </form>
                </main>
            </>
        )
    }
}