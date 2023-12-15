import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";

//PROTECTED
import PublicElement from "./components/Protected/PublicElement";
import UserElement from "./components/Protected/UserElement";
import AdminElement from "./components/Protected/AdminElement";
import CoordinadorElement from "./components/Protected/CoordinadorElement";

//AUTH
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";

//DASHBOARD PROFESOR
import Maestros from "./screens/Maestros/Maestros";
import Alumnos from "./screens/Maestros/Alumnos/Alumnos";

//Alumno
import Estudiante from "./screens/Estudiantes/Estudiante";
import MaestroMensajes from "./screens/Maestros/Mensajes/MaestroMensajes";
import TareasParcial from "./screens/Maestros/Materias/Tareas/TareasParcial";

//COORDINADOR
import Coordinador from "./screens/Coordinador/Coordinador";
import CoordinacionMaestro from "./screens/Coordinador/Maestro/CoordinacionMaestro";

import Materias from "./screens/Maestros/Materias/Materias";
import Parciales from "./screens/Maestros/Materias/Parciales";
import DetallesTareas from "./screens/Maestros/Materias/Tareas/DetallesTareas";

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
          path="/maestro/materias"
          element={
            <AdminElement>
              <Materias />
            </AdminElement>
          }
        ></Route>

        <Route
          path="/maestro/parciales/:id"
          element={
            <AdminElement>
              <Parciales />
            </AdminElement>
          }
        ></Route>
        
        <Route
          path="/maestro/tareas/:par/:id"
          element={
            <AdminElement>
              <TareasParcial />
            </AdminElement>
          }
        ></Route>

        <Route
          path="/maestro/:par/:mat/detallestareas/:id"
          element={
            <AdminElement>
              <DetallesTareas />
            </AdminElement>
          }
        ></Route>

        {/* COORDINADOR */}

        <Route
          path="/coordinador"
          element={
            <CoordinadorElement>
              <Coordinador />
            </CoordinadorElement>
          }
        ></Route>

        <Route
          path="/coordinacion/maestro"
          element={
            <CoordinadorElement>
              <CoordinacionMaestro />
            </CoordinadorElement>
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
