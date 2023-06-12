
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

import {Button  } from '@rneui/themed';
import { View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function BarcodeScan({navigation,route}){
  onSuccess = e => {
    if(route.params.name=="assign"){
      navigation.navigate('AssignItemForm', {barcode: e.data});
    }
    if(route.params.name=="return"){
      navigation.navigate('ReturnItemForm', {barcode: e.data});
    }
    if(route.params.name=="details"){
      navigation.navigate('ViewDetail', {barcode: e.data});
    }
  };

    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        topContent={
          <Text style={styles.centerText}>
            <Text style={styles.textBold}>Scan QR or Barcode</Text> 
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>It may take few seconds.</Text>
            <View style={{ marginTop: 10 }}>
            <Button onPress={() => navigation.push('Dashboard')} >Go Back</Button>
            </View>
          </TouchableOpacity>
        }
      />
    );
  }

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: '#000'
  },
  buttonTouchable: {
    padding: 16,
    marginTop: 30
  }
});
