import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { COLORS, FONT, FONTSIZES, SIZES, SHADOWS } from "../constants/theme";


function Button ({ title, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: COLORS.accent,
        borderRadius: 32,
        padding: 16,
        position: 'absolute',
        bottom:40,
        left: 0,
        right: 0
    },
    buttonText: {
        fontSize: FONTSIZES.button,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        color: COLORS.white
    }
})

export default Button