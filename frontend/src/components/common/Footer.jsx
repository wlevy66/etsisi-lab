const Footer = () => {
    return (
        <footer className="bg-black ">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 ">
                <div className="sm:flex sm:items-center sm:justify-between text-white">
                    <span className="self-center text-2xl whitespace-nowrap ">Universidad Politécnica de Madrid © 2024</span>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="https://www.upm.es/AvisoLegal" target="_blank" className="hover:underline me-4 md:me-6">Aviso legal</a>
                        </li>
                        <li>
                            <a href="#" target="_blank" className="hover:underline me-4 md:me-6">Política de cookies</a>
                        </li>
                        <li>
                            <a href="https://sede.upm.es/proteccion-datos" target="_blank" className="hover:underline me-4 md:me-6">Política de protección de datos personales</a>
                        </li>
                        <li>
                            <a href="https://www.upm.es/contacto" target="_blank" className="hover:underline">Contacto</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer