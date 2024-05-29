import { FiPlus, FiSearch } from 'react-icons/fi'

import { Container, Brand, Menu, Search, Content, NewNote} from './styles'

import { Header } from '../../components/Header'
import { ButtonText } from '../../components/ButtonText'
import { Input } from '../../components/Input'
import { Section } from '../../components/Section'
import { Note } from '../../components/Note'

import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { api } from "../../services/api"


export function Home(){
    const [ tags, setTags ] = useState([])
    const [ tagsSelected, setTagsSelected ] = useState([])
    const [ search, setSearch ] = useState([])
    const [ notes, setNotes ] = useState([])

    const navigate = useNavigate()
    
    function handleTagSelected(tagName) {
        if(tagName === 'all') {
            return setTagsSelected([])
        }

        const alreadySelected = tagsSelected.includes(tagName)
        
        if(alreadySelected) {
            const tagsFiltered = tagsSelected.filter(tag => tag !== tagName)
            setTagsSelected(tagsFiltered)
        } else {
          setTagsSelected(prevState => [...prevState, tagName])  
        }
    }

    function handleShowNote(id) {
        navigate(`/details/${id}`)
    }

    useEffect(() => {
        async function fetchNotes() {
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)

            setNotes(response.data)
        }

        fetchNotes()
    }, [tagsSelected, search])

    useEffect(() => {
        async function fetchTags() {
            const response = await api.get('/tags')

            setTags(response.data)
        }

        fetchTags()
    }, [])

    return (
        <Container>
            <Brand>
                <h1>Rocketnotes</h1>
            </Brand>

            <Header to='/profile'/>

            <Menu>
                <li>
                    <ButtonText 
                        title='All' 
                        onClick={() => handleTagSelected("all")}
                        isActive={tagsSelected.length === 0}
                    />
                </li>
                {
                    tags && tags.map(tag => (
                        <li key={String(tag.id)}>
                            <ButtonText 
                                title={tag.name}
                                onClick={() => handleTagSelected(tag.name)}
                                isActive={tagsSelected.includes(tag.name)}
                            />
                        </li> 
                    ))
                }
            </Menu>

            <Search>
                <Input 
                    placeholder='Search for title' 
                    icon={FiSearch}
                    onChange={e => setSearch(e.target.value)}
                />
            </Search>

            <Content>
                <Section title='Minhas notas'>
                    {
                        notes.map(note => (
                             <Note
                                key={String(note.id)} 
                                data={note}
                                onClick={() => handleShowNote(note.id)}
                            />
                        ))
                    }
                    
                </Section>
            </Content>

            <NewNote to='/new'>
                <FiPlus/>
                Criar nota
            </NewNote>
        </Container>
    )  
}