import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useCallback } from 'react'
import axios from 'axios'
import { Colors} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { API } from './../../../configs';

const HomeScreen = ({ navigation }) => {

  const [imports, setImports] = useState(0)
  const [exports, setExports] = useState(0)

  useFocusEffect(
    useCallback(() => {
      fetchAPI()
      return () => {
        console.log('Screen was unfocused');
        // Useful for cleanup functions
      };
    }, [])
  );

  const fetchAPI = async () => {
    await axios.get(`${API}/data/counter`)
    .then((result) => {
      if(result.data.success){
        setImports(result.data.imports)
        setExports(result.data.exports)
      }
    })
  }
  
  return (
    <View style= {styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold', lineHeight:80}}>
            Home
        </Text>
        <Image 
          source={require('./../../../assets/logo.png')}  
          style={{width:60, height:60, borderRadius:30, marginTop:20}}
        />
      </View>
      <View style={styles.main} >
        <View style={styles.cardView}>
          <TouchableOpacity 
            style={styles.card} 
          >
            <Image source={require('./../../../assets/imports.jpg')} style={{width:"60%",height:200, borderRadius:30}}/>
            <View style={{ flex:1, justifyContent:'center', marginLeft:20, alignItems:'center'}}>
              <Text style={{ fontSize:20, fontWeight:'bold',marginVertical:5, color:Colors.purple500}}>IMPORTS </Text>
              <Text style={{ fontSize:20, fontWeight:'bold',marginVertical:5, color:Colors.purple500}}>{imports} </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card} 
          >
            <Image source={require('./../../../assets/exports.jpg')} style={{width:"60%",height:200, borderRadius:30}}/>
            <View style={{ flex:1, justifyContent:'center', marginLeft:20, alignItems:'center'}}>
              <Text style={{ fontSize:20, fontWeight:'bold',marginVertical:5, color:Colors.green500}}>EXPORTS </Text>
              <Text style={{ fontSize:20, fontWeight:'bold',marginVertical:5, color:Colors.green500}}>{exports} </Text>
            </View>
          </TouchableOpacity>
        </View>
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
    flexDirection:'row',
    marginVertical:10,
    backgroundColor:'#FFF',
    padding:15,
    borderRadius:10,
    borderWidth:1,
    borderColor:"#dadada"
  },
})

export default HomeScreen