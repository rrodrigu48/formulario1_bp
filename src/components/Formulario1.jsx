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
                const data = await db.collection('clientes').get()
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
            await db.collection('clientes').add(nuevoCliente)
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
            await db.collection('clientes').doc(id).delete()
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
            await db.collection('clientes').doc(id).update({
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





}