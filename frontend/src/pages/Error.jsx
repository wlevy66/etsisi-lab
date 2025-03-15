import { useNavigate } from "react-router-dom"

const Error = () => {

    const navigate = useNavigate()

    return (
        <div className="text-center py-24">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">404. Página no encontrada</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Lo sentimos, no hemos podido encontrar la página que está buscando</p>
            <div className="mt-10 flex justify-center">
                <button onClick={() => navigate('/')} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm">
                    Volver a inicio
                </button>
            </div>
        </div>
    )
}

export default Error