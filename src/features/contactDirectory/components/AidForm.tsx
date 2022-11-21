import React, { useState } from 'react'

interface IProps {
    perdonId:number; 
    onSave: ()=>void; 
}

const AidForm = ({perdonId, onSave}:IProps) => {

    const [description, setDescription] = useState<string>("")
    const [comment, setComment] = useState<string>("")

    const handleSubmit = (e:any)=>{
        e.preventDefault();
        window.api.saveAid(perdonId,{description, comment} ).then(()=>{
            onSave();
            clearForm();

        })
    }

    const clearForm = ()=>{
        setDescription("");
        setComment("");

    }

    return (
        <div className="text-start">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <input value={description} onChange={(e)=>setDescription(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Observaciones</label>
                    <input value={comment} onChange={(e)=>setComment(e.target.value)} type="text" className="form-control" id="exampleInputPassword1"/>
                </div>

                <button type="submit" className="btn btn-primary">Agregar</button>
            </form>
        </div>
    )
}

export default AidForm