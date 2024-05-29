import { Container, Form } from "./styles"
import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { TextArea } from "../../components/TextArea"
import { NoteItem } from "../../components/NoteItem"
import { Section } from "../../components/Section"
import { Button } from "../../components/Button"
import { ButtonText } from "../../components/ButtonText"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../services/api"

export function New() {
    const [ title, setTitle] = useState("")
    const [ description, setDescription ] = useState("")

    const [ links, setLinks ] = useState([])
    const [ newLink, setNewLink ] = useState("")

    const [ tags, setTags] = useState([])
    const [ newTag, setNewTag ] = useState("")

    const navigate = new useNavigate()

    function handleAddLink() {
        if(!newLink) {
            return alert('Write in field before of add')
        }

        setLinks(prevState => [...prevState, newLink])
        setNewLink("")
    }

    function handleRemoveLink(deleted) {
        setLinks(prevState => prevState.filter(link => link !== deleted))
    }

    function handleAddTag() {
        if(!newTag) {
            return alert('Write in field before of add')
        }

        setTags(prevState => [...prevState, newTag])
        setNewTag("")
    }

    function handleRemoveTag(deleted) {
        setTags(prevState => prevState.filter(tag => tag !== deleted))
    }

    async function handleCreateNote() {
        if(!title && !description) {
            return alert("The fields are required")
        }

        if(links.length == 0 && tags.length == 0) {
            return alert("The fields are required")
        }

        await api.post('/notes', {
            title,
            description,
            links,
            tags
        })

        alert('Note create successfully')
        navigate(-1)
    }

    function handleBack() {
        navigate(-1)
    }

    return (
        <Container>
            <Header/>

            <main>
                <Form>
                    <header>
                        <h1>Create Note</h1>
                        <ButtonText 
                            title="Go Back"
                            onClick={handleBack}
                        />
                    </header>

                    <Input 
                        placeholder='Title'
                        onChange={e => setTitle(e.target.value)}
                    />
                    <TextArea 
                        placeholder='Description'
                        onChange={e => setDescription(e.target.value)}
                    />

                    <Section title='Utils links'>
                        {
                            links.map((link, index) => (
                                <NoteItem
                                    key={String(index)}
                                    value={link}
                                    onClick={() => handleRemoveLink(link)}
                                /> 
                            ))
                        }
                     
                        <NoteItem 
                            isNew
                            placeholder="New link"
                            value={newLink}
                            onChange={e => setNewLink(e.target.value)}
                            onClick={handleAddLink}
                        />  
                    </Section>

                    <Section title='Markers'>
                        <div className="tags">
                            {
                               tags.map((tag, index) => (
                                    <NoteItem
                                        key={String(index)}
                                        value={tag}
                                        onClick={() => handleRemoveTag(tag)}
                                    />
                                ))
                            }
                            <NoteItem 
                                isNew 
                                placeholder="New Tag"
                                value={newTag}
                                onChange={e => setNewTag(e.target.value)}
                                onClick={handleAddTag}
                            />
                        </div>
                    </Section>

                    <Button title='Save' onClick={handleCreateNote}/>
                </Form>
            </main>
        </Container>
    )
}