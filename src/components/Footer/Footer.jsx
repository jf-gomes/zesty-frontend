import './Footer.css'
import logoTextWhite from '../../img/logo_text_white.png'
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Footer(){
    return (
        <footer className='flex column justifyCenter alignCenter gap'>
            <img src={logoTextWhite} alt="" />
            <div className='flex column justifyCenter alignCenter gap'>
                <div>
                    <ul>
                        <li>
                            <a href="#">Política de privacidade</a>
                        </li>
                        <li>
                            <a href="#">Termos de uso</a>
                        </li>
                    </ul>
                </div>
                <hr style={{width: '100%'}} />
                <div className='footerIconsDiv'>
                    <FaInstagram color='white' size={24} className='iconBtn' />
                    <FaFacebook color='white' size={24} className='iconBtn' />
                    <FaLinkedin color='white' size={24} className='iconBtn' />
                </div>
            </div>
            <p className='copyright'>Copyright © 2024 Zesty</p>
        </footer>
    )
}