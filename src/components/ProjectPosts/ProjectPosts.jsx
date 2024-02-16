import { IoIosCreate } from "react-icons/io";
import AddPost from "../pages/AddPost/AddPost.jsx";
import { useEffect, useState } from "react";
import { api } from '../../services/api.js'
import './ProjectPosts.css'
import Loading from "../Loading/Loading.jsx";
import { FaTrash } from "react-icons/fa";

export default function ProjectPosts({ project }){

    //States
    const [showPosts, setShowPosts] = useState(false)
    const [loader, setLoader] = useState(false)
    const [posts, setPosts] = useState([])

    //Effect functions
    async function getPosts(){
        setLoader(true)
        const response = await api.get('/projects/getposts/' + project._id)
        setPosts(response.data[0].posts)
        setLoader(false)
    }

    useEffect(() => {
        getPosts()
    }, [])

    //Other functions
    async function delPost(post){
        if (window.confirm('Confirma exclusão?')){
            const response = await api.patch('/projects/removepost/' + project._id, {
                content: post.content,
                userName: post.userName,
                userId: post.userId
            })
            console.log(response)
            getPosts()
        } else{
            alert('Operação cancelada.')
        }
    }

    if (loader){
        return (<Loading />)
    } else {
        return (
            <>
            {!showPosts ? null :
                <div className="addTaskDiv">
                    <AddPost setShowPosts={setShowPosts} getPosts={getPosts} project={project} />
                </div>
            }
            <main>
                <div className="flex alignCenter">
                    <h2 className="padding">Publicações</h2>
                    <IoIosCreate onClick={() => setShowPosts(!showPosts)} className="iconBtn" size={32} />
                </div>
                <div className="postsContainerDiv flex column gap">
                    {posts.length == 0 ? null :
                        posts.map((post) => (
                            <div className="postIndividualDiv flex column gap">
                                <p style={{textAlign: "justify"}}>{post.content}</p>
                                <p style={{fontWeight: 'bold'}}>Autor: {post.userName}</p>
                                <FaTrash onClick={() => delPost(post)} className="iconBtn" />
                            </div>
                        ))
                    }
                </div>
            </main>
            </>
        )
    }
}