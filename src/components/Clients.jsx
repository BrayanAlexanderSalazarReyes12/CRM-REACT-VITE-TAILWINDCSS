import { Form, redirect, useNavigate } from "react-router-dom"
import { EliminarCliente } from "../Api/ClientCRUD"
import Swal from "sweetalert2"

export async function action({params}){
    Swal.fire({
        title: `Deseas eliminar este registro de nombre: ${params.ClienteNombre}`,
        text: `con el ID: ${params.ClienteId}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
            await EliminarCliente(params.ClienteId)
            window.location.reload(true)
        }
    })
    return redirect('/')
}

function Clients({client}) {
    const {nombre, empresa, email, telefono, id} = client
    const navigate = useNavigate()
    return (
        <tr className="text-center border-b">
            <td className="p-6 space-y-2">
                <p className="text-2xl text-gray-800">{nombre}</p>
                <p>{empresa}</p>
            </td>
            <td className="p-6 ">
                <p className="text-gray-600"> <span className="text-gray-800 uppercase font-bold">Email: </span>{email}</p>
                <p className="text-gray-600"> <span className="text-gray-800 uppercase font-bold">Telefono: </span>{telefono}</p>
            </td>
            <td className="p-6 flex gap-3">
                <button type="button" className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs" onClick={() => navigate(`/clientes/${id}/editar`)}>Editar</button>
                <Form
                    method="post"
                    action={`/clientes/${id}/${nombre}/eliminar`}
                >
                    <button type="submit" className="text-red-600 hover:text-red-700 uppercase font-bold text-xs">Eliminar</button>
                </Form>
            </td>
        </tr>
    )
}

export default Clients