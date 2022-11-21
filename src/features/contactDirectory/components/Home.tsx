import React, { useEffect, useState } from 'react'
import PersonCard from '../components/PersonCard'
import SearchBar from '../components/SearchBar'
import { useNavigate } from 'react-router-dom'
import SimpleLayout from './SimpleLayout'
import useWindowDimensions from '../hooks/useWindowDimensions'

const Home = () => {
    const [people, setPeople] = useState<any[]>([])
    const navigate = useNavigate();
    const { height, width } = useWindowDimensions();
    useEffect(() => {
        if (window.api) {
            window.api.getPeople().then((rows: any[]) => {
                setPeople(rows)
            })
        }
    }, [])

    const handleOnSearch = (text: string) => {

        window.api.getPeople(text).then((rows: any[]) => {
            setPeople(rows)
        })
    }

    const handleGoToAddContactPage = ()=>{
        navigate('/add')
    }

    return (
        <SimpleLayout title='Contact Directory 123'>
            <SearchBar onSearch={handleOnSearch} />
            <div style={{maxHeight: `${height*0.7}px` , overflowY:'auto'}}>
            {
                people.map((person, i) => {
                    return <PersonCard key={person.id} person={person} />
                })
            }
            </div>
            {people.length === 0 ?
                <div className="alert alert-danger" role="alert">
                    No hay resultados! <br />
                    ¿Querés agendar un contacto nuevo?
                    <button className="btn btn-success ms-3" onClick={handleGoToAddContactPage}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className=" bi bi-person-add" viewBox="0 0 16 16">
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                        <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                    </svg> Agendar </button>
                </div> : null
            }
        </SimpleLayout>
    );
}

export default Home