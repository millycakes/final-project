import { Text, View } from 'react-native'
import { useRouter } from "expo-router";
import Button from '../common/Button';
import { StyleSheet } from 'react-native';
import { FONTSIZES } from '../constants/theme';
import {FIREBASE_AUTH} from '../firebase/config';

function Welcome() {
    const router = useRouter();
    const auth = FIREBASE_AUTH;

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Welcome to CheckMate {auth.currentUser.displayName}</Text>
            <Text style={styles.text}>Bet on yourself and start building habits that actually last</Text>
            <Button
                title="Get Started"
                onPress={() => router.push("/goals")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        marginTop: 40,
        fontSize: FONTSIZES.heading2,
        fontWeight: 'bold',
        marginBottom: 24
    },
    container: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20
    },
    text: {
        fontSize: 16
    }
})

export default Welcome