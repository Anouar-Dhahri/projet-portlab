import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState, useCallback } from 'react';
import { TextInput, Button, Text } from 'react-native-paper'
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
import {API} from '../../../configs';
import { countryList } from '../../../data';

const ExportFormScreen = ({ navigation }) => {

  const [ships, setShips] = useState([])

  const [clients, setClients] = useState([])

  const [clientId, setClientId] = useState('')
  const [shipId, setShipId] = useState('')
  const [escale, setEscale] = useState('')
  const [designation, setDesignation] = useState('')
  const [tonnageTotal, setTonnageTotal] = useState('')
  const [countryDepart, setCountryDepart] = useState('')
  const [countryDestination, setCountryDestination] = useState('')

  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const route = useRoute();

  const action = route.params.action;

  useFocusEffect(
    useCallback(() => {
      FetchAPI()
      return () => {
        console.log('Screen was unfocused');
        // Useful for cleanup functions
      };
    }, [])
  );

  const FetchAPI = async () => {
    await axios.get(`${API}/ships/get`)
    .then((response) => {
      if(response.data.success) {
        setShips(response.data.ships)
      }
    })

    await axios.get(`${API}/clients/get`)
    .then((response) => {
      if(response.data.success) {
        setClients(response.data.clients)
      }
    })
  }

  const handleSubmit = async () => {
    setLoading(true)
    if(!clientId || !shipId || !escale || !designation || !tonnageTotal || !countryDepart || !countryDestination) {
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
          await axios.post(`${API}/trades/create`, {
            clientId:clientId, 
            shipId:shipId,
            escale: escale, 
            designation: designation, 
            tonnageTotal:tonnageTotal, 
            countryDepart:countryDepart, 
            countryDestination: countryDestination, 
            type:'Export'
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
              setClientId("");
              setShipId("");
              setEscale("")
              setDesignation('');
              setTonnageTotal("")
              setCountryDepart("")
              setCountryDestination("");
              navigation.navigate("Exports");
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
          await axios.put(`${API}/trades/update/${route.params.id}`, {
            clientId:clientId, 
            shipId:shipId,
            escale: escale, 
            designation: designation, 
            tonnageTotal:tonnageTotal, 
            countryDepart:countryDepart, 
            countryDestination: countryDestination, 
            type:'Export'
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
              setClientId("");
              setShipId("");
              setEscale("")
              setDesignation('');
              setTonnageTotal("")
              setCountryDepart("")
              setCountryDestination("");
              navigation.navigate("Exports");
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
                { action === 'create' ? ' Ajouter Nouveau Export' : 'Modifier Export'}
            </Text>
            <Image 
              source={require('./../../../assets/logo.png')}  
              style={{width:60, height:60, borderRadius:30, marginTop:20}}
            />
          </View>
          <View style={styles.main} >
            <View style={styles.inputView}>

              <SelectDropdown
                data={clients}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                  setClientId(selectedItem._id)
                  console.log("clientId ==>", clientId )
                }}
                defaultButtonText={'Select Client'}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem._id
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item.companie
                }}

                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                  return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
              />

              <SelectDropdown
                data={ships}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                  setShipId(selectedItem._id)
                }}
                defaultButtonText={'Select Bateau'}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem._id
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item.nom
                }}

                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                  return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
              />

              <TextInput
                style={styles.input}
                activeOutlineColor="#1687FF"
                mode="outlined"
                label="Designation"
                value={designation}
                onChangeText={text => setDesignation(text)}
              />

              <TextInput
                style={styles.input}
                activeOutlineColor="#1687FF"
                mode="outlined"
                label="Tonnage Total"
                value={tonnageTotal}
                onChangeText={text => setTonnageTotal(text)}
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                activeOutlineColor="#1687FF"
                mode="outlined"
                label="Escale"
                value={escale}
                onChangeText={text => setEscale(text)}
              />

              <SelectDropdown
                data={countryList}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                  setCountryDepart(selectedItem)
                }}
                defaultButtonText={'Select Pays Depart'}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item
                }}

                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                  return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
              />

              <SelectDropdown
                data={countryList}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                  setCountryDestination(selectedItem)
                }}
                defaultButtonText={'Select Pays Déstination'}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item
                }}

                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                  return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
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
  dropdown1BtnStyle: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#555',
    marginBottom: 10,
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  button: {
    height: 60,
    marginTop: 20,
    justifyContent: "center",
    borderRadius: 30,
    marginTop:10,
    margin:'1%'
  },
})

export default ExportFormScreen