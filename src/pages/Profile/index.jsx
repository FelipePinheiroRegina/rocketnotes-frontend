import { useState } from "react";
import { useAuth } from "../../hooks/auth"

import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi"

import avatarPlaceholder from "../../assets/avatar_placeholder.svg"
import { api } from "../../services/api"

import { Container, Form, Avatar } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

export function Profile() {
    const { user, updateProfile } = useAuth()

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder

    const [ avatar,      setAvatar ]      = useState(avatarUrl)
    const [ avatarFile,  setAvatarFile ]  = useState(null)
    

    const [ name,        setName ]        = useState(user.name)
    const [ email,       setEmail ]       = useState(user.email)
    const [ oldPassword, setOldPassword ] = useState('')
    const [ newPassword, setNewPassword ] = useState('')
    
    const navigate = new useNavigate()

    function handleBack() {
        navigate(-1)
    }

    async function handleUpdate() {
        const updated = {
            name,
            email,
            oldPassword,
            newPassword
        }

        const UserUpdated = Object.assign(user, updated)

        await updateProfile({ user: UserUpdated, avatarFile })
        navigate(-1)
    }

    async function handleChangeAvatar(event) {
        const file = event.target.files[0]
        setAvatarFile(file)
        
        const imagePreview = URL.createObjectURL(file)
        setAvatar(imagePreview)
    }

    return (
        <Container>
            <header>
                <button 
                    type="button"
                    onClick={handleBack}
                >
                    <FiArrowLeft/>
                </button>
            </header>

            <Form>
                <Avatar>
                    <img src={avatar} 
                    alt="Photo User"
                    />

                    <label htmlFor="avatar">
                        <FiCamera/>

                        <input
                            id="avatar"
                            type="file"
                            onChange={handleChangeAvatar}
                        />
                    </label>
                </Avatar>
                <Input
                    placeholder="Name"
                    type='text'
                    icon={FiUser}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <Input
                    placeholder="Email"
                    type='text'
                    icon={FiMail}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <Input
                    placeholder='Old Password'
                    type='password'
                    icon={FiLock}
                    onChange={e => setOldPassword(e.target.value)}
                />

                <Input
                    placeholder='New Password'
                    type='password'
                    icon={FiLock}
                    onChange={e => setNewPassword(e.target.value)}
                />

                <Button title='Save' onClick={handleUpdate}/>
            </Form>
        </Container>
    )
}