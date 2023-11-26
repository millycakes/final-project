import { View, Text, SafeAreaView,Button } from "react-native"
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'
import { useState, useEffect } from "react";
import client from "../api/client";
import { globalStyles } from "../styles/global";
import {FIREBASE_AUTH} from '../firebase/config'; 
import moment from 'moment';


function ChallengeDetails() {
    const params = useLocalSearchParams();
    const {id} = params;
    const router = useRouter()

    const [challenge, setChallenge] = useState({});
    const startdate = moment().format("MMM Do YY");
    const enddate = moment().add(7, 'days').format("MMM Do YY");

    useEffect(() => {
        const challengeDetails = FIREBASE_AUTH.currentUser.getIdToken(true)
        .then(async (idToken) => {
            const res = await client.post('/challengeDetails',
            {
                id: id
            },
            {
                headers: {
                    authtoken: idToken,
                }
            });
            if (res.data.success) {
                setChallenge(res.data.details);
            }
            else {
                alert(error);
            }
        }).catch(error => {
            alert(error);
        });
        challengeDetails;
    }, []);

    const onSubmitFormHandler = (e) =>{
        router.push({pathname: "/rules", params: {challenge: JSON.stringify(challenge)}});
    }
    
    return (
        <SafeAreaView style={globalStyles.safeArea}>
        <View style={globalStyles.container}>
            <Text style={globalStyles.heading1}>
                {challenge.title}
            </Text>
            <Text style={globalStyles.heading3}>
                Why Join This Challenge?
            </Text>
            <Text style={globalStyles.bodyDefault}>
                {challenge.description}
            </Text>
            <Text style={globalStyles.bodyDefault}>
                {startdate} to {enddate}
            </Text>
            <Button 
                title="JOIN NOW"
                 onPress={onSubmitFormHandler}
            />
        </View>
        </SafeAreaView>
    )
}

export default ChallengeDetails