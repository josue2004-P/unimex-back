import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"


export default function PublicElement({children}) {

  const { user,loading } = useAuth()
  
  if (loading) return <h1></h1>;
    
      if(
        !user
        ){
        return <>{children}</> ;
      }else{
        return <Navigate to={'/estudiante'}/>;
      }
}
