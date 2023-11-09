import React from 'react'
import { TouchableOpacity, Text } from "react-native";
import styles from "./button.style"

function Button({ onPress, title }) {
    return (  
        <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button