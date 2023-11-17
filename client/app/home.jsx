import React from 'react'
import { useRouter } from 'expo-router'
import { View, Text } from 'react-native'
import { globalStyles } from '../styles/global'
import { useState } from 'react'
import ChallengeCard from '../common/ChallengeCard'

function home() {
    const [search, setSearch] = useState("");
    const updateSearch = (search) => {
        setSearch(search);
    };

    return (
        <View style={globalStyles.container}>
            <ChallengeCard />
        </View>
    )
}

export default home