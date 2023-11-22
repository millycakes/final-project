import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native"
import { COLORS } from '../constants/theme'
import { useRouter,useLocalSearchParams } from 'expo-router'
import Button from '../components/common/Button'
import { useState } from "react";
import client from '../api/client';
import {FIREBASE_AUTH} from '../firebase/config';
import { globalStyles } from "../styles/global";

function challenge() {
    const options = ["I lose motivation quickly", "I have a hard time getting started", "I get overwhelmed", "I forget to work on my goal"]
    const router = useRouter();
    const [chosen, setChosen] = useState("");
    let challenge = "";
    const params = useLocalSearchParams();
    const {goals, experience} = params;

    const onSubmitFormHandler = async (e)=>{
        FIREBASE_AUTH.currentUser.getIdToken(true).then(async (idToken)=>{
            switch(chosen) {
                case(options[0]):
                    challenge = "Staying Motivated";
                    break;
                case(options[1]):
                    challenge = "Getting Started";
                    break;
                case(options[2]):
                    challenge = "Taking It Slow";
                    break;
                case(options[3]):
                    challenge = "Building Consistency";
                    break;
            }
            const res = await client.post('/addPreference', {
                goals: goals,
                experience: experience,
                challenge: challenge
            },
            {
                headers: {
                    authtoken: idToken,
                }
            });
            if (res.data.success) {
                router.push({pathname: '/confirmation', params: {goals: goals, experience: experience, challenge: challenge}});
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
            <Text style={globalStyles.heading3}>What is your biggest challenge when it comes to your goals?</Text>
            <View>
                <FlatList 
                    data={options}
                    renderItem={({item}) => (
                        <TouchableOpacity 
                            style={styles.option(chosen, item)}
                            onPress={() => {
                                setChosen(item)
                            }}
                        >
                            <Text style={styles.optionText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <Button 
                title={"Continue"}
                onPress={onSubmitFormHandler}
            />
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
        option: (chosen, item) => ({
            backgroundColor: COLORS.gray200,
            borderRadius: 8,
            marginBottom: 12,
            paddingHorizontal: 16,
            height: 64,
            justifyContent: 'center',
            borderStyle: "solid",
            borderWidth: 2,
            borderColor: chosen === item ? COLORS.accent : COLORS.background
        }),
        optionText: {
            fontSize: 16
        }
    })

export default challenge