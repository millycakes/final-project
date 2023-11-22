import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { globalStyles } from '../../styles/global'

const profile = () => {
  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={globalStyles.container}>
        <Text>profile</Text>
      </View>
    </SafeAreaView>
  )
}

export default profile