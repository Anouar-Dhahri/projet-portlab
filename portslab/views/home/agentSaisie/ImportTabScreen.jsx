import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, {useState, useCallback} from 'react'
import {Ionicons, AntDesign, FontAwesome} from 'react-native-vector-icons';
import { Searchbar, Colors} from 'react-native-paper';
import axios from 'axios'
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { API } from './../../../configs';

const ImportTabScreen = ({ navigation }) => {

  const [ships, setShips] = useState([])

  const [clients, setClients] = useState([])

  const [trades, setTrades] = useState([])
  const [backup, setBackup] = useState([])
  const [searchQuery, setSearchQuery] = useState('');

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
    await axios.get(`${API}/trades/get`)
    .then((result) => {
      if(result.data.success){
        setTrades(result.data.imports)
        setBackup(result.data.imports)
      }
    })

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

  const onChangeSearch = (text) => {
    const query = backup.filter((item) => {
      const item_data = `${item.nom.toUpperCase()}`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    setSearchQuery(text);
    setTrades(query);
    console.log(query);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ 
        flexGrow:1,
      }}>
        <View style= {styles.container}>
          <View style={styles.header}>
            <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold', lineHeight:80}}>
                Imports
            </Text>
            <Image 
              source={require('./../../../assets/logo.png')}  
              style={{width:60, height:60, borderRadius:30, marginTop:20}}
            />
          </View>
          <View style={styles.main} >
            <View style={styles.cardView}>
               {
                trades.map((trade, index) => (
                  <TouchableOpacity 
                    key={index}
                    style={styles.card} 
                    onPress={() => navigation.navigate('BonEntreeForm', {action:'create', id: trade._id})}
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
                                trade.clientId === client._id ? client.companie : ''
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
                                trade.shipId === ship._id ? ship.nom : ''
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
                            { trade.escale}
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
                            { new Date(trade.createdAt).toLocaleDateString()+' '+new Date(trade.createdAt).toLocaleTimeString()}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.cardDetails}>
                      <Text style={{ fontSize:15, color:'#333', marginBottom:5}}>Designation : {trade.designation}</Text>
                      <Text style={{ fontSize:15, color:'#333', marginBottom:5}}>tonnage Total: {trade.tonnageTotal} Ton</Text>
                      <Text style={{ fontSize:15, color:'#333', marginBottom:5}}>Pays Départ: {trade.countryDepart}</Text>
                      <Text style={{ fontSize:15, color:'#333', marginBottom:5}}>Pays Destination : {trade.countryDestination}</Text>
                    </View>
                  </TouchableOpacity>
                ))
               }
            </View>
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
  cardView:{
    marginTop:10
  },
  card:{
    width:'100%',
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
  },
  cardaction:{
    flexDirection:'row',
    marginTop:20
  },
})

export default ImportTabScreen