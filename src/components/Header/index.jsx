import { RiShutDownLine } from 'react-icons/ri'
import { Container, Profile, Logout } from './styles'
import { useAuth } from '../../hooks/auth'
import { api } from "../../services/api"
import avatarPlaceholder from "../../assets/avatar_placeholder.svg"
import { useNavigate } from "react-router-dom"

export function Header(){
    const { logOut, user } = useAuth()
    const navigate = new useNavigate()

    function handleLogOut() {
        navigate('/')
        logOut()
    }
    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder
    return (
    <Container>
        <Profile to='/profile'>
            <img src={avatarUrl} alt={user.name} />

            <div>
                <span>Welcome</span>
                <strong>{user.name}</strong>
            </div>
        </Profile>

        <Logout>
            <RiShutDownLine onClick={handleLogOut}/>
        </Logout>
    </Container>
    ) 
}