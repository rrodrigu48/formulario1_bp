import React, {useEffect, useState} from 'react'
import {firebase} from '../firebase'
import {nanoid} from 'nanoid'

const Formulario1 = () =>{
    const [lista, setLista] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')
    const [error, setError] = useState(null)

    const [cliente, setCliente] = useState(
        {
            nombre: '',
            apellido: '',
            direccion: '',
            telefono: '',
            edad: '',
           
        }
    );
    
    useEffect(()=>{
        const obtenerDatos = async () =>{
            try{
                const db = firebase.firestore()
                const data = await db.collection('clientes2').get()
                const array = data.docs.map(item =>(
                    {
                        id:item.id, ...item.data()
                    }
                ))
                setLista(array)
            }catch(error){
                console.log(error)
            }
        }
        obtenerDatos()

    })

    const guardarDatos = async (e) =>{
        e.preventDefault()

        if(!cliente.nombre.trim()){
            setError('Campo nombre vacío')
            return
        }

        if(!cliente.apellido.trim()){
            setError('Campo apellido vacío')
            return
        }

        if(!cliente.direccion.trim()){
            setError('Campo direccion vacío')
            return
        }
        if(!cliente.telefono.trim()){
            setError('Campo telefono vacío')
            return
        }
        if(!cliente.edad.trim()){
            setError('Campo edad vacío')
            return
        }
        
        try{
            const db = firebase.firestore()
            const nuevoCliente = {
                nombreCliente: cliente.nombre,
                apellidoCliente: cliente.apellido,
                direccionCliente: cliente.direccion,
                telefonoCliente: cliente.telefono,
                edadCliente: cliente.edad
                
            }
            await db.collection('clientes2').add(nuevoCliente)
            setLista([...lista,
                {id:nanoid(), nombreCliente: cliente.nombre, apellidoCliente: cliente.apellido, direccionCliente: cliente.direccion, telefonoCliente: cliente.telefono, edadCliente: cliente.edad}
            ])

        }catch(error){
            console.log(error)
        }

        setModoEdicion(false)
        setError(null)
        setCliente(
            {
                nombre: '',
                apellido: '',
                direccion: '',
                telefono: '',
                edad: '',
            }
        )
        
    }

    const eliminar= async (id) =>{
        try{
            const db = firebase.firestore()
            await db.collection('clientes2').doc(id).delete()
            const aux = lista.filter(item => item.id !== id)
            setLista(aux)
        }catch(error){
            console.log(error)
        }
    }

    const auxEditar = (item) =>{
        setCliente(
            {
                nombre: item.nombreCliente,
                apellido: item.apellidoCliente,
                direccion: item.direccionCliente,
                telefono: item.telefonoCliente,
                edad: item.edadCliente,
                email: item.emailCliente,
                sexo: item.sexoCliente,
            }
        )
        setModoEdicion(true)
        setId(item.id)
    }
    const editar = async e =>{
        e.preventDefault()
        if(!cliente.nombre.trim()){
            setError('Campo nombre vacío')
            return
        }

        if(!cliente.apellido.trim()){
            setError('Campo apellido vacío')
            return
        }

        if(!cliente.direccion.trim()){
            setError('Campo direccion vacío')
            return
        }
        if(!cliente.telefono.trim()){
            setError('Campo telefono vacío')
            return
        }
        if(!cliente.edad.trim()){
            setError('Campo edad vacío')
            return
        }
      
        try{
            const db= firebase.firestore()
            await db.collection('clientes2').doc(id).update({
                nombreCliente: cliente.nombre,
                apellidoCliente: cliente.apellido,
                direccionCliente: cliente.direccion,
                telefonoCliente: cliente.telefono,
                edadCliente: cliente.edad
                
            })

           
        }catch(error){
            console.log(error)
        }

        setCliente(
            {
                nombre: '',
                apellido: '',
                direccion: '',
                telefono: '',
                edad: '',
                
            }
        )
        setModoEdicion(false)
        setError(null)

    }
    const cancelar =()=>{
        setCliente(
            {
                nombre: '',
                apellido: '',
                direccion: '',
                telefono: '',
                edad: '',
                
            }
        )
        setModoEdicion(false)
        setError(null)
    }
    
    return (
        <div className='container mt-5'>
            <h1 className='text-center'>Listado de Cliente</h1>
            <hr/>
            <div className='row'>
                <div className="col-12 col-xl-8">
                    <h4 className="text-center">
                        Tabla Clientes
                    </h4>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Direccion</th>
                                <th scope="col">Telefono</th>
                                <th scope="col">Edad</th>
                                <th scope="col">Email</th>
                                <th scope="col">Sexo</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            lista.map((item)=>(
                                <tr key={item.id}>
                                    <td>{item.nombreCliente}</td>
                                    <td>{item.apellidoCliente}</td>
                                    <td>{item.direccionCliente}</td>
                                    <td>{item.telefonoCliente}</td>
                                    <td>{item.edadCliente}</td>
                                    <td>{item.emailCliente}</td>
                                    <td>{item.sexoCliente}</td>
                                    <td>
                                        <button className='btn btn-danger btn-sm float-end mx-2' onClick={()=> eliminar(item.id)}>Eliminar</button>
                                    </td>
                                    <td>
                                        <button className='btn btn-warning btn-sm float-end' onClick={()=> auxEditar(item)}>editar</button>
                                    </td>
                                </tr>
                            ))
                        }  
                        </tbody>
                    </table>
                </div>
                <div className="col-12 col-xl-4">
                    <h4 className="text-center">
                    {
                        modoEdicion ? 'Editar Cliente': 'Agregar Cliente'
                    }</h4>
                    <form onSubmit={modoEdicion ? editar: guardarDatos}>
                        {
                            error ? <span className='text-danger'>{error}</span> : null
                        }
                        <div className="form-floating mb-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Ingrese Nombre"
                                onChange={(e)=> setCliente({ ...cliente, nombre: e.target.value })}
                                value={cliente.nombre}
                            />
                            <label>Nombre</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Ingrese Apellido"
                                onChange={(e)=> setCliente({ ...cliente, apellido: e.target.value })}
                                value={cliente.apellido}
                            />
                            <label>Apellido</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Ingrese Direccion"
                                onChange={(e)=> setCliente({ ...cliente, direccion: e.target.value })}
                                value={cliente.direccion}
                            />
                            <label>Direccion</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Ingrese Telefono"
                                onChange={(e)=> setCliente({ ...cliente, telefono: e.target.value })}
                                value={cliente.telefono}
                            />
                            <label>Telefono</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Ingrese Edad"
                                onChange={(e)=> setCliente({ ...cliente, edad: e.target.value })}
                                value={cliente.edad}
                            />
                            <label>Edad</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                                type="email" 
                                className="form-control" 
                                placeholder="Ingrese Email"
                                onChange={(e)=> setCliente({ ...cliente, email: e.target.value })}
                                value={cliente.email}
                            />
                            <label>Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Ingrese Sexo"
                                onChange={(e)=> setCliente({ ...cliente, sexo: e.target.value })}
                                value={cliente.sexo}
                            />
                            <label>Sexo</label>
                        </div>   
                        {
                            !modoEdicion? (
                                <button className='btn btn-primary btn-block' type='submit'>Agregar</button>
                            )
                            :
                            (  <>
                                <button className='btn btn-warning btn-block' type='submit'>Editar</button>
                                <button className='btn btn-dark btn-block mx-2' onClick={() => cancelar()}>Cancelar</button>
                                </>
                            )
                        }
                                              
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Formulario