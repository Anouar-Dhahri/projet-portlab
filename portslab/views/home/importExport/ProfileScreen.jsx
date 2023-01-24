import { View, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button, Text } from 'react-native-paper'
import { useToast } from 'react-native-toast-notifications';
import { useRoute } from '@react-navigation/native';
import axios from 'axios'
import { API } from './../../../configs';

const ProfileScreen = ({ navigation }) => {

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const route = useRoute();

  const onSubmitPressed = async () => {
    setLoading(true)
    if(!nom || !prenom || !email|| !password ) {
      toast.show("All Field required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }else {
      await axios.put(`${API}/auth/profile/${route.params.user._id}`, {
        nom: nom,
        prenom:prenom,
        email: email,
        password:password,
      }).then((result) => {
        if(result.data.success) {
          toast.show(result.data.message, {
            type: "success",
            placement:"bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in"
          })
          setLoading(false);
          setNom("");
          setPrenom("");
          setEmail("");
          setPassword("")
          navigation.navigate("LoginScreen");
        }else {
          toast.show(result.data.message, {
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
    <ScrollView contentContainerStyle={{ 
      justifyContent: 'center' 
    }}>
      <View style= {styles.container}>
        <View style={styles.header}>
          
        </View>
        <View style={styles.main} >
          <View style={styles.mainHeader}>
            <Text style={{fontSize: 20, color: '#000', fontWeight: 'bold', lineHeight:80}}>
                Profile
            </Text>
            <Image 
              source={require('./../../../assets/logo.png')}  
              style={{width:80, height:80, borderRadius:40,}}
            />
          </View>

          <View style={styles.inputView}>

            <TextInput
              style={styles.input}
              activeOutlineColor="#1687FF"
              mode="outlined"
              label="Nom"
              value={nom}
              onChangeText={text => setNom(text)}
            />

            <TextInput
              style={styles.input}
              activeOutlineColor="#1687FF"
              mode="outlined"
              label="Prénom"
              value={prenom}
              onChangeText={text => setPrenom(text)}
            />

            <TextInput
              style={styles.input}
              activeOutlineColor="#1687FF"
              mode="outlined"
              label="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              activeOutlineColor="#1687FF"
              secureTextEntry={true} 
              mode="outlined"
              label="Password"
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <Button 
            mode="contained" 
            loading={loading}
            compact={false} 
            color="#1687FF"
            onPress={onSubmitPressed}
            style={styles.button}
          >
            Submit
          </Button>
        </View>
      </View>
    </ScrollView>
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
    height:50
  },
  main: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 20
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
  button: {
    height: 60,
    marginTop: 20,
    justifyContent: "center",
    borderRadius: 30,
    marginTop:10,
    margin:'1%'
  },
})

export default ProfileScreen