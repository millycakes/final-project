import { View, Text , ScrollView, StyleSheet} from 'react-native'
import React from 'react'
import ChallengeCard from './ChallengeCard'
import { globalStyles } from '../../styles/global'
import { ChevronRight } from 'react-native-feather'
import { COLORS } from '../../constants/theme'

const Carousel = ({title, challenges}) => {
    if (challenges.length === 0) return;
    return (
        <>
            <View style={styles.category}>
                <Text style={globalStyles.heading3}>{title}</Text>
                <ChevronRight stroke={COLORS.black}/>
            </View>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.carousel}
            >
                {
                    challenges.map((challenge) => {
                        return (
                            <ChallengeCard 
                                challenge={challenge}
                                key={challenge._id}
                            />
                        )
                    })
                }
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    category: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16
    },
    carousel: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 24
    }
})

export default Carousel