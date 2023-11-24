import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"


export default function UserElement({children}) {

  const { user,loading } = useAuth()

  
    const USER_TYPES = {
        PUBLIC:0,
        NORMAL_USER:1,
        ADMIN_USER:2
      }
  
      if (loading) return <h1></h1>;
    
      if(
        user === USER_TYPES.NORMAL_USER 
        ){
        return <>{children}</> ;
      }else{
        return <Navigate to={'/maestro'}/>;
      }
}
