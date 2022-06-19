import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../../utils/firebase.utils"

import SignUpForm from "../../sign-up-form/sign-up-form.component";

const SignIn = () => {
  const logGoogleUser = async() => {
    const {user} = await signInWithGooglePopup();
    createUserDocumentFromAuth(user)
  }

  return(
    <div>
      <h1> Sign In Page </h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <SignUpForm/>
      </div>
  )
}

export default SignIn