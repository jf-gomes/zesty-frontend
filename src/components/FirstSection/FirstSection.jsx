import icon from '../../img/icon.png'
import './FirstSection.css'
import gsap from 'gsap'
import { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function FirstSection(){

    const navigate = useNavigate()

    useLayoutEffect(() => {
        gsap.to('.icon', {
            rotate: '0deg',
            x: 0,
        })
        gsap.to('.sect1', {
            opacity: 1
        })
    }, [])

    return (
        <section className='sect1 flex alignCenter justifyCenter'>
            <img className='icon' src={icon} alt="Zesty" />
            <div className='flex column alignCenter gap'>
                <div className='flex column alignCenter'>
                    <h1 className='mainTitle'>Zesty</h1>
                    <h2 className='slogan'>Onde os projetos florescem</h2>
                </div>
                <div className='flex gap'>
                    <button className='btn' onClick={() => navigate('/zesty-frontend/signup')}>Crie sua conta</button>
                    <button className='btn' onClick={() => navigate('/zesty-frontend/login')}>Entrar</button>
                </div>
            </div>
        </section>
    )
}