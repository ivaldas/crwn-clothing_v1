import { useState } from 'react';
import {
	signInWithGooglePopup,
	// createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

const defaultFormFields = {
	email: '',
	password: ''
};

const SignInForm = () => {
	const [ formFields, setFormFields ] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await signInAuthUserWithEmailAndPassword(email, password);
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case 'auth/user-not-found':
					alert('Wrong Email');
					break;
				case 'auth/wrong-password':
					alert('Wrong Password');
					break;
				default:
					console.log(error.message);
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};
	return (
		<SignInContainer>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
				<FormInput
					label="Password"
					type="password"
					required
					minLength="8"
					onChange={handleChange}
					name="password"
					value={password}
				/>
				<ButtonsContainer>
					<Button buttonType="inverted" type="submit">
						Sign In
					</Button>
					<Button onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google} type="button">
						Google Sign In
					</Button>
				</ButtonsContainer>
			</form>
		</SignInContainer>
	);
};

export default SignInForm;
