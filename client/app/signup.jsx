import { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import client from '../api/client';
import {FIREBASE_AUTH} from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {useRouter } from 'expo-router'
import { globalStyles } from '../styles/global';
import Button from '../components/common/Button'
import { Eye } from 'react-native-feather';
import { COLORS } from '../constants/theme';
import Input from '../components/common/Input';

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
        <SafeAreaView style={globalStyles.safeArea}>
            <View style={globalStyles.container}>
                <Text style={globalStyles.heading3}>Welcome to CheckMate</Text>
                <Text style={globalStyles.bodyDefault}>Create an account to join challenges and earn rewards </Text>
                <Input 
                    label="Email"
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <Input 
                    label="Password"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    icon={<Eye stroke={COLORS.gray500}/>}
                />
                <Button
                    title="Sign Up"
                    onPress={onSubmitFormHandler}
                />
            </View>
        </SafeAreaView>
    )
}

export default signup;