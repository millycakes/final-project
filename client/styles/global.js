import { StyleSheet  } from "react-native";
import { COLORS, FONTSIZES } from "../constants/theme"

export const globalStyles = StyleSheet.create({
    heading1: {
        marginTop: 40,
        fontFamily: 'PoppinsBold',
        fontSize: FONTSIZES.heading1,
        fontWeight: 'bold',
        marginBottom: 24.
    },
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: COLORS.background,
    },
    heading3: {
        marginTop: 40,
        fontFamily: 'PoppinsBold',
        fontSize: FONTSIZES.heading3,
        fontWeight: 'bold',
        marginBottom: 8.
    },
    heading5: {
        fontFamily: 'PoppinsBold',
        fontSize: FONTSIZES.heading5,
        fontWeight: 'bold',
        marginBottom: 8.
    },
    option: (chosenExp, item) => ({
        backgroundColor: COLORS.gray200,
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 16,
        height: 64,
        justifyContent: 'center',
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: chosenExp === item ? COLORS.accent : COLORS.background
    }),
    optionText: {
        fontSize: 16
    },
    input: {
        padding: 16,
        backgroundColor: COLORS.gray200,
        borderRadius: 8,
        marginBottom: 24
    },
    label: {
        fontFamily: 'PoppinsBold',
        fontSize: FONTSIZES.bodyMedium,
        color: COLORS.black,
        marginBottom: 8
    },
    bodyDefault: {
        fontFamily: 'PoppinsRegular',
        fontSize: FONTSIZES.body,
        color: COLORS.gray700
    },
    search: {
        backgroundColor: COLORS.white,
        borderColor: COLORS.gray300,
        borderWidth: 1,
        borderRadius: 100,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 12
    }
})
