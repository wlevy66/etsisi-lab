import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react"
import ModalEditProfile from "@/components/ModalEditProfile"
import ModalUpdatePassword from "@/components/ModalUpdatePassword"
import Nav from "./Nav"
import NavAdmin from "./NavAdmin"
import { ADMIN_ROLE } from "@/constants/roles"

const Header = () => {

  const { isAuthenticated, logout, user } = useAuth()

  const [isDropdownVisible, setDropdownVisible] = useState(false)
  const [openModalEditProfile, setOpenModalEditProfile] = useState(false)
  const [openModalUpdatePassword, setOpenModalUpdatePassword] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible)
  }
  const closeDropdown = () => {
    setDropdownVisible(false)
  }

  const updateProfile = async () => {
    setOpenModalEditProfile(true)
    setIsModalOpen(true)
  }

  const updatePassword = async () => {
    setOpenModalUpdatePassword(true)
    setIsModalOpen(true)
  }

  return (
    <header className={`${isAuthenticated && user.role !== ADMIN_ROLE && 'border-b-8 border-b-solid border-b-[#2581c4]'} `}>
      <div className="grid grid-cols-12 items-center p-6">
        <div className="col-span-2 mr-6">
          <img src="/logo.jpg" className="w-40" alt="Logo ETSISI" />
        </div>

        <div className={`${isAuthenticated ? 'col-span-8' : 'col-span-10'} flex-grow flex items-center justify-center`}>
          <h2 className="text-3xl italic">Bienvenido a la reserva de laboratorios de la ETSISI</h2>
        </div>

        {
          isAuthenticated &&
          <div className="col-span-2">
            <button onClick={toggleDropdown}
              className="dropdown float-right w-full sm:w-auto font-semibold rounded-full">
              {user.name ? user.name[0].toUpperCase() + user.lastname[0].toUpperCase() : user.id[0]}
            </button>
            {
              isDropdownVisible &&
              <div className="w-48 absolute right-4 top-24 bg-white border rounded shadow-lg">
                <button onClick={() => {
                  updateProfile()
                  closeDropdown()
                }}
                  className="w-full px-4 py-2 text-left text-black hover:bg-gray-100">
                  Editar perfil
                </button>
                <button onClick={() => {
                  updatePassword()
                  closeDropdown()
                }}
                  className="w-full px-4 py-2 text-left text-black hover:bg-gray-100">
                  Cambiar contraseña
                </button>
                <button onClick={() => {
                  logout()
                  closeDropdown()
                }}
                  className="w-full px-4 py-2 text-left text-black hover:bg-gray-100">
                  Cerrar sesión
                </button>
              </div>
            }
          </div>
        }
        {
          openModalEditProfile &&
          <ModalEditProfile id={user.id} open={isModalOpen} onClose={() => setOpenModalEditProfile(false)} />
        }
        {
          openModalUpdatePassword &&
          <ModalUpdatePassword id={user.id} open={isModalOpen} onClose={() => setOpenModalUpdatePassword(false)} />
        }
      </div>
      {
        !isAuthenticated && <Nav />
      }
      {
        isAuthenticated && user.role === ADMIN_ROLE && <NavAdmin />
      }
    </header>
  )
}

export default Header