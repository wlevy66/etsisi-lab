import { NavLink, useLocation } from "react-router-dom"

const Nav = () => {

    const { pathname } = useLocation()

    return (
      <nav className="">
        <div className="max-w-7xl mx-auto p-2 flex justify-center">
            <div className="flex gap-5">
                <NavLink to="/login"
                  className={({ isActive }) => isActive || pathname === '/' ? 'text-2xl italic font-bold' : 'text-2xl italic'}>
                  Auntenticarse
                </NavLink>
                <NavLink to="/register"
                  className={({ isActive }) => isActive ? 'text-2xl italic font-bold' : 'text-2xl italic'}>
                  Registrarse
                </NavLink>
            </div>
        </div>
      </nav>
    )
}

export default Nav