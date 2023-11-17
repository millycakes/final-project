import { FlatList, Text, View, Image,TouchableOpacity, StyleSheet } from 'react-native'
import Button from '../common/Button'
import icons from '../constants/goalIcons'
import { COLORS, FONTSIZES } from '../constants/theme'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { globalStyles } from '../styles/global'

//TODO: make it so that user can choose multiple goals

function goals () {
  const goals = ["Fitness", "Diet", "Lifestyle", "Productivity", "Self-Care", "Hobby", "Wellness", "Finance"]
  const goalIcons = [icons.fitness, icons.diet, icons.lifestyle, icons.productivity, icons.selfCare, icons.hobby, icons.wellness, icons.finance]
  const router = useRouter()
  const [chosenGoal, setChosenGoal] = useState("");

  const onSubmitFormHandler = async (e)=>{
    router.push({pathname: "/experience", params: {goals: chosenGoal}});
  }
  
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.heading3}>What kind of goals are you interested in?</Text>
        <FlatList
          data={goals}
          horizontal={false}
          numColumns={2}
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
        <Button
          title="Continue"
          onPress={onSubmitFormHandler}
        />
      </View>
    )
}

const colors = ["#DDF3FC", "#FCD4D4", "#FFF5C5", "#D7FAE3", "#E3DAFA", "#FFE8C5", "#FFCBDA", "#D0F0F2"]

const styles = StyleSheet.create({
  optionCard: (index, chosenGoal, item) => ({
    flexDirection: 'row',
    backgroundColor: colors[index],
    borderRadius: 8,
    width: '50%',
    height: 80,
    paddingLeft: 16,
    paddingRight: 8,
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: chosenGoal === item ? COLORS.accent : COLORS.background
  })
})

export default goals