import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCT0oNlgemyHhoHDGg5c0o-e309CwEQeYE",
  authDomain: "store-db-2347c.firebaseapp.com",
  projectId: "store-db-2347c",
  storageBucket: "store-db-2347c.appspot.com",
  messagingSenderId: "402608913526",
  appId: "1:402608913526:web:67b5b33544d563e5fd7357"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider= new GoogleAuthProvider();
provider.setCustomParameters({
  prompt:"select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async(userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef)

  if(!userSnapshot.exists()){
    const { displayName, email }= userAuth
    const createdAt = new Date()

    try{
      await setDoc(userDocRef,{displayName, email, createdAt})
    }catch(error){
      console.log("error creating user",error)
    }

    return userDocRef
  }
}

export const createAuthUserWithEmailAndPassword = async(email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)

}

export const signInAuthUserWithEmailAndPassword = async(email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password)

}