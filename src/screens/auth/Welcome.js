import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

const Welcome = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={{backgroundColor:'orange',flex:1,justifyContent:'space-between'}}>
               <View style={{justifyContent:'space-between'}}>

              
              <View style={styles.textContainerSignin}>
          <Text style={styles.textHukuk}>Hukuk</Text>
          <Text style={styles.textChat}>Chat</Text>

        </View>
  
      <Text style={{color:'white', fontSize:22,marginHorizontal:10,marginTop:22}}>Hukuk alanında yapay zekanın sunduğu avantajları keşfetmek için aşağı kaydırın ve hemen deneyin!</Text>
      <View style={{alignItems:'center',marginTop:22}}>
      <TouchableOpacity
      onPress={() => {
        navigation.navigate('Login')
      }}
      style={{backgroundColor:'white',height:75,width:300,justifyContent:'center',alignItems:'center',borderRadius:12,marginTop:22}}>
               <Text style={{color:'orange',fontSize:22}}>
                              Başlayalım ->
               </Text>

      </TouchableOpacity>
      </View>
      </View>
      <View style={{justifyContent:'center',alignItems:'center',marginBottom:25}}>
               <Text style={{color:'white',fontSize:18}}>
                              Bizi daha yakından tanıyın!
               </Text>
      </View>
    </SafeAreaView>
  )
}

export default Welcome

const styles = StyleSheet.create({

               textChat:{fontWeight:'700',fontSize:65,color:'white',marginLeft:100},
               textHukuk:{fontWeight:'700',fontSize:65,color:'black'},
               textContainerSignin:{marginTop:50,marginLeft:30},

})
