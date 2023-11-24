import { useAuth } from "../../context/AuthContext"
import { Navigate } from "react-router-dom";

export default function AdminElement({children}) {

  
  const { user,loading } = useAuth()

    const USER_TYPES = {
        PUBLIC:0,
        NORMAL_USER:1,
        ADMIN_USER:2
      }
    
      const CURRENT_USER_TYPE = user;

      if (loading) return <h1></h1>;
    
      if(
        CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER
        ){
        return  <>{children}</>;
      }else{
        return <Navigate to={'/'}/>;
      }
}
