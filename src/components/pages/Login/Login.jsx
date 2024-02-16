import logo from '../../../img/logo.png'
import { AuthContext } from '../../../contexts/auth.jsx'
import { useContext, useState } from 'react'
import { useRef } from 'react'
import { api } from '../../../services/api.js'
import { useNavigate } from 'react-router-dom'
import Loading from '../../Loading/Loading.jsx'
import { Link } from 'react-router-dom'
import './Login.css'

export default function Login(){

    const navigate = useNavigate()

    //States
    const [loader, setLoader] = useState(false)
    const [loginError, setLoginError] = useState('')

    //Contexts
    const { setToken, setUserData } = useContext(AuthContext)

    //Refs
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    //Other functions
    async function handleSubmit(e){
        setLoginError('')
        setLoader(true)
        e.preventDefault()
        try{
            const response = await api.post('/users/login', {
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            })
            const login = await api.get('/users/' + response.data.id, {
                headers: {
                    'Authorization': `Bearer ${response.data.token}`
                }
            })
            if (login.status == 200){
                setToken(`${response.data.token}`)
                setUserData(response.data.user)
                navigate('/zesty-frontend/user')
                setLoader(false)
            }
        } catch(err){
            console.log(err)
            if (err.response.status != 200){
                setLoginError('Usuário ou senha inválido(s)!')
            }
            setLoader(false)
        }
    }

    return (
        <main className='mainSignUp flex column alignCenter justifyCenter'>
            <img src={logo} alt="Zesty" style={{width: '200px', height: '200px'}} />
            <form className='signUpForm flex column alignCenter justifyCenter biggerGap'>
                <h2>Entrar no Zesty</h2>
                <div className='flex column relative'>
                    <input ref={emailRef} className='input' type="text" name="email" id="email" required />
                    <label className='label' htmlFor="email">Seu e-mail</label>
                </div>
                <div className='flex column relative'>
                    <input ref={passwordRef} className='input' type="password" name="password" id="password" required />
                    <label className='label' htmlFor="password">Sua senha</label>
                </div>
                <p style={!loginError ? {display: 'none'} : {color: 'red'}}>{!loginError ? null : loginError}</p>
                <input className='btn' type="submit" value="Entrar" onClick={handleSubmit} />
                <div>
                    <p className='dontHaveAccount'>Não possui uma conta? <Link to='/zesty-frontend/signup'>Faça seu cadastro!</Link></p>
                    <p className='dontHaveAccount'>Esqueceu a senha? <Link to='/zesty-frontend/signup'>Recuperar!</Link></p>
                </div>
                {loader ? <Loading /> : null}
            </form>
        </main>
    )
}