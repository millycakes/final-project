import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { COLORS, FONT, FONTSIZES, SIZES, SHADOWS } from "../constants/theme";


function ChallengeCard ({ title, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
            <Image
                
              />
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
        left: 20,
        right: 20
    },
    buttonText: {
        fontSize: FONTSIZES.button,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        color: COLORS.white
    }
})

export default ChallengeCard