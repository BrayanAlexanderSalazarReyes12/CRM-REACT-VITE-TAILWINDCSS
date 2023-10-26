import { Form, redirect, useActionData, useNavigate } from "react-router-dom"
import Formulario from "../components/Formulario"
import Swal from 'sweetalert2'
import { AgregarClient } from "../Api/ClientCRUD"

export async function action({request}) {
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

  console.log(JSON.stringify(datos))
  
  //await AgregarClient(datos)
  
  //return redirect('/')
}

function NewClient() {

  const Navigate = useNavigate()
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
        console.log(error[0])
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
     <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
     <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>

     <div className="flex justify-end">
      <button className="bg-blue-800 text-white px-3 py-1 font-bold rounded-lg" onClick={() => Navigate("/")}>Volver</button>
     </div>

     <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
      <Form
        method="post"
        noValidate
      >
      <Formulario />
      <input type="submit" value="Registrar cliente" className="mt-5 w-full bg-blue-800 
      p-3 uppercase font-bold text-white text-lg rounded-lg"/>
      </Form>
      
     </div>
    </>
  )
}

export default NewClient
