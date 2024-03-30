import React from 'react'
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { orangeColor } from '../../statics/color'

const Welcome = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainerSignin}>
          <Image
            style={styles.logo}
            source={require('../../icons/1.png')}
          />
        </View>

        <Text style={styles.subtitle}>
          Hukuk alanında yapay zekanın sunduğu avantajları keşfetmek için hadi başlayalım!
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.button}>
            <Text style={styles.buttonText}>Başlayalım -{'>'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Bizi daha yakından tanıyın!</Text>
      </View>
    </SafeAreaView>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: orangeColor,
    justifyContent: 'space-between',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  logo: {
    height: 225,
    width: 325,
  },
  textContainerSignin: {
    marginTop: 50,
  },
  subtitle: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    marginHorizontal: 10,
    marginTop: 22,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 22,
  },
  button: {
    backgroundColor: 'white',
    height: 75,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    color: orangeColor,
    fontSize: 22,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  footerText: {
    color: 'white',
    fontSize: 18,
  },
})
