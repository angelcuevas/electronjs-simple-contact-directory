import React, {useEffect, useRef, useState} from 'react'

interface IProps {
    onSearch : (searchText: string)=>void; 
}

const AWAITTING_TIME = 800; 

const SearchBar = ({onSearch}:IProps) => {

    const [text, setText] = useState<string>("")

    const timer = useRef<any>(); 

    useEffect(()=>{
        
        if(timer.current){
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(()=>{
            onSearch(text)
        }, AWAITTING_TIME);

    },[text])

    return (
        <div className="text-start mb-5" >
        <label className="text-start mb-2">Búsqueda</label>
        <input value={text} onChange={(e:any)=>setText(e.target.value)} type="text" id="inputPassword5" placeholder='Ingresá el nº de teléfono' className="form-control" aria-describedby="passwordHelpBlock"/>

        </div>
    )
}

export default SearchBar