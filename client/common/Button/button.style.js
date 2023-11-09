import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import TEXTSIZES from "../../constants/textSizes";

const styles = StyleSheet.create({
    // ...
    appButtonContainer: {
      backgroundColor: COLORS.accent,
      borderRadius: 32,
      paddingVertical: 12,
      paddingHorizontal: 16
    },
    appButtonText: {
      fontSize: TEXTSIZES.button,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase",
      letterSpacing: 1.25
    }
  });

  export default styles;