import { useRouter } from 'expo-router';
import { View,TextInput,Text } from 'react-native';
import {FIREBASE_AUTH} from '../firebase/config';
import { useState } from 'react';
import client from '../api/client';
import { updateProfile } from "firebase/auth";
import { globalStyles } from '../styles/global';
import Button from '../common/Button';

//TODO: Add secure header using firebase

function name() {
    const router = useRouter();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const auth = FIREBASE_AUTH;

    const onSubmitFormHandler = async(e) =>{
        auth.currentUser.getIdToken(true)
        .then((idToken)=>{
          updateProfile(auth.currentUser, {
            displayName: firstname+" "+lastname
          }).then(async () => {
            const res = await client.post('/userUpdateInfo', 
              {
                firstname: firstname,
                lastname: lastname
              },
              {
                headers: {
                  authtoken: idToken,
                }
              });
              if (res.data.success) {
                router.push("/goals");
              }
          }).catch((error) => {
            alert(error);
          });
        })
        .catch((error)=>{
          alert(error);
        })
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.heading3}>
                What is your name?
            </Text>
            <Text style={globalStyles.bodyDefault}>
              Tell us a little bit about yourself
            </Text>
            <Text style={globalStyles.label}>First Name</Text>
            <TextInput
              placeholder='First Name'
              style={globalStyles.input}
              onChangeText={setFirstname}
              value={firstname}
              autoCorrect={false}
            />
            <Text style={globalStyles.label}>Last Name</Text>
            <TextInput
              placeholder='Last Name'
              style={globalStyles.input}
              onChangeText={setLastname}
              value={lastname}
              autoCorrect={false}
            />
            <Button
                title="Continue"
                onPress={onSubmitFormHandler}
            />
        </View>
    )
}

export default name;