import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import moment from 'moment'
import Date from './Date'
import { ChevronLeft, ChevronRight } from 'react-native-feather'
import { COLORS } from '../../constants/theme'
import { globalStyles } from '../../styles/global'
import icons from '../../constants/icons'

//TODO: make chevron buttons functional

const Calendar = ({ onSelectDate, selected }) => {
  const [dates, setDates] = useState([])

  const getDates = () => {
    const _dates = []
    for (let i = 0; i < 7; i++) {
      const date = moment().add(i, 'days')
      _dates.push(date)
    }
    setDates(_dates)
  }
  
  const formatDate = (date) => {
    return moment(date).format('M/D')
  }

  useEffect(() => {
    getDates()
  }, [])

  return (
    <View style={styles.calendar}>
      <View style={styles.dateController}>
        <View style={styles.dateRange}>
          <ChevronLeft width={20} height={20} stroke={COLORS.gray700} />
          <Text style={[globalStyles.heading5, {color: COLORS.gray700}]}>{`${formatDate(dates[0])} - ${formatDate(dates[6])}`}</Text>
          <ChevronRight width={20} height={20} stroke={COLORS.gray700} />
        </View>
        <TouchableOpacity 
          style={styles.chip}
          onPress={() => onSelectDate(moment().format('YYYY-MM-DD'))}
        >
          <Image source={icons.triangle} />
          <Text style={styles.chipText}>Today</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dates}>
          {dates.map((date, index) => (
            <Date
              key={index}
              date={date}
              onSelectDate={onSelectDate}
              selected={selected}
            />
          ))}
      </View>
    </View>
  )
}

export default Calendar

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 36
  },
  dateController: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  dateRange: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center'

  },
  chip: {
    backgroundColor: COLORS.accentLight,
    padding: 8,
    borderRadius: 32,
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center'
  },
  chipText: {
    color: COLORS.accent,
    fontWeight: 'bold'
  },
  dates: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})