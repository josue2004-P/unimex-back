//Importa 
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { 
    doc, 
    getDoc,
    setDoc
} from "firebase/firestore";
import { firestore,auth } from "../firebase/config";


//Contex
const authContext = createContext();

//Funcion Aucht
export const useAuth = () => {
  //Guarda el usuario para poder ser pasado a otras paginas
  const context = useContext(authContext);
  //Validacion si existe el provider
  if (!context) throw new Error("There is no Auth provider");
  //Retorna el context
  return context;
};

export function AuthProvider({ children }) {


  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function registrarUsuario(email, password, rol) {
    const infoUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((usuarioFirebase) => {
      return usuarioFirebase;
    });

    console.log(infoUsuario.user.uid);
    const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
    setDoc(docuRef, { correo: email, rol: rol });

  }

  const login = (email, password) => {
    
   return signInWithEmailAndPassword(auth,email,password);
  };

  const logout = () => signOut(auth);

  //  FUNICON OBTENER POR ROL

  async function getRol(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    return infoFinal;
  }

  function setUserWithFirebaseAndRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      };

      
      setUser(userData.rol);
      setLoading(false)

    });
  }



  //CAMBIOS

  useEffect(() => {
    onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        //funcion final
  
        if (!user) {
          setUserWithFirebaseAndRol(usuarioFirebase);
        }
      } else {
        setUser(null);
        setLoading(false)
      }
    });
  }, []);

  return (
    <authContext.Provider
      value={{
        registrarUsuario,
        login,
        user,
        logout,
        loading,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
