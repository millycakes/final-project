import React from 'react';
import { Text,ScrollView,Button } from 'react-native';
import { globalStyles } from '../styles/global';
import Task from '../components/daily/Task'
import { useRouter,useLocalSearchParams } from 'expo-router';

function rules() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const {challenge, startdate, enddate} = params;
    const currChallenge = JSON.parse(challenge);
    const currStart = JSON.parse(startdate);
    const currEnd = JSON.parse(enddate);
    console.log(currChallenge);
    console.log(startdate);

    const onSubmitFormHandler = async (e) =>{
        router.push('/discover');
    }
    //in backend, need to add images to each challenge
    return (
    <ScrollView style={[globalStyles.container, globalStyles.safeArea]}>
        <Text style={globalStyles.heading1}>You successfully joined the challenge!</Text>
        <Text style = {globalStyles.bodyDefault}>Great job for taking the first step to becoming your better self</Text>
        <Text style = {globalStyles.heading3}>{currChallenge.title}</Text>
        <Text style = {globalStyles.bodyDefault}>{currStart+"-"+currEnd}</Text>
        <Button
            title = {"Done"}
            onPress = {onSubmitFormHandler}
        />
    </ScrollView>
    )
}

export default rules;