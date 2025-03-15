const Footer = () => {
    let year = new Date().getFullYear()

    return (
        <footer>
            <div className="flex flex-col md:flex-row justify-between items-center py-4 px-4 md:px-8 text-white">
                <span className="self-center text-xl whitespace-nowrap mb-4 md:mb-0">Universidad Politécnica de Madrid © {year}</span>
                <ul className="flex flex-col sm:flex-row sm:items-center text-sm">
                    <li>
                        <a href="https://www.upm.es/AvisoLegal" target="_blank" className="hover:underline me-4 md:me-6">
                            Aviso legal
                        </a>
                    </li>
                    <li>
                        <a href="#" target="_blank" className="hover:underline me-4 md:me-6">
                            Política de cookies
                        </a>
                    </li>
                    <li>
                        <a href="https://sede.upm.es/proteccion-datos" target="_blank" className="hover:underline me-4 md:me-6">
                            Política de protección de datos personales
                        </a>
                    </li>
                    <li>
                        <a href="https://www.upm.es/contacto" target="_blank" className="hover:underline">
                            Contacto
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer