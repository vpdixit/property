import React, {useState, useRef,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity,BackHandler } from 'react-native';
import { Card,Input,Button,ListItem,Avatar,Icon  } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useNavigation  } from '@react-navigation/native';

export default function Logout(props) {

  const navigation = useNavigation();

   const handleLogout = async () => {
   	try {
        await AsyncStorage.removeItem("user");
        navigation.navigate("Login");
        return true;
    }
    catch(exception) {
        return false;
    }
   }

	return (
        <Text style={{ padding: 10, marginRight: 20 }}>{ props.name ? props.name : "" } {'  '}
	   		<Icon
	        name='logout'
	        type='SimpleLineIcons'
	        size={18}
	        style={{transform: [{rotateY: '180deg'}]}}
	        onPress={handleLogout} />
	        </Text>
		);
}