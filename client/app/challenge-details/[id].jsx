import { View, Text } from "react-native"
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'
import { useState, useEffect } from "react";
import client from "../../api/client";
import { globalStyles } from "../../styles/global";
import {FIREBASE_AUTH} from '../../firebase/config'; 


function ChallengeDetails() {
    const params = useLocalSearchParams();
    const router = useRouter()

    const [challenge, setChallenge] = useState({});

    useEffect(() => {
        const challengeDetails = FIREBASE_AUTH.currentUser.getIdToken(true)
        .then(async (idToken) => {
            const response = client.post('/challengeDetails',
            {
                id: params['id'],
            },
            {
                headers: {
                    authtoken: idToken,
                }
            })
            .then((res)=> {
                [data] = res.data
                setChallenge(data)
            });
        }).catch(error => {
            alert("error1",error);
        });
        challengeDetails;
    }, []);

    alert(challenge)
    
    return (
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
        </View>
    )
}

export default ChallengeDetails