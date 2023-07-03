import { createBrowserRouter } from "react-router-dom"
import Layout from "../components/Layout"
import NewClient, {action as nuevoClienteAction } from "../pages/NewClient"
import Index, {loader as ClientesLoader} from "../pages/Index"
import ErrorPage from "../components/ErrorPage"
import EditarClient, {loader as EditClientLoader, action as EditClientAction} from "../pages/EditarClient"
import {action as EliminarClientAction} from '../components/Clients'
const Rutas = createBrowserRouter([
    {
        path:'/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Index />,
                loader: ClientesLoader,
                errorElement: <ErrorPage />
            },
            {
                path:'/clientes/nuevo',
                element: <NewClient />,
                action: nuevoClienteAction,
                errorElement: <ErrorPage />
            },
            {
                path: '/clientes/:clienteId/editar',
                element: <EditarClient />,
                loader: EditClientLoader,
                action: EditClientAction,
                errorElement: <ErrorPage />
            },
            {
                path: '/clientes/:ClienteId/:ClienteNombre/eliminar',
                action: EliminarClientAction
            }
        ]
    }
    
]) 

export default Rutas