const COLORS = {
    white: "#FFFFFF",
    accent: "#2FBD71",
    accentMed: "#9CE2B4",
    accentLight: "#EFFBED",
    black: "#000000",
    background: "#FEFEFC",
    pink: "#FF71A4",
    pinkLight: '#FFF0F5',
    yellow: "#FFDE69",
    yellowLight: '#FFF8E1',
    gray800: "#2E2E2E",
    gray700: "#525252",
    gray600: "#727272",
    gray500: "#ADADAD",
    gray400: "#D4D4D4",
    gray300: "#E9E9E9",
    gray200: "#F5F5F5",
    gray100: "#F9F9F9"
}

const FONTSIZES = {
    heading1: 28,
    heading2: 24,
    heading3: 20,
    heading4: 18,
    heading5: 16,
    heading6: 14,
    body: 16,
    bodyMedium: 14,
    bodySmall: 12,
    button: 16,
    buttonSmall: 14
};

/**
 * --shadow:  0px -4px 24px rgba(0, 0, 0, 0.04);
--sticker:  0px 2px 8px rgba(0, 0, 0, 0.2);
 */
const SHADOWS = {
    shadow: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowRadius: 24,
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.04,
            },
            android: {
                elevation: 3,
            }
        })
    },
    sticker: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
            },
            android: {
                elevation: 3,
            }
        })
    }
}
const FONT = {
    regular: "PopRegular",
    bold: "PopBold"
  };

export { COLORS, FONT, FONTSIZES, SHADOWS };