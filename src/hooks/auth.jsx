import { createContext, useContext, useState, useEffect } from "react";

import { api } from "../services/api"

export const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [ data, setData ] = useState({})

    async function signIn({email, password}) {
        try {
            const response = await api.post('/sessions', {email, password})
            const { user, token } = response.data

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            setData({user, token})

            localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
            localStorage.setItem("@rocketnotes:token", token)

        } catch (error) { 
            if(error.response) {
                alert(error.response.data.message)
            } else {
                alert ('Unable to enter')
            }  
        } 
    }

    async function updateProfile({user, avatarFile}) {
        try {
            if(avatarFile) {
                const fileUploadForm = new FormData()

                fileUploadForm.append("avatar", avatarFile)

                const response = await api.patch('/users/avatar', fileUploadForm)
                user.avatar = response.data.avatar
            }

           await api.put('/users', user)
           localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
            
           setData({user, token: data.token})
           alert('updated profile') 
        } catch (error) { 
            if(error.response) {
                alert(error.response.data.message)
            } else {
                alert ('Unable update the profile')
            }  
        } 
    }

    function logOut() {
        localStorage.removeItem("@rocketnotes:user")
        localStorage.removeItem("@rocketnotes:token")

        setData({})
    }

    useEffect(() => {
        const user = localStorage.getItem("@rocketnotes:user")
        const token = localStorage.getItem("@rocketnotes:token")
    
        if(user && token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            setData({
                token,
                user: JSON.parse(user)
            })
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            signIn,
            logOut,
            updateProfile, 
            user: data.user
        }

        }>
            {children}
        </AuthContext.Provider> 
    )
}

function useAuth() {
    const context = useContext(AuthContext)
    
    return context
}

export { AuthProvider, useAuth }