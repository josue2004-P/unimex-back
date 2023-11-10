import { Route , Routes} from "react-router-dom"
import Home from "./screens/Home";
import User from "./screens/User";
import Admin from "./screens/Admin";
import PublicElement from "./components/Protected/PublicElement";
import UserElement from "./components/Protected/UserElement";
import AdminElement from "./components/Protected/AdminElement";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";

import Navbar from "./components/dashboard/Navbar";
import Productos from "./screens/dashboard/Productos";
import Users from "./screens/dashboard/Users";
import NuevoProducto from "./screens/dashboard/NuevoProducto";
import EditarProducto from "./screens/dashboard/EditarProducto";
import NavbarUser from "./components/user/NavbarUser";
import Menu from "./screens/user/Menu";

function App() {
  return (
    <div>

      
      <Routes>
        <Route 
          path="/" 
          element={
              <Home/>
        }
        ></Route>

        <Route 
          path="/user" 
          element={
            <UserElement>
              <NavbarUser/>
              <User/>
            </UserElement>
        }
        ></Route>

        <Route 
          path="/user/menu" 
          element={
            <UserElement>
              <NavbarUser/>
              <Menu/>
            </UserElement>
        }
        ></Route>

        {/* admin */}

        <Route 
          path="/admin" 
          element={
            <AdminElement>
              <Navbar/>
              <Admin/>
            </AdminElement>
        }
        ></Route>

        <Route 
          path="/admin/productos" 
          element={
            <AdminElement>
              <Navbar/>
              <Productos/>
            </AdminElement>
        }
        ></Route>

        <Route 
          path="/admin/productos/nuevo-producto" 
          element={
            <AdminElement>
              <Navbar/>
              <NuevoProducto/>
            </AdminElement>
        }
        ></Route>

        <Route 
          path="/admin/productos/editar-producto/:id" 
          element={
            <AdminElement>
              <Navbar/>
              <EditarProducto/>
            </AdminElement>
        }
        ></Route>
        
        <Route 
          path="/admin/users" 
          element={
            <AdminElement>
              <Navbar/>
              <Users/>
            </AdminElement>
        }
        ></Route>

        {/* auth */}
        
        <Route 
          path="/login" 
          element={
            <PublicElement>
              <Login/>
            </PublicElement>
        }
        ></Route>

        
        <Route 
          path="/registrar" 
          element={
            <PublicElement>
            <Register/>
          </PublicElement>
        }
        ></Route>
        <Route path="*" element={<div>Page Not Found!</div>}></Route>
      </Routes>
    </div>
  ) 
}

export default App
