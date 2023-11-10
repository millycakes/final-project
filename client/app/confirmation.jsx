import { View, Text, Image, StyleSheet } from 'react-native'
import Button from '../common/Button'
import { FONTSIZES } from '../constants/theme'

function confirmation() {
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Ready to start crushing your goal?</Text>
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
    }
})

export default confirmation