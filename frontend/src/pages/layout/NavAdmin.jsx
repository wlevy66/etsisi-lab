import { NavLink } from "react-router-dom"

const NavAdmin = () => {

    return (
      <nav>
        <div className="max-w-7xl mx-auto p-2 flex justify-center">
            <div className="flex gap-10">
                <NavLink to="/dashboard"
                  className={({ isActive }) => isActive ? 'text-2xl italic font-bold' : 'text-2xl italic'}>
                  Usuarios
                </NavLink>
                <NavLink to="/rooms"
                  className={({ isActive }) => isActive ? 'text-2xl italic font-bold' : 'text-2xl italic'}>
                  Aulas
                </NavLink>
                <NavLink to="/reservations"
                  className={({ isActive }) => isActive ? 'text-2xl italic font-bold' : 'text-2xl italic'}>
                  Reservas
                </NavLink>
            </div>
        </div>
      </nav>
    )
}

export default NavAdmin