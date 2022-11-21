import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import SimpleLayout from './SimpleLayout'
import Spinner from './Spinner';
import Swal from 'sweetalert2'

const AddForm = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const  [name, setName] = useState<string>( state?.name ? state.name :  "")
    const  [phone, setPhone] = useState<string>(state?.phone ? state.phone :  "")
    const  [address, setAddress] = useState<string>(state?.address ? state.address :  "")
    const id = state?.id ? state.id :  null; 

    const handleSubmit = (e:any)=>{
        e.preventDefault();
        setIsSubmitting(true)
      
        saveOrEditPerson().then(()=>{
            Swal.fire({
                title: `Ya ${ id? 'editaste ' : 'agregaste'} a ${name}!!`,
                text: ``,
                icon: 'success',
                showConfirmButton:true,
                confirmButtonText: 'Ok',

              }).then(()=>{
                navigate('/')
              })

        }).finally(()=>{
            setIsSubmitting(false)
        })
    }

    const saveOrEditPerson = ()=>{
        const personData = {
            id,
            name, 
            phone,
            address
        }
        if(id){
            return window.api.editPerson(personData)
        }
        return window.api.savePerson(personData)
    }

    const deletePerson = ()=>{
        return window.api.deletePerson(id).then(()=>{
            Swal.fire({
                title: `Ya eliminaste a ${name}!!`,
                text: ``,
                icon: 'success',
                showConfirmButton:true,
                confirmButtonText: 'Ok',

              }).then(()=>{
                navigate('/')
              })
        })
    }

    const handleDelete = ()=>{
        Swal.fire({
            title: `¿Estás seguro que querés elimar a ${name}?`,
            text: `Mirá que no vuelve`,
            icon: 'warning',
            showConfirmButton:true,
            showCancelButton: true, 
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText:'No'
          }).then(({isConfirmed})=>{
            if(isConfirmed){
                deletePerson();
            }
          })
    }

    return (
        <SimpleLayout title={ id? `Editando a ${name}`  : 'Agregar contacto'} goesBackToHome={true} >
            <Spinner isLoading={isSubmitting}>
            <form className="text-start" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label  className="form-label">Nombre</label>
                    <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input value={phone} onChange={(e)=>{setPhone(e.target.value)}} type="text" className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input value={address} onChange={(e)=>{setAddress(e.target.value)}} type="text" className="form-control" id="exampleInputPassword1"/>
                </div>
 
                <button type="submit" className="btn btn-primary">{ id? 'Editar' : 'Agregar'}</button>
            </form>
            {
                id? 
                <button className="btn btn-danger float-end" onClick={handleDelete}> {icon} eliminar</button> : null
            }
            </Spinner>
        </SimpleLayout>
    )


}

const icon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>


export default AddForm