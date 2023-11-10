import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import { COLORS, FONTSIZES } from '../constants/theme'
import { useRouter } from 'expo-router'
import Button from "../common/Button"
import { useState } from "react"
import client from '../api/client';

function challenge() {
    const options = ["I lose motivation quickly", "I have a hard time getting started", "I get overwhelmed", "I forget to work on my goal"]
    const router = useRouter();
    const [chosen, setChosen] = useState("");

    const onSubmitFormHandler = async (e)=>{
        const res = await client.post('/addPreference', {
          email: "jenna@gmail.com",
          pref: chosen,
        });
        if (res.data.success) {
          router.push("/confirmation",res.data.preferences);
        }
      }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>What is your biggest challenge when it comes to your goals?</Text>
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