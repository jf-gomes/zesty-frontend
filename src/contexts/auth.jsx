import React, { createContext, useState } from 'react'

export const AuthContext = createContext({})

export default function AuthProvider({ children }){
    const [token, setToken] = useState('')
    const [userData, setUserData] = useState([])
    const [project, setProject] = useState([])
    const [messageTo, setMessageTo] = useState([])
    return (
        <AuthContext.Provider value={{token, setToken, userData, setUserData, project, setProject, messageTo, setMessageTo}}>
            { children }
        </AuthContext.Provider>
    )
}