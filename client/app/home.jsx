import React from 'react'
import { useRouter } from 'expo-router'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import { globalStyles } from '../styles/global'
import client from '../api/client';
import { useEffect, useState } from 'react'
import { COLORS } from '../constants/theme'

function home() {
    useEffect(() => {
        console.log('fetching challenges')
        async function getChallenges(){
            const response = client.get(`/getChallenges`)
                .then((res)=> {
                    setChallenges(res.data)
                });
        }
        getChallenges()
    }, []);

    const [search, setSearch] = useState('');
    const [challenges, setChallenges] = useState([]);
    const updateSearch = (search) => {
        setSearch(search);
    };

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.search}>
                <TextInput 
                    value = {search}
                    onChangeText={(text) => setSearch(text)}
                    placeholder='Search'
                    style={globalStyles.bodyDefault}
                />
            </View>
            <ScrollView horizontal>
            {
                challenges.map((challenge, index) => {
                    return (
                        <TouchableOpacity style={styles.challenge} key={index}>
                            <View style={styles.challengeImg}></View>
                            <View style={styles.metadata}>
                                <Text style={styles.chip}>{challenge.duration}</Text>
                                <Text style={styles.chip}>{challenge.category}</Text>
                            </View>
                            <Text style={globalStyles.heading5}>{challenge.title}</Text>
                        </TouchableOpacity>
                    )
                })
            }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    challenge: {
        marginRight: 8
    },
    challengeImg: {
        width: 240,
        height: 148,
        backgroundColor: COLORS.gray300,
        borderRadius: 12,
        marginBottom: 8
    },
    metadata: {
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        marginBottom: 8
    },
    chip: {
        backgroundColor: COLORS.gray200,
        color: COLORS.gray700,
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4
    }
})

export default home