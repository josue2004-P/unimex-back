import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"


export default function PublicElement({children}) {

  const { user,loading } = useAuth()

    console.log(user)
  
      if (loading) return <h1>Loading</h1>;
    
      if(
        !user
        ){
        return <>{children}</> ;
      }else{
        return <Navigate to={'/user'}/>;
      }
}
