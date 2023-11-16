import { useRouter } from 'expo-router';
import { View,TextInput,Button,Text } from 'react-native';
import {FIREBASE_AUTH} from '../firebase/config';
import { useState } from 'react';
import client from '../api/client';
import { updateProfile } from "firebase/auth";

//TODO: Add secure header using firebase

function name() {
    const router = useRouter();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const auth = FIREBASE_AUTH;

    const onSubmitFormHandler = async(e) =>{
        updateProfile(auth.currentUser, {
            displayName: firstname+" "+lastname
          }).then(async () => {
            const res = await client.post('/userUpdateInfo', {
                uid: auth.currentUser.uid,
                firstname: firstname,
                lastname: lastname
              });
              if (res.data.success) {
                router.push("/goals");
              }
          }).catch((error) => {
            alert(error);
          });
    }

    return (
        <View>
            <Text>
                What is your name?
            </Text>
            <TextInput
            onChangeText={setFirstname}
            value={firstname}
            />
            <TextInput
            onChangeText={setLastname}
            value={lastname}
            />
            <Button
                title="Continue"
                onPress={onSubmitFormHandler}
            />
        </View>
    )
}

export default name;