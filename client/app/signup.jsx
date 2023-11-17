import { useState } from 'react';
import { View,TextInput, Text } from 'react-native';
import client from '../api/client';
import {FIREBASE_AUTH} from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {useRouter } from 'expo-router'
import { globalStyles } from '../styles/global';
import Button from '../common/Button'

function signup() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const auth = FIREBASE_AUTH;
    const router = useRouter();

    const onSubmitFormHandler = async (e)=>{
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            const res = await client.post('/userSignup', {
                email: user.email,
                password: password,
                uid: user.uid
            });
            if (res.data.success) {
                router.push("/name");
            }
        })
        .catch((error) => {
            switch (error.code) {
                case" auth/email-already-exists":
                    alert ("Error: Email already exists!");
                    break;
                case "auth/invalid-email":
                    alert ("Error: Email provided is invalid!");
                    break;
                case "auth/invalid-password":
                    alert("Error: Password must be at least 6 characters long!");
                    break;
                default:
                    alert(error.message);
            }
        });
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.heading3}>Welcome to CheckMate</Text>
            <Text style={globalStyles.bodyDefault}>Create an account to join challenges and earn rewards </Text>
            <Text style={globalStyles.label}>Email</Text>
            <TextInput
                style={globalStyles.input}
                onChangeText={setEmail}
                placeholder="Email"
                value={email}
            />
            <Text style={globalStyles.label}>Password</Text>
            <TextInput
            style={globalStyles.input}
            onChangeText={setPassword}
            placeholder='Password'
            value={password}
            />
            <Button
                title="Sign Up"
                onPress={onSubmitFormHandler}
            />
        </View>
    )
}

export default signup;