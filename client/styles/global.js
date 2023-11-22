import { StyleSheet  } from "react-native";
import { COLORS, FONTSIZES } from "../constants/theme"

export const globalStyles = StyleSheet.create({
    heading1: {
        marginTop: 40,
        fontFamily: 'PoppinsBold',
        fontSize: FONTSIZES.heading1,
        fontWeight: 'bold',
    },
    heading2: {
        fontFamily: 'PoppinsBold',
        fontSize: FONTSIZES.heading2,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20
    },
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    heading3: {
        fontFamily: 'PoppinsBold',
        fontSize: FONTSIZES.heading3,
        fontWeight: 'bold',
    },
    heading5: {
        fontFamily: 'PoppinsBold',
        fontSize: FONTSIZES.heading5,
        fontWeight: 'bold',
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
    bodyDefault: {
        fontFamily: 'PoppinsRegular',
        fontSize: FONTSIZES.body,
        color: COLORS.gray700
    },
    bodyMedium: {
        fontFamily: 'PoppinsRegular',
        fontSize: FONTSIZES.bodyMedium,
        color: COLORS.gray700
    },
    bodySmall: {
        fontFamily: 'PoppinsRegular',
        fontSize: FONTSIZES.bodySmall,
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
    },
    line: {
        borderBottomColor: COLORS.gray300,
        borderBottomWidth: 1,
        width: '46%'
    }
})
