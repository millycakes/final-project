import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/theme'
import { globalStyles } from '../../styles/global'
import { Clock, ChevronRight } from 'react-native-feather'
import Button from '../common/Button'
import { useRouter } from 'expo-router'

const Task = ({title, image, deadline, complete}) => {
    const router = useRouter();
    const onSubmitFormHandler = async (e)=>{
        router.push({pathname: "/camera"});
    }

    return (
        <TouchableOpacity style={styles.card}>
            <View style={styles.image}></View>
            <View style={styles.details}>
                <View style={styles.info}>
                    <Text style={globalStyles.heading5}>{title}</Text>
                    <View style={styles.deadline}>
                        <Clock width={16} height={16} stroke={COLORS.gray600}/>
                        <Text style={globalStyles.bodyMedium}>Due in</Text>
                        
                    </View>
                    <Button 
                            title="Upload Proof"
                            small={true}
                            onPress={onSubmitFormHandler}
                        />
                </View>
                <ChevronRight stroke={COLORS.black} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.gray200,
        display: 'flex',
        flexDirection: 'row',
        padding: 12,
        gap: 16
    },
    image: {
        width: 64,
        height: 64,
        backgroundColor: COLORS.gray300
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexGrow: 1
    },
    deadline: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4
    }
})


export default Task