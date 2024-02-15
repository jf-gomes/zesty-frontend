import teamIcon from '../../img/teamIcon.png'
import projectIcon from '../../img/projectIcon.png'
import organizationIcon from '../../img/organizationIcon.png'
import './Qualities.css'

export default function Qualities(){

    const qualitiesData = [
        {
            id: '0',
            title: 'Trabalho em equipe',
            img: teamIcon
        },
        {
            id: '1',
            title: 'Gestão de projetos',
            img: projectIcon
        },
        {
            id: '2',
            title: 'Organização',
            img: organizationIcon
        }
    ]

    return (
        <div className='innerSpace flex column alignCenter justifyCenter spaceAround gap'>
            <div className='flex column gap'>
                {qualitiesData.map((quality) => (
                    <div key={quality.id} className='qualitiesIndividualDiv flex justifyCenter alignCenter gap'>
                        <img src={quality.img} alt={quality.title} />
                        <h3>{quality.title}</h3>
                    </div>
                ))}
            </div>
            <div className='qualitiesRightDiv flex column gap'>
                <p>Com Zesty você reúne sua equipe, organiza seu projeto, controla suas tarefas e muito mais!</p>
                <button className='qualitiesBtn'>Começar agora!</button>
            </div>
        </div>
    )
}