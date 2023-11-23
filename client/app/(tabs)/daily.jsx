import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { globalStyles } from '../../styles/global'
import React from 'react'
import Task from '../../components/daily/Task'
import { useState } from 'react'
import Calendar from '../../components/daily/Calendar'
import moment from 'moment'

const daily = () => {
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    
    return (
        <SafeAreaView style={globalStyles.safeArea}>
            <View style={globalStyles.container}>
                <Calendar 
                    onSelectDate={setSelectedDate} 
                    selected={selectedDate} 
                />
                <Text style={[globalStyles.heading5, styles.status]}>Incomplete</Text>
                <Task 
                    title = "Wake Up At 7:00 AM"
                    image = ""
                    deadline = ""
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    status: {
        marginBottom: 16
    }
})

export default daily