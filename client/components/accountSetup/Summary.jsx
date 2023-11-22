import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/theme'
import { globalStyles } from '../../styles/global'

const Summary = ({image, color, category, text}) => {

    return (
        <View style={styles.summary}>
            <View style={styles.image(color)}>
                <Image
                    source={image}
                />  
            </View>
            <View>
                <Text style={[globalStyles.heading6, styles.category]}>{category}</Text>
                <Text style={[globalStyles.heading4]}>{text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    summary: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        marginBottom: 24
    },
    image: (color) => ({
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 32,
        backgroundColor: color
    }),
    category: {
        color: COLORS.gray500
    }
})

export default Summary