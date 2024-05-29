import { useState } from "react"
import { FiMail, FiLock } from "react-icons/fi"

import { Container, Form, Background } from './styles'

import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { Link } from "react-router-dom"

import { useAuth } from "../../hooks/auth"

export function SignIn() { 
    const [email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const { signIn } = useAuth()
    
    function handleSignIn() {
        signIn({email, password})
    }

    return (
        <Container>
            <Form>
                <h1>Rocket Notes</h1>
                <p>Application to save your notes and useful links</p>

                <h2>Sign In</h2>

                <Input
                    placeholder='Email'
                    type='text'
                    icon={FiMail}
                    onChange={event => setEmail(event.target.value)}
                />

                <Input
                    placeholder='Password'
                    type='password'
                    icon={FiLock}
                    onChange={event => setPassword(event.target.value)}
                />

                <Button title='Enter' onClick={handleSignIn}/>

                <Link to='/register'>
                    Don't have an account? Sign Up
                </Link>
            </Form>

            <Background/>
        </Container>
    )
}

