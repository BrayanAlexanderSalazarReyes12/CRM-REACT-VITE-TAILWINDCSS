import { Form, redirect, useLoaderData, useNavigate, useActionData } from "react-router-dom"
import { ActualizarCliente, EditarCliente } from "../Api/ClientCRUD"
import Formulario from "../components/Formulario"
import Swal from "sweetalert2"

export async function loader({params}){
    const cliente = await EditarCliente(params.clienteId)
    if(Object.values(cliente).length === 0){
        throw new Response('',{
            status: 404,
            statusText: 'Cliente no encontrado'
        })
    }
    return cliente
}

export async function action({request, params}){
    const formData = await request.formData()
    const datos = Object.fromEntries(formData)
    const email = formData.get('email')
    //validacion
    const Errores = []
    if(Object.values(datos).includes("")){
        Errores.push('Todos los campos son obligatorios')
    }

    //Verificar email inicio
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

    if(!regex.test(email)){
        Errores.push("El email no es válido")
    }
    //verificar email final

    //retornar errores
    if(Object.keys(Errores).length){
        return Errores
    }
    

    //actualizar el cliente
    await ActualizarCliente(params.clienteId,datos)
    
    return redirect('/')
}

function EditarClient() {
    const Navigate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()
    //error
    {errores?.length && errores.map( (error, i) => {
        
        if(i > 0){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: "Todos los campos son obligatorios",
            showConfirmButton: false,
            timer: 2000
        }).then(()=>{
            Swal.fire({
            position: 'center',
            icon: 'error',
            title: error,
            showConfirmButton: false,
            timer: 2000
            })
        })
        }else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: error,
            showConfirmButton: false,
            timer: 2000
        })
        }
    })}
    return (
        <>
        <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
        <p className="mt-3">A continuacion podras editar los datos de un cliente</p>

        <div className="flex justify-end">
        <button className="bg-blue-800 text-white px-3 py-1 font-bold rounded-lg" onClick={() => Navigate('/')}>Volver</button>
        </div>

        <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
            <Form
                method="post"
                noValidate
            >
            <Formulario 
                cliente={cliente}
            />
            <input type="submit" value="Guardar Cambios" className="mt-5 w-full bg-blue-800 
            p-3 uppercase font-bold text-white text-lg rounded-lg"/>
        </Form>
        
        </div>
        </>
  )
}

export default EditarClient