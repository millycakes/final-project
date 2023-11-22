import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/theme'

const Task = ({title, image, deadline}) => {
    return (
        <View style={styles.card}>
            <View style={styles.image}></View>
            <Text>{title}</Text>
            <Text>Due in {deadline}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        borderColor: COLORS.gray200
    },
    image: {
        width: 64,
        height: 64,
        backgroundColor: COLORS.gray200
    }
})


export default Task