import { useState, useContext } from 'react';
import FormInput from '../../components/form-input/form-input.component';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';
import './sign-up-form.styles.scss'
import Button from '../../components/button/button.component';
import { UserContext } from '../../context/user.context';
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    /*const [displayName, setDisplayName] = useState(defaultFormFields.displayName);
    const [email, setEmail] = useState(defaultFormFields.email);
    const [password, setPassword] = useState(defaultFormFields.password);
    const [confirmPassword, setConfirmPassword] = useState(defaultFormFields.confirmPassword);*/
    console.log('hit');
    
    const {setCurrentUser} = useContext(UserContext);

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormFields({...formFields, [name]: value});
    }
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        } catch (error) { 
            if(error.code === 'auth/email-already-in-use') {
                alert('Email already in use');
            }
            console.log(error);
        }
    }
// required type="text" placeholder='Your Name' name='displayName' value={displayName} onChange={handleChange} />
// inputOptions = {{ type:'text' required=true, onChange : {handleChange}, name:'displayName', value:{displayName},}} 
    return(
        <div className='sign-up-container'>
            <h2>Don't have an account</h2>
            <span>Sign up with your email and password</span>
            <h1>Sign up with your email and password (su)</h1>
            <form onSubmit={handleSubmit}>
               
                <FormInput label='Display Name' 
                   required type="text" placeholder='Your Name' name='displayName' value={displayName} onChange={handleChange} />
                <FormInput label='Email' required type="email" placeholder='Your Email' name='email' value={email} onChange={handleChange} />
                <FormInput label='Password' required type="password" placeholder='Your Password' name='password' value={password} onChange={handleChange} />
                <FormInput label='Confirm Password' required type="password" placeholder='Confirm Password' name='confirmPassword' value={confirmPassword} onChange={handleChange} />
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;
