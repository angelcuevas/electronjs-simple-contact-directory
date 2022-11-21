import React from 'react'
import { useNavigate } from 'react-router-dom';

interface IProps {
    person: Person 
}

interface Person {
    name: string;
    address: string 
    phone: string 
}


const PersonCard = ({person}:IProps) => {

    const {name,address, phone} = person; 

    const nativate = useNavigate();

    const goToEditionPage = ()=>{
        nativate('/edit', {state: person  })
    }

    const goToFilePage = ()=>{
        nativate('/details', {state: person  })
    }

    return (
        <div className="card mb-2">
            <div className="card-header">
                {name} - Tel: {phone} <button className="btn btn-light float-end" onClick={goToEditionPage}> {editIcon} </button>
                <button className="btn btn-light float-end" onClick={goToFilePage}> {fileIcon} </button>
            </div>
            <div className="card-body">
                <blockquote className="blockquote mb-0">
                    <p></p>
                    <footer className="blockquote-footer">{address}</footer>
                </blockquote>
            </div>
        </div>
    )
}

const editIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>

const fileIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-archive-fill" viewBox="0 0 16 16">
<path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
</svg>

export default PersonCard