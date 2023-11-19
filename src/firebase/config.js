import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjRupYl0MwX3J23Xvgi_BYoAcq0Ugx0MQ",
  authDomain: "auth-3bec5.firebaseapp.com",
  projectId: "auth-3bec5",
  storageBucket: "auth-3bec5.appspot.com",
  messagingSenderId: "617893532121",
  appId: "1:617893532121:web:feb9589aa76ef2f106c9c8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export default firebaseConfig;