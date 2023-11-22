import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { globalStyles } from '../../styles/global'

const store = () => {
  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={globalStyles.container}>
        <Text>store</Text>
      </View>
    </SafeAreaView>
  )
}

export default store