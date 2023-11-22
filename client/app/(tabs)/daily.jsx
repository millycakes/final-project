import { View, Text, SafeAreaView } from 'react-native'
import { globalStyles } from '../../styles/global'
import React from 'react'
import Task from '../../components/daily/Task'

const daily = () => {
    return (
        <SafeAreaView style={globalStyles.safeArea}>
            <View style={globalStyles.container}>
            <Text style={globalStyles.heading5}>Incomplete</Text>
                <Task 
                    title = "Wake Up At 7:00 AM"
                    image = ""
                    deadline = ""
                />
            </View>
        </SafeAreaView>
    )
}

export default daily