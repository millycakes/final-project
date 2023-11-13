import { useState } from 'react';
import { View,TextInput,Button } from 'react-native';
import client from '../api/client';
import {FIREBASE_AUTH} from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {useRouter } from 'expo-router'

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
                router.push("/welcome");
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
        <View>
            <TextInput
            onChangeText={setEmail}
            value={email}
            />
            <TextInput
            onChangeText={setPassword}
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