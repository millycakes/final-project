import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native"
import { COLORS, FONTSIZES } from '../constants/theme'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import Button from "../components/common/Button"
import { useState } from "react"
import { globalStyles } from "../styles/global"

function experience() {
    const options = ["I never worked on a personal goal before", "I had a few personal goals", "I had and achieved many personal goals"]
    const router = useRouter();
    let experience = "";
    const [chosenExp, setChosenExp] = useState("");
    const params = useLocalSearchParams();
    const {goals} = params;

    const onSubmitFormHandler = async (e)=>{
        switch (chosenExp) {
            case (options[0]):
                experience = "Beginner";
                break;
            case (options[1]):
                experience = "Intermediate";
                break;
            case(options[2]):
                experience = "Advanced";
                break;
        }
        router.push({pathname: "/challenge", params: {goals: goals, experience: experience}});
    }

    return (
        <SafeAreaView style={globalStyles.safeArea}>
        <View style={globalStyles.container}>
            <Text style={globalStyles.heading3}>How much experience do you have with personal goals?</Text>
            <View>
                <FlatList 
                    data={options}
                    renderItem={({item}) => (
                        <TouchableOpacity 
                            style={styles.option(chosenExp, item)}
                            onPress={() => {
                                setChosenExp(item)
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
        option: (chosenExp, item) => ({
            backgroundColor: COLORS.gray200,
            borderRadius: 8,
            marginBottom: 12,
            paddingHorizontal: 16,
            height: 64,
            justifyContent: 'center',
            borderStyle: "solid",
            borderWidth: 2,
            borderColor: chosenExp === item ? COLORS.accent : COLORS.background
        }),
        optionText: {
            fontSize: 16
        }
    })

export default experience