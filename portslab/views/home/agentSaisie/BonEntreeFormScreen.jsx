import { View, StyleSheet, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { TextInput, Button, Text } from 'react-native-paper'
import { useRoute } from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";
import axios from 'axios'
import {API} from '../../../configs';
import DateTimePicker from '@react-native-community/datetimepicker';

const BonEntreeFormScreen = ({ navigation }) => {

  const [tonnageEntree, setTonnageEntree] = useState('')
  const [tonnageRestant, setTonnageRestant] = useState('')
  const [dateLimiteEntree, setDateLimiteEntree] = useState('')
  const [tonnageAEntree, setTonnageAEntree] = useState('')

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const route = useRoute();

  const action = route.params.action;


  const onChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    setDateLimiteEntree(new Date(selectedDate).toLocaleDateString());
  };

  const handleSubmit = async () => {
    setLoading(true)
    if(!tonnageEntree || !tonnageRestant || !dateLimiteEntree || !tonnageAEntree) {
      toast.show("All Field required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }else {
      try {
        if(action === 'create') {
          await axios.post(`${API}/bonentrees/create`, {
            TradeId:route.params.id, 
            tonnageEntree: tonnageEntree, 
            tonnageRestant: tonnageRestant, 
            dateLimiteEntree:dateLimiteEntree, 
            tonnageAEntree:tonnageAEntree
          }).then((response) => {
            if(response.data.success) {
              toast.show(response.data.message, {
                type: "normal",
                placement:"bottom",
                duration: 4000,
                offset: 30,
                animationType: "zoom-in"
              })
              setLoading(false);
              setTonnageEntree('')
              setTonnageRestant('')
              setDateLimiteEntree('')
              setTonnageAEntree('')
              navigation.navigate("Bon Entree");
            }else {
              toast.show(response.data.message, {
                type: "warning",
                placement:"bottom",
                duration: 4000,
                offset: 30,
                animationType: "zoom-in"
              });
              setLoading(false);
            }
          })
        }else {
          await axios.put(`${API}/bonentrees/update/${route.params.id}`, {
            tonnageEntree: tonnageEntree, 
            tonnageRestant: tonnageRestant, 
            dateLimiteEntree:dateLimiteEntree, 
            tonnageAEntree:tonnageAEntree
          }).then((response) => {
            if(response.data.success) {
              toast.show(response.data.message, {
                type: "normal",
                placement:"bottom",
                duration: 4000,
                offset: 30,
                animationType: "zoom-in"
              })
              setLoading(false);
              setTonnageEntree('')
              setTonnageRestant('')
              setDateLimiteEntree('')
              setTonnageAEntree('')
              navigation.navigate("Bon Entree");
            }else {
              toast.show(response.data.message, {
                type: "warning",
                placement:"bottom",
                duration: 4000,
                offset: 30,
                animationType: "zoom-in"
              });
              setLoading(false);
            }
          })
        }
      } catch (error) {
        toast.show(error, {
          type: "warning",
          placement:"bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in"
        })
        setLoading(false);
      }
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ 
        flexGrow:1,
      }}>
        <View style= {styles.container}>
          <View style={styles.header}>
            <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold', lineHeight:80}}>
                { action === 'create' ? ' Ajouter Nouveau Bon Entree' : 'Modifier Bon Entree'}
            </Text>
            <Image 
              source={require('./../../../assets/logo.png')}  
              style={{width:60, height:60, borderRadius:30, marginTop:20}}
            />
          </View>
          <View style={styles.main} >
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                activeOutlineColor="#1687FF"
                mode="outlined"
                label="Tonnage Entree"
                value={tonnageEntree}
                onChangeText={text => setTonnageEntree(text)}
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                activeOutlineColor="#1687FF"
                mode="outlined"
                label="Tonnage Restant"
                value={tonnageRestant}
                onChangeText={text => setTonnageRestant(text)}
                keyboardType="numeric"
              />

              <Button 
                mode="text" 
                icon="calendar"
                compact={false} 
                color="#1687FF"
                onPress={() => setShow(true)}
                style={styles.button}
              >
                Date Limite Entree
              </Button>

              {
                show && 
                  <DateTimePicker
                    value={new Date()}
                    onChange={onChange}
                    mode={'date'}
                  />
              }


              <TextInput
                style={styles.input}
                activeOutlineColor="#1687FF"
                mode="outlined"
                label="Tonnage A Entree"
                value={tonnageAEntree}
                onChangeText={text => setTonnageAEntree(text)}
                keyboardType="numeric"
              />

            </View>
            <Button 
              mode="contained" 
              loading={loading}
              compact={false} 
              color="#1687FF"
              onPress={handleSubmit}
              style={styles.button}
            >
              Submit
            </Button>
          </View>
        </View>
      </ScrollView>
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
    height:80,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  main: {
    flex: 1,
    borderTopLeftRadius: 30,
    backgroundColor:"#fff",
    borderTopRightRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  inputView:{
    marginTop:10
  },
  input:{
    marginBottom:10,
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

export default BonEntreeFormScreen