import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";

//PROTECTED
import PublicElement from "./components/Protected/PublicElement";
import UserElement from "./components/Protected/UserElement";
import AdminElement from "./components/Protected/AdminElement";

//AUTH
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";

//DASHBOARD PROFESOR
import Maestros from "./screens/Maestros/Maestros";
import Alumnos from "./screens/Maestros/Alumnos/Alumnos";

//Alumno
import Estudiante from "./screens/Estudiantes/Estudiante";
import MaestroMensajes from "./screens/Maestros/Mensajes/MaestroMensajes";
import MaestroTareas from "./screens/Maestros/Tareas/MaestroTareas";

function App() {
  return (
    <div>
      <Routes>
        {/* home */}

        <Route path="/home" element={<Home />}></Route>

        {/* Estudiantes */}

        <Route
          path="/estudiante"
          element={
            <UserElement>
              <Estudiante />
            </UserElement>
          }
        ></Route>

        {/* Maestros */}

        <Route
          path="/maestro"
          element={
            <AdminElement>
              <Maestros />
            </AdminElement>
          }
        ></Route>

        <Route
          path="/maestro/alumnos"
          element={
            <AdminElement>
              <Alumnos />
            </AdminElement>
          }
        ></Route>

        <Route
          path="/maestro/mensajes"
          element={
            <AdminElement>
              <MaestroMensajes />
            </AdminElement>
          }
        ></Route>

        <Route
          path="/maestro/tareas"
          element={
            <AdminElement>
              <MaestroTareas />
            </AdminElement>
          }
        ></Route>

        {/* auth */}

        <Route
          path="/"
          element={
            <PublicElement>
              <Login />
            </PublicElement>
          }
        ></Route>

        <Route
          path="/registrar"
          element={
            <PublicElement>
              <Register />
            </PublicElement>
          }
        ></Route>

        <Route path="*" element={<div>Page Not Found!</div>}></Route>
      </Routes>
    </div>
  );
}

export default App;
