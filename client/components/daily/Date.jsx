import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import moment from 'moment'
import { globalStyles } from '../../styles/global'
import { COLORS } from '../../constants/theme'

const Date = ({ date, onSelectDate, selected }) => {

  // const day = moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ? 'Today' : moment(date).format('ddd')
  const day = moment(date).format('ddd')
  const dayNumber = moment(date).format('D')
  const fullDate = moment(date).format('YYYY-MM-DD')
  return (
    <TouchableOpacity
      onPress={() => onSelectDate(fullDate)}
      style={styles.card}
    >  
      <View style={styles.date(selected, fullDate)}>
        <Text style={[globalStyles.heading6, selected === fullDate && { color: "#fff" }]}>{dayNumber}</Text>
      </View>
      <Text style={styles.day}>{day}</Text>
    </TouchableOpacity>
  )
}

export default Date

const styles = StyleSheet.create({
  card: {
    alignItems: 'center'
  },
  date: (selected, fullDate) =>({
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: selected === fullDate ? COLORS.accent : COLORS.gray100,
    borderRadius: 32,
    marginBottom: 8
  }),
  day: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '600',
    color: COLORS.gray500
  },
})