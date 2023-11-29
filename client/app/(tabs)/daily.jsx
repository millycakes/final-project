import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { globalStyles } from '../../styles/global'
import React from 'react'
import Task from '../../components/daily/Task'
import { useState,useEffect } from 'react'
import Calendar from '../../components/daily/Calendar'
import {FIREBASE_AUTH} from '../../firebase/config'; 
import moment from 'moment'
import client from "../../api/client";

const daily = () => {
    const [selectedDate, setSelectedDate] = useState(moment());
    const [calendarChallenges, setCalendarChallenges] = useState([[]]);
    const startDate = moment().format('YYYY-MM-DD');
    const dayTasks = calendarChallenges[selectedDate.diff(startDate,"days")];


    useEffect(() => {
        const fetch = FIREBASE_AUTH.currentUser.getIdToken(true)
            .then(async (idToken) => {
                try {
                    const response = await client.get(`/getCalendarChallenges`,
                    {
                        headers: {
                            authtoken: idToken,
                        }
                    });
                    if (response.data.success) {
                        setCalendarChallenges(response.data.challenges);
                    }
                    else {
                        alert(response.error);
                    }
                } catch (error) {
                    alert(error);
                }
            })
            .catch(error => {
                alert(error);
            });
        fetch;
    }, []);

    const handleDateSelect = (newDate) => {
        const momentDate = moment(newDate);
        setSelectedDate(momentDate);
    };

    
    return (
        <SafeAreaView style={globalStyles.safeArea}>
            <View style={globalStyles.container}>
                <Calendar 
                    onSelectDate={handleDateSelect} 
                    selected={selectedDate} 
                />
                <Text style={[globalStyles.heading5, styles.status]}>Incomplete</Text>
                <View>
                {dayTasks.map((task, index) => (
                    <Task
                    key={index}
                    title={task.title}
                    image={task.image}
                    deadline={moment(new Date(task["endDate"])).diff(startDate,"days")+" days"}
                    />
                ))}
                </View>
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