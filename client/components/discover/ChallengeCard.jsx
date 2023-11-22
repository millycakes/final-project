import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/theme'
import { globalStyles } from '../../styles/global'
import { useRouter } from 'expo-router'

const ChallengeCard = ({challenge}) => {
    const router = useRouter()

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({pathname:'/challengedet', params:{id: challenge._id}})}
        >
            <View style={styles.challengeImg}></View>
            <View style={styles.metadata}>
                <Text style={styles.chip}>{challenge.duration}</Text>
                <Text style={styles.chip}>{challenge.category}</Text>
            </View>
            <Text style={globalStyles.heading5}>{challenge.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        marginRight: 8
    },
    challengeImg: {
        width: 240,
        height: 148,
        backgroundColor: COLORS.gray300,
        borderRadius: 12,
        marginBottom: 8
    },
    metadata: {
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        marginBottom: 8
    },
    chip: {
        backgroundColor: COLORS.gray200,
        color: COLORS.gray700,
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4
    }
})

export default ChallengeCard