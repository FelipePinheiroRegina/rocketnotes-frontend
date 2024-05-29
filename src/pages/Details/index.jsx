import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { api } from '../../services/api'


import { Container, Links, Content } from './styles'
import { Button } from '../../components/Button'
import { ButtonText } from '../../components/ButtonText'
import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import { Tag } from '../../components/Tag'

export function Details(){
  const [ data, setData ] = useState(null)
  const { id } = useParams()

  const navigate = useNavigate()

  async function handleRemove() {
    const isOk = window.confirm('want to delete the note?')

    if(isOk) {
      await api.delete(`/notes/${id}`)
      navigate(-1)
    }
  }

  useEffect(() => {
    async function fetchDetails() {
      const response = await api.get(`/notes/${id}`)
      setData(response.data)
    }

    fetchDetails()
  }, [])

  return(
   <Container>
      <Header />
      { data &&
        <main>
        <Content>
          <ButtonText 
            title='Delete Note'
            onClick={handleRemove}
          />
          
          <h1>{data.title}</h1>

          <p>{data.description}</p>
          
          <Section title="Utils links">
            <Links>
                {
                  data.links.map(link => (
                    <li key={String(link.id)}>
                      <a href={link.url} target='_blank'>
                          {link.url}                      
                      </a>
                    </li>
                  ))
                }
            </Links>                   
          </Section>

          <Section title="Markers">
            {
              data.tags.map(tag => (
                <Tag 
                  key={String(tag.id)}
                  title={tag.name}
                />
              ))
            }
            
            
          </Section>

          <Link to='/'>
            <Button title="Back"/>
          </Link>
        </Content>
      </main>
      }
   </Container>
  )
}