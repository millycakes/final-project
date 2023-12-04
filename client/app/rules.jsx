import React from 'react';
import { Text,ScrollView, View , StyleSheet, TouchableOpacity} from 'react-native';
import { globalStyles } from '../styles/global';
import { useState } from 'react';
import { useRouter,useLocalSearchParams } from 'expo-router';
import {FIREBASE_AUTH} from '../firebase/config'; 
import client from "../api/client";

import { Clock, XCircle, Camera, Check } from 'react-native-feather'
import Button from '../components/common/Button';


import moment from 'moment';
import { COLORS } from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

function rules() {

    const [canContinue, setCanContinue] = useState(false);
    const params = useLocalSearchParams();
    const router = useRouter();
    const {challenge} = params;
    const currChallenge = JSON.parse(challenge);
    const startdate = moment();
    const enddate = moment().hour(23).minute(59).second(59).millisecond(999).add(7,'days');

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
        <SafeAreaView style={globalStyles.safeArea}>
            <View style={globalStyles.container}>
                <Text style={globalStyles.heading3}>Challenge rules</Text>
                <Text style = {globalStyles.bodyDefault}>You must agree to the following rules in order to participate in the challenge</Text>
                <TouchableOpacity 
                    style={styles.agreeButton}
                    onPress={() => setCanContinue(!canContinue)}
                >
                    <Text style={globalStyles.bodyDefault}>I read and agree with all</Text>
                    <View style={styles.checkButton(canContinue)}>
                        <Check stroke={COLORS.white} />
                    </View>
                </TouchableOpacity>
                <View style={styles.ruleLi}>
                    <Clock stroke={COLORS.gray700} />
                    <Text style={globalStyles.bodyDefault}>You must upload proof of completion between 6:30 AM and 7:05 AM</Text>
                </View>
                <View style={styles.ruleLi}>
                    <XCircle stroke={COLORS.gray700} />
                    <Text style={globalStyles.bodyDefault}>You cannot quit once you join the challenge</Text>
                </View>
                <View style={styles.ruleLi}>
                    <Camera stroke={COLORS.gray700} />
                    <Text style={globalStyles.bodyDefault}>You cannot upload an image from your photo library</Text>
                </View>
                <View style={styles.ruleLi}>
                    <Camera stroke={COLORS.gray700} />
                    <Text style={globalStyles.bodyDefault}>Your photo will be visible publicly</Text>
                </View>
                <Button
                    title = {"Continue"}
                    disabled = {!canContinue}
                    onPress = {onSubmitFormHandler}
                />
            </View> 
        </SafeAreaView>
    )
}

export default rules;

const styles = StyleSheet.create({
    ruleLi: {
        display: 'flex',
        flexDirection: 'row',
        gap: 16,
        marginBottom: 16
    },
    agreeButton: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 12,
        height: 52,
        backgroundColor: COLORS.gray200,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 16
    },
    checkButton: (canContinue) => ({
        padding: 4,
        backgroundColor: canContinue ? COLORS.accent : COLORS.gray400,
        borderRadius: 32
    })
})