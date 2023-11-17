import { Text, View } from 'react-native'
import { useRouter } from "expo-router";
import Button from '../common/Button';
import {FIREBASE_AUTH} from '../firebase/config';
import { globalStyles } from '../styles/global';

function Welcome() {
    const router = useRouter();
    const auth = FIREBASE_AUTH;

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.heading1}>Welcome to CheckMate</Text>
            <Text style={globalStyles.bodyDefault}>Bet on yourself and start building habits that actually last</Text>
            <Button
                title="Get Started"
                onPress={() => router.push("/signup")}
            />
        </View>
    )
}

export default Welcome