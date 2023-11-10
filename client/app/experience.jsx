import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import { COLORS, FONTSIZES } from '../constants/theme'
import { Stack, useRouter } from 'expo-router'
import Button from "../common/Button"
import { useState } from "react"
import client from '../api/client';


function experience() {
    const options = ["I never worked on a personal goal before", "I had a few personal goals", "I had and achieved many personal goals"]
    const router = useRouter();
    const [chosenExp, setChosenExp] = useState("");

    const onSubmitFormHandler = async (e)=>{
        const res = await client.post('/addPreference', {
          email: "jenna@gmail.com",
          pref: chosenExp,
        });
        if (res.data.success) {
          router.push("/challenge");
        }
      }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>How much experience do you have with personal goals?</Text>
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
    )
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginLeft: 20,
            marginRight: 20
        },
        heading: {
            marginTop: 40,
            fontSize: FONTSIZES.heading3,
            fontWeight: 'bold',
            marginBottom: 24
        },
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