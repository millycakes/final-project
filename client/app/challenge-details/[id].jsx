import { View, Text } from "react-native"
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'
import { useState, useEffect } from "react";
import client from "../../api/client";
import { globalStyles } from "../../styles/global";

function ChallengeDetails() {
    const params = useLocalSearchParams();
    const router = useRouter()

    const [challenge, setChallenge] = useState({});

    useEffect(() => {
        async function challengeDetails(){
            const response = client.get(`/challengeDetails?id=${params['id']}`)
                .then((res)=> {
                    [data] = res.data
                    setChallenge(data)
                });
        }
        challengeDetails()
    }, []);

    console.log(challenge)
    
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