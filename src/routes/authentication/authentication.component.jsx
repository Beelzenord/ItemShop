import { signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth , auth} from '../utils/firebase/firebase.utils';
import {useEffect} from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import './authentication.styles.scss';

const Authentication = () => {
  useEffect(() => {
    // declare the data fetching function
    const HandleRedirect = async () => {
      const response = await getRedirectResult(auth);
      if(response){
        const userDocRef = await createUserDocumentFromAuth(response.user);
        console.log(userDocRef);
      }
    }
  
    // call the function
    HandleRedirect()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  /*  useEffect(async() => {
    const response = await getRedirectResult(auth);

    if(response){
        const userDocRef = await createUserDocumentFromAuth(response.user);
        console.log(userDocRef);
    }
  },[]);*/

 
    const LogGoogleUserRedirect = async () => {
        const { user } = await signInWithGoogleRedirect();
       // const userDocRef = await createUserDocumentFromAuth(user);
       // console.log(user);
/**
 * <button onClick={LogGoogleUser}>Sign In With Google</button>
      <button onClick={LogGoogleUserRedirect}>Sign In With Google Redirect</button>

 */
      }
  return (
    <div className='authentication-container'>
        <h1>Sign In Page</h1>
        <SignInForm />
        <SignUpForm />
    </div>
  );
};

export default Authentication;

