import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

const StarterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.footer} >
        <Text style={styles.title}>
          Your goods are in safe hands 
        </Text>
        <Button 
            mode="outlined" 
            color="#0B92EC"
            onPress={() => navigation.navigate("LoginScreen")}
            style={styles.button}
          >
            Let's Start
          </Button>
      </View>
    </View>
  )
}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#0B92EC'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent:'center',
    paddingVertical: 50,
    paddingHorizontal: 20
  },
  logo:{
    width: height_logo,
    height: height_logo,
    borderRadius:height_logo / 2,
  },
  title: {
    fontSize: 20,
    lineHeight: 21,
    textAlign: 'center',
    fontWeight: "bold",
    marginBottom: 12,
    color:'#666'
  },
  button: {
    width:'100%',
    height: 60,
    marginTop: 20,
    justifyContent: "center",
    borderRadius: 30,
    marginTop:30,
    margin:'1%'
  },

})

export default StarterScreen