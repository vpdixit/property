import React, {useState, useRef,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity,BackHandler } from 'react-native';
import { Card,Input,Button,ListItem,Avatar,Icon  } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logout from '../../Components/Logout';

export default function Dashboard(props) {

  const [name, setName] = useState('');
   AsyncStorage.getItem('user', (err, result) => {
      let _jsn = JSON.parse(result);
      if(_jsn){
          if(_jsn.name){
            setName(_jsn.name);
          }
        }
        });

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Image source={require('../../../assets/logo.png')} style={{ width: 80, height: 40, resizeMode: 'contain'}} />

     <Text style={{color: "#000", justifyContent: "center"}}>
       <Logout name={name} />
       </Text>
      </View>

      <Card style={styles.card}>
          <Card.Title style={ styles.cardTitle }> Dashboard</Card.Title>
    
          <Card.Divider />
<>

    <TouchableOpacity onPress={() => props.navigation.push('Barcode',{screen:'BarcodeScan',name:'assign'})}>
  <ListItem bottomDivider style={{ alignItems: "space-between" }}>
       <Icon
       reverse
        name='assignment'
        type='material'
        color='#517fa4'
      />
    <ListItem.Content>
      <ListItem.Title>Assign Item</ListItem.Title>
    </ListItem.Content>
   
  </ListItem>
      </TouchableOpacity>


    <TouchableOpacity onPress={() => props.navigation.push('Barcode',{screen:'BarcodeScan',name:'return'})}>
  <ListItem bottomDivider style={{ alignItems: "space-between" }}>
      <Icon
       reverse
        name='assignment-return'
        type='material'
        color='#517fa4'
      />
    <ListItem.Content>
      <ListItem.Title>Return Item</ListItem.Title>
    </ListItem.Content>

  </ListItem>

      </TouchableOpacity>

    <TouchableOpacity onPress={() => props.navigation.push('Barcode',{screen:'BarcodeScan',name:'details'})}>
  <ListItem style={{ alignItems: "space-between" }}>    
  <Icon
       reverse
        name='filter-list'
        type='MaterialIcons'
        color='#517fa4'
      />
    <ListItem.Content>
      <ListItem.Title>View Details</ListItem.Title>
    </ListItem.Content>

  </ListItem>
      </TouchableOpacity>

</>
      </Card>

      <View style={styles.header}>
        <Text>Footer</Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header:{
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: 'space-between',
    color: "#000",
    padding: 10,
    alignItems: "center"
  }
});