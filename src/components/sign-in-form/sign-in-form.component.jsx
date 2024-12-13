import { useContext, useState } from 'react';
import FormInput from '../form-input/form-input.component';

import { signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth,signInWithGooglePopup } from '../../routes/utils/firebase/firebase.utils';
import './sign-in-form.styles.scss'
import Button from '../button/button.component';
import {UserContext} from '../../context/user.context';

const defaultFormFields = {
    email: '',
    password: '',
};


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;
    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
      //  setCurrentUser(user);
       // const userDocRef = await createUserDocumentFromAuth(user);
        await createUserDocumentFromAuth(user);
    }
    /*const [displayName, setDisplayName] = useState(defaultFormFields.displayName);
    const [email, setEmail] = useState(defaultFormFields.email);
    const [password, setPassword] = useState(defaultFormFields.password);
    const [confirmPassword, setConfirmPassword] = useState(defaultFormFields.confirmPassword);*/
    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormFields({...formFields, [name]: value});
    }
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email,password);
            console.log(user);
           // setCurrentUser(user);
            resetFormFields();
        } catch (error) { 
            switch(error.code){
                case "auth/wrong-password" : alert('incorrect password for email'); break;
                case "auth/user-not-found" : alert('user not found'); break;
                default : console.log(error);
            }
            
        }
    }
// required type="text" placeholder='Your Name' name='displayName' value={displayName} onChange={handleChange} />
// inputOptions = {{ type:'text' required=true, onChange : {handleChange}, name:'displayName', value:{displayName},}} 
    return(
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' required type="email" placeholder='Your Email' name='email' value={email} onChange={handleChange} />
                <FormInput label='Password' required type="password" placeholder='Your Password' name='password' value={password} onChange={handleChange} />
                <div className='button-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button> 
                </div>
            </form>
        </div>
    )
}

export default SignInForm;
