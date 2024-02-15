import logo from '../../../img/logo.png'
import './SignUp.css'
import { AuthContext } from '../../../contexts/auth.jsx'
import { useContext, useRef, useState } from 'react'
import { api } from '../../../services/api.js'
import Loading from '../../Loading/Loading.jsx'
import { useNavigate } from 'react-router-dom'

export default function SignUp(){

    const navigate = useNavigate()

    const { setToken, setUserData } = useContext(AuthContext)

    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const verifyPasswordRef = useRef(null)

    const [terms, setTerms] = useState(false)
    const [newsletter, setNewsletter] = useState(false)
    const [loader, setLoader] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        if (!nameRef.current.value || !emailRef.current.value || !passwordRef.current.value || !verifyPasswordRef.current.value){
            alert('Preencha todos os campos')
        } else if(passwordRef.current.value != verifyPasswordRef.current.value){
            alert('As senhas não conferem!')
        } else if(!terms) {
            alert('Por favor, concorde com os termos de uso.')
        } else {
            setLoader(true)
            const response = await api.post('/users', {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                terms: terms,
                newsletter: newsletter
            })
            if (response.status == 201){
                //Login
                const loginResponse = await api.post('/users/login', {
                    email: emailRef.current.value,
                    password: passwordRef.current.value
                })
                const login = await api.get('/users/' + loginResponse.data.id, {
                    headers: {
                        'Authorization': `Bearer ${loginResponse.data.token}`
                    }
                })
                if (login.status == 200){
                    setToken(`${loginResponse.data.token}`)
                    setUserData(loginResponse.data.user)
                    navigate('/user')
                    setLoader(false)
                } else {
                    setLoader(false)
                    alert('Erro inesperado, tente novamente.')
                }
            } else {
                setLoader(false)
                alert('Erro inesperado, tente novamente.')
            }
        }
    }

    return (
        <main className='mainSignUp flex column alignCenter justifyCenter'>
            <img src={logo} alt="Zesty" style={{width: '200px', height: '200px'}} />
            <form className='signUpForm flex column alignCenter justifyCenter biggerGap'>
                <h2>Crie sua conta para começar!</h2>
                <div className='flex column relative'>
                    <input ref={nameRef} className='input' type="text" name="name" id="name" required />
                    <label className='label' htmlFor="name">Seu nome</label>
                </div>
                <div className='flex column relative'>
                    <input ref={emailRef} className='input' type="text" name="email" id="email" required />
                    <label className='label' htmlFor="email">Seu e-mail</label>
                </div>
                <div className='flex column relative'>
                    <input ref={passwordRef} className='input' type="password" name="password1" id="password1" required />
                    <label className='label' htmlFor="password1">Crie uma senha</label>
                </div>
                <div className='flex column relative'>
                    <input ref={verifyPasswordRef} className='input' type="password" name="password2" id="password2" required />
                    <label className='label' htmlFor="password2">Confirme a sua senha</label>
                </div>
                <div>
                    <div className='flex alignCenter gap'>
                        <input value={terms} onChange={(v) => setTerms(v.target.checked)} type="checkbox" name="terms" id="terms" />
                        <label htmlFor="terms">Concordo com os <a style={{color: 'black', fontWeight: 'bold', textDecoration: 'none'}} href="#">Termos de Uso</a>.</label>
                    </div>
                    <div className='flex alignCenter gap'>
                        <input value={newsletter} onChange={(v) => setNewsletter(v.target.checked)} type="checkbox" name="newslatter" id="newslatter" />
                        <label htmlFor="newslatter">Desejo receber atualizações sobre a <span style={{color: '#1B998B', fontWeight: 'bold'}}>Zesty</span> pelo e-mail.</label>
                    </div>
                </div>
                <input onClick={handleSubmit} className='btn' type="submit" value="Cadastrar" />
                {loader ? <Loading /> : null}
            </form>
        </main>
    )
}