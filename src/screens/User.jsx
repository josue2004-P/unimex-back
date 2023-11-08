import { useAuth } from "../context/AuthContext"

export default function User() {

  const { logout } = useAuth()



  return (
    <div>
      User
      <button onClick={logout}>
        Cerrar sesion
      </button>
    </div>
  )
}
