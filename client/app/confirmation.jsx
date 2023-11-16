import { View, Text, Image, StyleSheet } from 'react-native'
import Button from '../common/Button'
import { FONTSIZES } from '../constants/theme'
import { useState, useEffect } from "react"
import client from '../api/client';

function confirmation() {

const [user,setUser] = useState("");
const [preferences,setPreferences] = useState({});

//later on change to using firebase (don't need to get first and last name)
useEffect(()=>{
    const onLoad = async ()=>{
        const res = await client.post('/getUser', {
            email: "jenna@gmail.com"
        });
        if (res.data.success) {
            setUser(res.data.firstname);
            setPreferences(res.data.preferences);
        }
        else {
            console.log("error: ",res.data.message);
        }
    }
    onLoad();
},
)
//later on need to account for multiple answers for interest
    return (
        <View style={styles.container}>
    
            <Text style={styles.heading}>Ready to start crushing your goal?</Text>
            <Text style={styles.heading}>{user}</Text>
            <Text style={styles.heading}>Interest</Text>
            <Text style={styles.description}>{preferences["Interest"]}</Text>
            <Text style={styles.heading}>Experience</Text>
            <Text style={styles.description}>{preferences["Experience"]}</Text>
            <Text style={styles.heading}>Focus</Text>
            <Text style={styles.description}>{preferences["Focus"]}</Text>
            <Button 
                title="GET STARTED"
            />
        </View>
      )
  }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20
    },
    heading: {
        marginTop: 40,
        textAlign: 'center',
        fontSize: FONTSIZES.heading2,
        fontWeight: 'bold'
    },
    description: {
        marginTop: 12,
        textAlign: 'center',
        fontSize: FONTSIZES.body
    }
})

export default confirmation