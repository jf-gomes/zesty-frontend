import loading from '../../img/loading.svg'

export default function Loading(){
    return (
        <div className='flex justifyCenter'>
            <img style={{width: '70px', height: '70px'}} src={loading} alt="Loading..." />
        </div>
    )
}