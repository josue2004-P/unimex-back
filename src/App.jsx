import { Route , Routes} from "react-router-dom"
import Home from "./screens/Home";
import User from "./screens/User";
import Admin from "./screens/Admin";
import PublicElement from "./components/PublicElement";
import UserElement from "./components/UserElement";
import AdminElement from "./components/AdminElement";
import Login from "./screens/Login";
import Register from "./screens/Register";

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
              <User/>
            </UserElement>
        }
        ></Route>
        <Route 
          path="/admin" 
          element={
            <AdminElement>
              <Admin/>
            </AdminElement>
        }
        ></Route>
        
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
              <Register/>
        }
        ></Route>
        <Route path="*" element={<div>Page Not Found!</div>}></Route>
      </Routes>
    </div>
  ) 
}

export default App
