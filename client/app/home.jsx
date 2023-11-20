import React from 'react'
import { useRouter } from 'expo-router'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, FlatList, Image} from 'react-native'
import { globalStyles } from '../styles/global'
import client from '../api/client';
import { useEffect, useState } from 'react'
import { COLORS } from '../constants/theme'
import icons from '../constants/goalIcons'
import {FIREBASE_AUTH} from '../firebase/config'; 

function home() {
    const goals = ["Fitness", "Diet", "Lifestyle", "Productivity", "Self-Care", "Hobby", "Wellness", "Finance"]
    const goalIcons = [icons.fitness, icons.diet, icons.lifestyle, icons.productivity, icons.selfCare, icons.hobby, icons.wellness, icons.finance]
    const [chosenGoal, setChosenGoal] = useState("");
    
    useEffect(() => {
        const fetch = FIREBASE_AUTH.currentUser.getIdToken(true)
            .then(async (idToken) => {
                try {
                    const response = await client.get(`/getChallenges`,
                    {
                        headers: {
                            authtoken: idToken,
                        }
                    });
                    if (response.data.success) {
                        setChallenges(response.data.allChallenges);
                        setFilteredChallenges(response.data.allChallenges)
                        setRecommended(response.data.recChallenges);
                    }
                    else {
                        alert("error 2",response.error);
                    }
                } catch (error) {
                    alert("error 4",error);
                }
            })
            .catch(error => {
                alert("error 3", error);
            });
        fetch;
    }, []);

    const [search, setSearch] = useState('');
    const [challenges, setChallenges] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [filteredChallenges, setFilteredChallenges] = useState([]);


    React.useEffect(() => {
        let challengeCopy = [...challenges];
        console.log(search, chosenGoal)
        if (search){
            challengeCopy = challengeCopy.filter(review => review.title.toLowerCase().includes(search.toLowerCase()));
        }
        if (chosenGoal){
            challengeCopy = challengeCopy.filter(review => review.category.includes(chosenGoal));
        }
        setFilteredChallenges(challengeCopy);
    }, [search, chosenGoal])


    const router = useRouter()

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.search}>
                <TextInput 
                    value = {search}
                    onChangeText={(text) => setSearch(text)}
                    placeholder='Search'
                    style={globalStyles.bodyDefault}
                    autoCapitalize={false}
                    autoComplete={false}
                />
            </View>
            <FlatList
                data={goals}
                horizontal={true}
                style={styles.goals}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity 
                        style={styles.goal(chosenGoal, item)}
                        onPress={() => {
                            if (chosenGoal == item){
                                return setChosenGoal("");
                            }
                            setChosenGoal(item)
                        }}
                    >
                        <Image source={goalIcons[index]}/>
                        <Text >{item}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
                />
            <Text style={globalStyles.heading3}>Recommended For You</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
                recommended.map((challenge) => {
                    return (
                        <TouchableOpacity
                            style={styles.challenge} 
                            key={challenge._id}
                            onPress={() => router.push(`/challenge-details/${challenge._id}`)}
                        >
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
            <Text style={globalStyles.heading3}>All Challenges</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
                filteredChallenges.map((challenge) => {
                    return (
                        <TouchableOpacity
                            style={styles.challenge} 
                            key={challenge._id}
                            onPress={() => router.push(`/challenge-details/${challenge._id}`)}
                        >
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
    goals: {
        maxHeight: 80
    },
    goal: (chosenGoal, item) => ({
        display: 'flex',
        flexDirection: 'column',
        marginRight: 12,
        alignItems: 'center',
        backgroundColor: chosenGoal === item ? COLORS.accentLight : COLORS.white
    }),
    challenge: {
        marginRight: 16
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