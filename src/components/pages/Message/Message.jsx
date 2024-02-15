import { AuthContext } from "../../../contexts/auth.jsx"
import { useContext, useState, useEffect, useRef } from "react"
import { api } from '../../../services/api.js'
import './Message.css'
import { useNavigate } from "react-router-dom"

export default function Message(){

    const navigate = useNavigate()

    //States
    const [allMessages, setAllMessages] = useState()

    //Contexts
    const { messageTo, userData } = useContext(AuthContext)

    //Refs
    const msgContentRef = useRef(null)

    //Effect functions
    async function getMessages(){
        const myMsg = await api.get('/messages/' + messageTo[0].id)
        const myMsgFilter = myMsg.data[0].messages.filter((m) => m.from[0].id == userData._id)

        const theirMsg = await api.get('/messages/' + userData._id)
        const theirMsgFilter = theirMsg.data[0].messages.filter((m) => m.from[0].id == messageTo[0].id)

        const allMsg = myMsgFilter.concat(theirMsgFilter)
        allMsg.sort(function(a,b) { 
            return a.when - b.when
        })
        setAllMessages(allMsg)
    }

    useEffect(() => {
        if (!userData.name){
            navigate('/zesty-frontend')
        } else {
            getMessages()
        }
    }, [])

    //Other functions
    async function sendMessage(e){
        e.preventDefault()
        const response = await api.patch('/users/' + messageTo[0].id, 
            {
                "from": [
                    {
                        "id": userData._id,
                        "name": userData.name
                    }
                ],
                "content": msgContentRef.current?.value,
                "project": messageTo[0].projectId,
                "when": Date.now()
            }
        )
        console.log(response)
        msgContentRef.current.value = ''
        getMessages()
    }

    if (!userData.name){
        return (
            <div>
                <p>Usuário não encontrado. <a href="" onClick={() => navigate('/zesty-frontend/login')}>Fazer login.</a></p>
            </div>
        )
    } else {
        return (
            <main className="flex column alignCenter">
                <h2 className="padding">Mensagens com {messageTo[0].name}</h2>
                <div className="messages">
                    {!allMessages ?
                    <div className="padding">Sem mensagens</div>
                    :
                    <div className="flex column gap">
                        {allMessages.map((m) => (
                            <div style={m.from[0].id == userData._id ? {backgroundColor: '#DECDF5'} : {backgroundColor: '#F8F1FF'}} className="msgDiv flex alignCenter justifyCenter gap">
                                <p>{m.content}</p>
                                <p className="msgFrom">({m.from[0].name})</p>
                            </div>
                        ))}
                    </div>
                    }
                </div>
                <div className="flex alignCenter column gap padding wrap">
                    <input ref={msgContentRef} className="msgInputBox input border" type="text" name="msg" id="msg" placeholder="Sua mensagem" />
                    <input className="msgSendBtn btn" type="submit" value="Enviar" onClick={sendMessage} />
                </div>
            </main>
        )
    }
}