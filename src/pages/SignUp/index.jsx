import { useState } from "react"
import { api } from "../../services/api"

import { FiMail, FiLock, FiUser } from "react-icons/fi"

import { Container, Form, Background } from './styles'

import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { ButtonText } from "../../components/ButtonText"
import { useNavigate } from "react-router-dom"

export function SignUp() { 
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    function handleBack() {
        navigate(-1)
    }

    function handleSignUp() {
        if(!name || !email || !password) {
            return alert("Fill in all fields")
        }

        api.post('/users', { name, email, password })
        .then(() => {
            alert('User successfully registered')
            navigate(-1)
        })
        .catch(error => {
            if(error.response){
                alert(error.response.data.message)
            } else {
                alert('Unable to register')
            }
        })

    }

    return (
        <Container>
             <Background/>

            <Form>
                <h1>Rocket Notes</h1>
                <p>Application to save your notes and useful links</p>

                <h2>Create your account</h2>

                <Input
                    placeholder='Name'
                    type='text'
                    icon={FiUser}
                    onChange={e => setName(e.target.value)}
                />

                <Input
                    placeholder='Email'
                    type='text'
                    icon={FiMail}
                    onChange={e => setEmail(e.target.value)}
                />

                <Input
                    placeholder='Password'
                    type='password'
                    icon={FiLock}
                    onChange={e => setPassword(e.target.value)}
                />

                <Button title='Cadaster'onClick={handleSignUp}/>

                <ButtonText 
                    title="Already have an account? Sign In" onClick={handleBack}
                > 
                </ButtonText>
            </Form>
        </Container>
    )
}

