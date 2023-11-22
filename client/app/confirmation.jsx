import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native'
import Button from '../components/common/Button'
import {FIREBASE_AUTH} from '../firebase/config';
import { useLocalSearchParams, useRouter } from 'expo-router'
import { globalStyles } from '../styles/global';
import Summary from '../components/accountSetup/Summary';
import icons from '../constants/icons'
import { COLORS } from '../constants/theme';

function confirmation() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const {goals, experience, challenge} = params;

    return (
        <SafeAreaView style={globalStyles.safeArea}>
            <View style={[globalStyles.container, styles.confirmation]}>
                <Text style={globalStyles.heading2}>Ready to start crushing your goals?</Text>
                <Text style={globalStyles.heading5}>{FIREBASE_AUTH.currentUser.displayName}</Text>
                <View style={styles.summary}>
                    <Summary 
                        image={icons.interest}
                        category="Interest"
                        text={goals}
                        color={COLORS.pinkLight}
                    />
                    <Summary 
                        image={icons.experience}
                        category="Experience"
                        text={experience}
                        color={COLORS.yellowLight}
                    />
                    <Summary 
                        image={icons.focus}
                        category="Focus"
                        text={challenge}
                        color={COLORS.accentLight}
                    />
                </View>
                <Button 
                    title="GET STARTED"
                    onPress={() => router.push("/discover")}
                />
            </View>
        </SafeAreaView>
        )
    }


const styles = StyleSheet.create({
    confirmation: {
        display: 'flex',
        alignItems: 'center'
    },
    summary: {
        marginTop: 40
    }
})

export default confirmation