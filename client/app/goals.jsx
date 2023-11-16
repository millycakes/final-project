import { FlatList, Text, View, Image,TouchableOpacity, StyleSheet } from 'react-native'
import Button from '../common/Button'
import icons from '../constants/goalIcons'
import { COLORS, FONTSIZES } from '../constants/theme'
import { useRouter } from 'expo-router'
import { Dimensions } from 'react-native'
import { useState } from 'react'
import client from '../api/client';

function goals () {
  const goals = ["Fitness", "Diet", "Lifestyle", "Productivity", "Self-Care", "Hobby", "Wellness", "Finance"]
  const goalIcons = [icons.fitness, icons.diet, icons.lifestyle, icons.productivity, icons.selfCare, icons.hobby, icons.wellness, icons.finance]
  const router = useRouter()
  const [chosenGoal, setChosenGoal] = useState("");

  const onSubmitFormHandler = async (e)=>{
    const res = await client.post('/addPreference', {
      email: "jenna@gmail.com",
      pref: chosenGoal,
    });
    if (res.data.success) {
      router.push("/experience");
    }
  }
  
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>What kind of goals are you interested in?</Text>
        <View style={styles.optionWrapper}>
          <FlatList
            data={goals}
            renderItem={({ item, index }) => (
              <TouchableOpacity 
                style={styles.optionCard(index, chosenGoal, item)}
                onPress={() => {
                  setChosenGoal(item)
                }}
              >
                <Text >{item}</Text>
                <Image
                  source={goalIcons[index]}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </View>
        <Button
          title="Continue"
          onPress={onSubmitFormHandler}
        />
      </View>
    )
}

const colors = ["#DDF3FC", "#FCD4D4", "#FFF5C5", "#D7FAE3", "#E3DAFA", "#FFE8C5", "#FFCBDA", "#D0F0F2"]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20
  },
  heading: {
    marginTop: 40,
    fontSize: FONTSIZES.heading3,
    fontWeight: 'bold',
    marginBottom: 24
  },
  optionWrapper: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  optionCard: (index, chosenGoal, item) => ({
    flexDirection: 'row',
    backgroundColor: colors[index],
    borderRadius: 8,
    flexBasis: '50%',
    height: 60, //temp, should be 80,
    marginBottom: 4,
    // width: Dimensions.get('window').width / 2.5,
    paddingLeft: 16,
    paddingRight: 8,
    justifyContent: "space-between",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: chosenGoal === item ? COLORS.accent : COLORS.background
  })
})

export default goals