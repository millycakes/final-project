import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, FlatList, Image} from 'react-native'
import { globalStyles } from '../../styles/global';
import client from '../../api/client';
import { useEffect, useState } from 'react'
import { COLORS } from '../../constants/theme'
import icons from '../../constants/goalIcons'
import {FIREBASE_AUTH} from '../../firebase/config'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from '../../components/discover/Carousel';

function discover() {
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
        if (search){
            challengeCopy = challengeCopy.filter(review => review.title.toLowerCase().includes(search.toLowerCase()));
        }
        if (chosenGoal){
            challengeCopy = challengeCopy.filter(review => review.category.includes(chosenGoal));
        }
        setFilteredChallenges(challengeCopy);
    }, [search, chosenGoal])

    return (
        // <SafeAreaView style={globalStyles.safeArea}>
            <ScrollView style={[globalStyles.container, globalStyles.safeArea]}>
                <View style={globalStyles.search}>
                    <TextInput 
                        value = {search}
                        onChangeText={(text) => setSearch(text)}
                        placeholder='Search'
                        style={globalStyles.bodyDefault}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <FlatList
                    data={goals}
                    horizontal={true}
                    style={styles.categories}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity 
                            style={styles.category}
                            onPress={() => {
                                if (chosenGoal == item){
                                    return setChosenGoal("");
                                }
                                setChosenGoal(item)
                            }}
                        >
                            <View style={styles.categoryIcon(chosenGoal, item)}>
                            <Image source={goalIcons[index]}/>
                            </View>
                            <Text style={styles.categoryName}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                    />
                <Carousel
                    title="Recommended For You"
                    challenges={recommended}
                />
                <Carousel
                    title="All Challenges"
                    challenges={filteredChallenges}
                />
                <Carousel
                    title="Popular Challenges"
                    challenges={filteredChallenges}
                />
            </ScrollView>
        // </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    categories: {
        maxHeight: 80,
        marginBottom: 24
    },
    category: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: 12,
        alignItems: 'center',
    },
    categoryIcon: (chosenGoal, item) => ({
        transform: chosenGoal === item ? [{ rotate: '25deg'}] : "",
        backgroundColor: chosenGoal === item ? COLORS.pinkLight : COLORS.white,
        paddingHorizontal: 4,
        paddingVertical: 4,
        borderRadius: '100%'
    })
    
})

export default discover