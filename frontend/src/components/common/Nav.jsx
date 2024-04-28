import {  NavLink } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"


const Nav = () => {

    const {isAuthenticated, signOut} = useAuth()


    return (
      <nav className="flex items-center justify-between flex-wrap p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"></svg>
          <h1 className="font-semibold text-2xl tracking-tight">ETSISI</h1>
        </div>

        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
          {
              isAuthenticated ? (
                  <button onClick={signOut} className="inline-block text-sm px-4 py-2 border rounded text-black border-black hover:border-transparent hover:bg-white mt-4 lg:mt-0 float-end">Logout</button>
              ) : (
                  <NavLink to="/login" className="inline-block text-sm px-4 py-2 border rounded text-black border-black hover:border-transparent hover:bg-white mt-4 lg:mt-0 float-end">Login</NavLink>
              )
          }
          </div>
          <div>

            
          </div>
        </div>
      </nav>
    )
}

export default Nav