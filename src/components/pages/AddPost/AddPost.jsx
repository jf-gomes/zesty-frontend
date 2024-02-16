import { useRef, useState, useContext } from "react"
import Loading from "../../Loading/Loading.jsx"
import { api } from '../../../services/api.js'
import { AuthContext } from '../../../contexts/auth.jsx'
import CloseBtn from '../../CloseBtn/CloseBtn.jsx'

export default function AddPost({ project, setShowPosts, getPosts }){

    //States
    const [loader, setLoader] = useState(false)

    //Contexts
    const { userData } = useContext(AuthContext)

    //Regs
    const postContentRef = useRef(null)

    //Other functions
    async function handleSubmit(e){
        setLoader(true)
        e.preventDefault()
        const response = await api.patch('/projects/addpost/' + project._id, {
            content: postContentRef.current.value,
            userName: userData.name,
            userId: userData._id,
            comments: []
        })
        console.log(response)
        setShowPosts(false)
        getPosts()
        setLoader(false)
    }
    
    return (
        <form style={{backdropFilter: 'blur(10px)'}} className='signUpForm flex column alignCenter justifyCenter biggerGap'>
            <CloseBtn close={setShowPosts} />
            <h2>Criar uma nova publicação</h2>
            <div className='flex column relative'>
                <input ref={postContentRef} className='input' type="text" name="postContent" id="postContent" placeholder="Digite aqui sua publicação" required />
            </div>
            <input onClick={handleSubmit} className='btn' type="submit" value="Criar" />
            {loader ? <Loading /> : null}
        </form>
    )
}