import { View, StyleSheet,Image } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button, Text } from 'react-native-paper'
import { useToast } from "react-native-toast-notifications";
import axios from 'axios'
import { API } from './../../configs';

const ForgotPasswordScreen = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const onResetPressed = async () => {
    setLoading(true)
    if(!email) {
      toast.show("Email is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
      return;
    }else {
      await axios.post(`${API}/auth/forgotpassword`, {
        email:email,
      }).then((response) => {
        if(response.data.success) {
          toast.show(response.data.message, {
            type: "success",
            placement:"bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in"
          })
          setLoading(false);
          setEmail("");
          navigation.navigate('LoginScreen')
        }else {
          toast.show(response.data.message, {
            type: "danger",
            placement:"bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in"
          })
          setLoading(false);
        }
      })
      
    }
  }

  return (
    <View style= {styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}></Text>
      </View>
      <View style={styles.main} >
        <View style={styles.mainHeader}>
          <Text style={{fontSize: 20, color: '#000', fontWeight: 'bold', lineHeight:80}}>
              Forgot Password ?
          </Text>
          <Image 
            source={require('./../../assets/logo.png')}  
            style={{width:80, height:80, borderRadius:40,}}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            activeOutlineColor="#1687FF"
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.forgotPassword}>
          <Text style={styles.forgot}>You will receive email with the password </Text>
        </View>
        <Button 
          mode="outlined" 
          loading={loading}
          compact={false} 
          color="#1687FF"
          onPress={onResetPressed}
          style={styles.button}
        >
          SEND
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#0B92EC'
  },
  header: {
    marginVertical: 20,
    marginHorizontal:20,
    width:'100%',
    height:100
  },
  title:{
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  main: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  mainHeader:{
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  inputView:{
    marginTop:50
  },
  input:{
    marginBottom:20,
  },
  forgotPassword: {
    alignItems:'center',
    marginBottom: 10,
  },
  forgot: {
    fontSize: 13,
    color: '#99A3A4',
  },
  button: {
    height: 60,
    marginTop: 20,
    justifyContent: "center",
    borderRadius: 30,
    marginTop:10,
    margin:'1%'
  },
  row: {
    flexDirection: 'row',
    justifyContent:'center',
    marginTop: 10,
  },
  link: {
    fontWeight: 'bold',
    color: '#CACFD2',
  },
})


export default ForgotPasswordScreen