import React, { useState } from "react";
import { TextField, Button, Container, Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth, db } from '../../Firebase/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import googleIcon from "../../Assets/Images/googleIcon.png";

export default function SignUp() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [disableButton, setDisableButton] = useState(false);

    const navigate = useNavigate();

    const signUpWithEmailPassword = async (email, password, name) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: name });
            await addDoc(collection(db, "Users"), {
                uid: user.uid,
                name: name,
                email: email
            });
            console.log("User created successfully");
            navigate("/");
        } catch (error) {
            console.error("Error signing up: ", error);
            setErrorMsg(error.message);
        }
    };

    const submitMethod = (e) => {
        e.preventDefault();
        if (!userData.name || !userData.email || !userData.password) {
            setErrorMsg("Please fill in all fields");
            return;
        }
        setDisableButton(true);
        signUpWithEmailPassword(userData.email, userData.password, userData.name)
            .finally(() => setDisableButton(false));
    };

    const signInWithGoogle = async () => {
        console.log("Google Sign-In not implemented yet");
    };

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <Typography variant="h4" gutterBottom>
                    Sign Up
                </Typography>
                <form onSubmit={submitMethod} style={{ width: '100%' }}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        onChange={e => setUserData(data => ({ ...data, name: e.target.value }))}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        onChange={e => setUserData(data => ({ ...data, email: e.target.value }))}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        required
                        onChange={e => setUserData(data => ({ ...data, password: e.target.value }))}
                    />
                    <Typography color="error" variant="body2">
                        {errorMsg}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        type="submit"
                        disabled={disableButton}
                    >
                        Sign Up
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 }}
                        startIcon={<img src={googleIcon} alt="google icon" style={{ width: 20 }} />}
                        onClick={signInWithGoogle}
                    >
                        Sign In with Google
                    </Button>
                    <Box mt={2}>
                        <Typography variant="body2">
                            Already have an account?{' '}
                            <Link href="/">Log In</Link>
                        </Typography>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}
