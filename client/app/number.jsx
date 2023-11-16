import { useState } from 'react';
import { View,TextInput,Button,Text} from 'react-native';
import client from '../api/client';
import {FIREBASE_AUTH} from '../firebase/config';
import {useRouter } from 'expo-router';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';


function number() {
    const [number, setNumber] = useState("");
    const [inputCode, setInputCode] = useState("");
    const [hasFilled, setHasFilled] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState(null);
    const auth = FIREBASE_AUTH;
    const user = auth.currentUser;
    const router = useRouter();

    const OnSumbitNumber = async (e)=>{
        auth.settings.appVerificationDisabledForTesting = true;
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
            'size': 'invisible',
          }, auth);
        setNumber( "+1"+number.replace(/[^0-9]/g, ''));
        signInWithPhoneNumber(auth, number, window.recaptchaVerifier)
        .then((confirmationResult) => {
            setConfirmationResult(confirmationResult);
            setHasFilled(true);
        }).catch((error) => {
            console.log(error);
            alert("Error: Code could not be sent!")
        });
    }

    const OnSubmitCode = async (e)=>{
        if (code && inputCode.length==6) [
            confirmationResult.confirm(code).then((result)=>{
                console.log(result);
            }).catch((error)=>{
                console.log(error);
            })
        ];
    }

    if (!hasFilled) {
        return (
            <View>
                <Text>Enter In Phone Number</Text>
                <TextInput
                onChangeText={setNumber}
                keyboardType="number-pad"
                value={number}
                />
                <Button
                    title="Continue"
                    onPress={OnSumbitNumber}
                />
            </View>
        )
    }
    else {
        return (
            <View>
                <Text>Enter In Verification Code</Text>
                <TextInput
                onChangeText={setInputCode}
                keyboardType="number-pad"
                value={number}
                />
                <Button
                    title="Continue"
                    onPress={OnSubmitCode}
                />
            </View>
        )
    }
}

export default number;