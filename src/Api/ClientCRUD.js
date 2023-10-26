export async function ObtenerClient(){
    const respuesta = await fetch(import.meta.env.VITE_API_DB)
    const resultado = await respuesta.json()
    return resultado
}

export async function AgregarClient(datos){
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_DB,{
            method: 'POST',
            body: JSON.stringify(datos),
            headers:{
                'Content-Type':'application/json'
            }
        })
        console.log(JSON.stringify(datos))
        await respuesta.json()
    } catch (error) {
        console.log(error)
    }
}

export async function EditarCliente(id){
    const respuesta = await fetch(`${import.meta.env.VITE_API_DB}/${id}`)
    const resultado = await respuesta.json()
    return resultado
}

export async function ActualizarCliente(id,datos){
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_DB}/${id}`,{
            method: 'PUT',
            body: JSON.stringify(datos),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        await respuesta.json()
    } catch (error) {
        console.log(error)
    }
}

export async function EliminarCliente(id){
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_DB}/${id}`,{
            method:'DELETE'
        })
        await respuesta.json()
    } catch (error) {
        console.log(error)
    }
}
