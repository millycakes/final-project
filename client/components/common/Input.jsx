import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZES } from '../../constants/theme'
import { useState } from 'react';

const Input = ({label, placeholder, value, icon, onChangeText}) => {

    return (
        <>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.input} >
                <TextInput
                    value={value}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.inputText}
                />
                {icon ? icon : ""}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'PoppinsBold',
        fontSize: FONTSIZES.bodyMedium,
        color: COLORS.black,
        marginBottom: 8
    },
    input: {
        padding: 16,
        backgroundColor: COLORS.gray200,
        borderRadius: 8,
        marginBottom: 24,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputText: {
        width: '90%'
    }
})

export default Input