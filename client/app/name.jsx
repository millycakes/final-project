import { useRouter } from 'expo-router';
import { View,TextInput,Text, SafeAreaView } from 'react-native';
import {FIREBASE_AUTH} from '../firebase/config';
import { useState } from 'react';
import client from '../api/client';
import { updateProfile } from "firebase/auth";
import { globalStyles } from '../styles/global';
import Button from '../components/common/Button'
import Input from '../components/common/Input';

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
      <SafeAreaView style={globalStyles.safeArea}>
        <View style={globalStyles.container}>
            <Text style={globalStyles.heading3}>
                What is your name?
            </Text>
            <Text style={globalStyles.bodyDefault}>
              Tell us a little bit about yourself
            </Text>
            <Input 
              label="First Name"
              placeholder="First Name"
              value={firstname}
              onChangeText={setFirstname}
              />
            <Input 
              label="Last Name"
              placeholder="Last Name"
              value={lastname}
              onChangeText={setLastname}
            />
            <Button
                title="Continue"
                onPress={onSubmitFormHandler}
            />
        </View>
      </SafeAreaView>
    )
}

export default name;