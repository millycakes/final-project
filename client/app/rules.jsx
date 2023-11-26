import React from 'react';
import { Text,ScrollView,Button } from 'react-native';
import { globalStyles } from '../styles/global';
import { useState } from 'react';
import { useRouter,useLocalSearchParams } from 'expo-router';
import {FIREBASE_AUTH} from '../firebase/config'; 
import client from "../api/client";

import moment from 'moment';

function rules() {

    const [canContinue, setCanContinue] = useState(true);
    const params = useLocalSearchParams();
    const router = useRouter();
    const {challenge} = params;
    const currChallenge = JSON.parse(challenge);
    const startdate = moment();
    const enddate = moment().hour(23).minute(59).second(59).millisecond(999).add(7,'days');

    const agree = (e) =>{
        setCanContinue(false);
    }

    const onSubmitFormHandler = async (e) =>{
        console.log(currChallenge._id);
        FIREBASE_AUTH.currentUser.getIdToken(true).then(async (idToken)=>{
            const res = await client.post('/enterChallenge', {
                challengeId: currChallenge._id,
                startdate: startdate.format(),
                enddate: enddate.format()
            },
            {
                headers: {
                    authtoken: idToken,
                }
            });
            if (res.data.success) {
                router.push({pathname: "/challengeconf", params: {challenge: challenge, startdate: JSON.stringify(startdate.format('MM-DD (dddd)')), enddate: JSON.stringify(enddate.format('MM-DD (dddd)'))}});
            }
            else {
                alert(res.data.message);
            }
        }).catch(function(error) {
            alert(error);
        });
    }
    
    return (
    <ScrollView style={[globalStyles.container, globalStyles.safeArea]}>
        <Text style={globalStyles.heading1}>Challenge rules</Text>
        <Text style = {globalStyles.bodyDefault}>You must agree to the following rules in order to participate in the challenge</Text>
        <Button 
                title={"I read and agree with all"}
                onPress={agree}
            />
        <Text>You must upload proof of completion between 6:30 AM and 7:05 AM</Text>
        <Text>You cannot quit once you join the challenge</Text>
        <Text>You cannot upload an image from your photo library</Text>
        <Text>Your photo will be visible publicly</Text>
        <Button
            title = {"Continue"}
            disabled = {canContinue}
            onPress = {onSubmitFormHandler}
        />
    </ScrollView>
    )
}

export default rules;