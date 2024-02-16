import './WhatIsZesty.css'

export default function WhatIsZesty(){
    return (
        <section id='whatIsZestySection' className='sect2 flex alignCenter justifyCenter gap innerSpace wrap'>
            <div className='flex column gap'>
                <h2>O que é Zesty?</h2>
                <p>Zesty é uma ferramenta para gerenciamento de projetos e trabalho colaborativo.</p>
                <p>Organize seu projeto e coordene sua equipe em um único lugar!</p>
            </div>
            <img className='sect2Img' src="https://images.pexels.com/photos/7792761/pexels-photo-7792761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        </section>
    )
}