import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS, FONT, FONTSIZES, SIZES, SHADOWS } from "../../constants/theme";


function Button ({ title, onPress, disabled }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.buttonContainer, disabled ? styles.disabled : '']}>
            <Text style={[styles.buttonText, disabled ? styles.disabledText : '']}>
                {title}
            </Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: COLORS.accent,
        borderRadius: 32,
        padding: 16,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20
    },
    buttonText: {
        fontSize: FONTSIZES.button,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        color: COLORS.white
    },
    disabled: {
        backgroundColor: COLORS.gray200
    },
    disabledText: {
        color: COLORS.gray400
    }
})

export default Button