import { Text, View, SafeAreaView, StyleSheet } from 'react-native'
import { useRouter } from "expo-router";
import Button from '../components/common/Button'
import {FIREBASE_AUTH} from '../firebase/config';
import { globalStyles } from '../styles/global';
import { COLORS } from '../constants/theme';

function Welcome() {
    const router = useRouter();
    const auth = FIREBASE_AUTH;

    return (
        <SafeAreaView style={globalStyles.safeArea}>
            <View style={globalStyles.container}>
                <Text style={globalStyles.heading1}>Welcome to CheckMate</Text>
                <Text style={globalStyles.bodyDefault}>Bet on yourself and start building habits that actually last</Text>
                <View style={styles.divider}>
                    <View style={globalStyles.line}/>
                    <Text style={styles.dividerText}>or</Text>
                    <View style={globalStyles.line}/>
                </View>
                <Button
                    title="Sign Up"
                    onPress={() => router.push("/signup")}
                />
                <Text style={globalStyles.bodyMedium}>Already have an account? Sign Up</Text>
                <Text style={globalStyles.bodySmall}>By continuing you are accepting CheckMate’s Terms & Conditions and Privacy Policy</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    divider: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dividerText: {
        color: COLORS.gray500
    }
})

export default Welcome