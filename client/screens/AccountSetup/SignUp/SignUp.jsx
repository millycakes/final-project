import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from "expo-router";


import Button from "../../../common/Button/Button"
import styles from './signup.style';

export default function SignUp() {
    const router = useRouter();

    return (
    <SafeAreaView>
      <View >
        <Text style={styles.headerTitle}>Welcome to Checkmate</Text>
        <Text>Bet on yourself and start building habits that actually last</Text>
        <Button title="Sign Up" onPress={() => router.push(`/username`)}/>
        <Text>By continuing you are accepting CheckMate’s Terms & Conditions and Privacy Policy</Text>
      </View>
    </SafeAreaView>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}