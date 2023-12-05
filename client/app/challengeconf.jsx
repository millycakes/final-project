import React from 'react';
import { Text,ScrollView, View } from 'react-native';
import { globalStyles } from '../styles/global';
import Task from '../components/daily/Task'
import { useRouter,useLocalSearchParams } from 'expo-router';
import Button from '../components/common/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView style={globalStyles.safeArea}>
        <View style={globalStyles.container}>
            <Text style={globalStyles.heading3}>You successfully joined the challenge!</Text>
            <Text style = {globalStyles.bodyDefault}>Great job for taking the first step to becoming your better self</Text>
            <Text style = {globalStyles.heading3}>{currChallenge.title}</Text>
            <Text style = {globalStyles.bodyDefault}>{currStart+"-"+currEnd}</Text>
            <Button
                title = {"Done"}
                onPress = {onSubmitFormHandler}
            />
        </View>
    </SafeAreaView>
    )
}

export default rules;