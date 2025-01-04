import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, 
        getAuth, 
        signInWithEmailAndPassword, 
        updateProfile,
        GoogleAuthProvider,
        signInWithPopup
       } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { createContext, useContext } from "react";

// const firebaseConfig = {
//   apiKey: "AIzaSyAC1EAenZuJkPjl4mxbh0KLcBkH2ThkWNQ",
//   authDomain: "app-4170e.firebaseapp.com",
//   projectId: "app-4170e",
//   storageBucket: "app-4170e.appspot.com",
//   messagingSenderId: "1069982370503",
//   appId: "1:1069982370503:web:6592d0629917d24b400ce2",
//   measurementId: "G-VT9YS6RJW3",
//   databaseURL: "https://app-4170e-default-rtdb.firebaseio.com"
// };

// const firebaseApp = initializeApp(firebaseConfig);
// const firebaseAuth = getAuth(firebaseApp);
// const database = getDatabase(firebaseApp);
// const googleProvider = new GoogleAuthProvider()

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext)

export const FirebaseProvider = (props) => {

  // const signupUserWithEmailAndPassword = (email, password) => {
  //   return createUserWithEmailAndPassword(firebaseAuth, email, password)
  // }

  // const signinUserWithEmailAndPassword=(email,password)=>{
  //   return signInWithEmailAndPassword(firebaseAuth,email,password)
  // }

  // const putDataToDataBase=(key,data)=>{
  //   return set(ref(database,key),data);
  // }

  // const updateUserName = (user,name)=>{
  //   return updateProfile(user, {
  //     displayName: name
  //   })
  // }

  // const signUpUserWithGoogle = () =>{
  //   return signInWithPopup(firebaseAuth,googleProvider)
  // }

  return (
    <FirebaseContext.Provider 
    value={{
          // signupUserWithEmailAndPassword,
          // putDataToDataBase,
          // updateUserName,
          // signinUserWithEmailAndPassword,
          // signUpUserWithGoogle,
          }}>

      {props.children}
    </FirebaseContext.Provider>
  )
} 