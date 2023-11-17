import { View, Text, Image, StyleSheet } from 'react-native'
import Button from '../common/Button'
import { FONTSIZES } from '../constants/theme'
import {FIREBASE_AUTH} from '../firebase/config';
import { useLocalSearchParams, useRouter } from 'expo-router'
import { globalStyles } from '../styles/global';

function confirmation() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const {goals, experience, challenge} = params;

    return (
        <View style={globalStyles.container}>
            <Text style={styles.heading}>Ready to start crushing your goal?</Text>
            <Text style={styles.heading}>{FIREBASE_AUTH.currentUser.displayName}</Text>
            <Text style={styles.heading}>Interest</Text>
            <Text style={styles.description}>{goals}</Text>
            <Text style={styles.heading}>Experience</Text>
            <Text style={styles.description}>{experience}</Text>
            <Text style={styles.heading}>Focus</Text>
            <Text style={styles.description}>{challenge}</Text>
            <Button 
                title="GET STARTED"
                onPress={() => router.push("/home")}
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
        textAlign: 'center',
        fontSize: FONTSIZES.heading2,
        fontWeight: 'bold'
    },
    description: {
        marginTop: 12,
        textAlign: 'center',
        fontSize: FONTSIZES.body
    }
})

export default confirmation