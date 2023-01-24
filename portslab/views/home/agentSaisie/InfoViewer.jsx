import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, {useState, useCallback} from 'react'
import {Ionicons, AntDesign, FontAwesome} from 'react-native-vector-icons';
import { Colors } from 'react-native-paper';
import axios from 'axios'
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { API } from './../../../configs';

const InfoViewer = ({ navigation }) => {

  const [ships, setShips] = useState([])

  const [clients, setClients] = useState([])

  const [item, setItem] = useState({})

  const route = useRoute();

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

    await axios.get(`${API}/trades/get/${route.params.id}`)
    .then((response) => {
      if(response.data.success){
        setItem(response.data.trade)
      }
    })

  }

  return (
    <View style= {styles.container}>
      <TouchableOpacity 
        style={styles.card} 
      >
        <View style={styles.cardcontent}>
          <Image style={styles.cardimage} source={require('./../../../assets/imports.jpg')} />
          <View style={styles.carddetails}>
        
            <View 
              style={{ 
                flexDirection: "row", 
                marginLeft:20,
                alignItems:'center',
                marginVertical:5
              }}
            >
              <Ionicons 
                name="person-outline" 
                color={Colors.black500} 
                size={15}
              />
              <Text style={{fontSize:20, fontWeight:'bold', color: Colors.black500, marginLeft:5} }>
                {
                  clients.map((client) => (
                    item.clientId === client._id ? client.companie : ''
                  ))
                  
                }
              </Text>
            </View>

            <View 
              style={{ 
                flexDirection: "row", 
                marginLeft:20,
                alignItems:'center',
                marginTop:10 
              }}
            >
              <FontAwesome 
                name="ship" 
                color="gray" 
                size={15}
              />
              <Text 
                style={{
                  color:"gray", 
                  marginLeft:5
                }}
              >
                {
                  ships.map((ship) => (
                    item.shipId === ship._id ? ship.nom : ''
                  ))
                }
              </Text>
            </View>

            <View 
              style={{ 
                flexDirection: "row", 
                marginLeft:20,
                alignItems:'center',
                marginTop:10 
              }}
            >
              <AntDesign 
                name="rest" 
                color="gray" 
                size={15}
              />
              <Text 
                style={{
                  color:"gray", 
                  marginLeft:5
                }}
              >
                { item.escale}
              </Text>
            </View>

            <View 
              style={{ 
                flexDirection: "row", 
                marginLeft:20,
                alignItems:'center',
                marginTop:10 
              }}
            >
              <Ionicons 
                name="time-outline" 
                color="gray" 
                size={15}
              />
              <Text 
                style={{
                  color:"gray", 
                  marginLeft:5
                }}
              >
                { new Date(item.createdAt).toLocaleDateString()+' '+new Date(item.createdAt).toLocaleTimeString()}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.cardDetails}>
          <Text style={{ fontSize:15, color:'#333', marginBottom:5}}>Designation : {item.designation}</Text>
          <Text style={{ fontSize:15, color:'#333', marginBottom:5}}>tonnage Total: {item.tonnageTotal} Ton</Text>
          <Text style={{ fontSize:15, color:'#333', marginBottom:5}}>Pays Départ: {item.countryDepart}</Text>
          <Text style={{ fontSize:15, color:'#333', marginBottom:5}}>Pays Destination : {item.countryDestination}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    backgroundColor: '#0B92EC',
    
  },
  card:{
    marginHorizontal:20,
    marginVertical:5,
    backgroundColor:'#FFF',
    minHeight:100,
    padding:15,
    borderRadius:10,
    borderWidth: 1, 
    borderColor:"#dadada"
  },
  cardcontent:{
    flexDirection:'row',
    alignItems: 'center'
  },
  cardDetails:{
    flex:1,
    marginVertical:10
  },
  cardimage:{
    width:100,
    height:100,
    borderRadius:10
  },
  carddetails:{
    flex:1,
  }
})

export default InfoViewer