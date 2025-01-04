import APIs from './APIs';
import { auth, signInWithEmailAndPassword } from '../Firebase/firebase';

const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();

        const response = await fetch(APIs.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token })
        });

        const data = await response.json();
        console.log('Login Response:', data);
    } catch (error) {
        console.error('Login Error:', error.message);
    }
};