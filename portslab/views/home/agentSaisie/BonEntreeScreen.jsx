import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, {useState, useCallback} from 'react'
import { Button, Colors} from 'react-native-paper';
import axios from 'axios'
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";
import { API } from './../../../configs';

const BonEntreeScreen = ({ navigation }) => {

  const [data, setData] = useState([])

  const route = useRoute();
  const toast = useToast()
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
    await axios.get(`${API}/bonentrees/get`)
    .then((result) => {
      if(result.data.success){
        setData(result.data.bonEntrees)
      }
    })
  }

  const handleDelete = async (id) => {
    await axios.delete(`${API}/bonentrees/remove/${id}`)
    .then((response) => {
      if(response.data.success) {
        toast.show(response.data.message, {
          type: "normal",
          placement:"bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in"
        })
        FetchAPI()
      }else{
        toast.show(response.data.message, {
          type: "normal",
          placement:"bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in"
        })
      }
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ 
        flexGrow:1,
      }}>
        <View style= {styles.container}>
          <View style={styles.header}>
            <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold', lineHeight:80}}>
                Bons Entrées
            </Text>
            <Image 
              source={require('./../../../assets/logo.png')}  
              style={{width:60, height:60, borderRadius:30, marginTop:20}}
            />
          </View>
          <View style={styles.main} >
            <View style={styles.cardView}>
               {
                data.map((item, index) => (
                  <TouchableOpacity 
                    key={index}
                    style={styles.card} 
                  >
                <View style={styles.cardcontent}>
                  <Image style={styles.cardimage} source={require('./../../../assets/bonentree.jpg')} />
                </View>

                    <View style={styles.cardDetails}>
                      <Text style={{ fontSize:15, color:'#333', marginBottom:5}}>Import Id : {item.TradeId}</Text>
                      <Text style={{ fontSize:15, color:'#333', marginBottom:5}}>tonnage Entrée: {item.tonnageEntree} Ton</Text>
                      <Text style={{ fontSize:15, color:'#333', marginBottom:5}}>Tonnage Restant: {item.tonnageRestant} Ton</Text>
                      <Text style={{ fontSize:15, color:'#333', marginBottom:5}}>Date limite d'entrée : {item.dateLimiteEntree}</Text>
                      <Text style={{ fontSize:15, color:'#333', marginBottom:5}}>Tonnage à entrée : {item.tonnageAEntree} Ton</Text>
                      {
                        /*<Button icon="information-outline" mode="text" compact={true} color={Colors.green500} onPress={() => navigation.navigate('InfoViewer',{id:item.TradeId})}
                      >
                        Detail
                      </Button>*/
                      }
                    </View>
                    <View style={styles.cardaction}>

                      <Button icon="tooltip-edit-outline" mode="text" compact={true} color={Colors.blue500} onPress={() => navigation.navigate('BonEntreeForm', {action:'Edit', id: item._id})}>
                        Modifier
                      </Button>
                      <Button icon="delete-outline" mode="text" compact={true} color={Colors.red500} onPress={() => handleDelete(item._id)}>
                        Supprimer
                      </Button>

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
    width:"100%",
    height:150,
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

export default BonEntreeScreen