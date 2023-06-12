import React, {useState, useRef,useEffect  } from 'react';
import { StyleSheet, Text, View,SafeAreaView,Image,TextInput } from 'react-native';


export default function DetailList(props) {
	return (
      <View style={{flexDirection: 'row',marginTop: 10, paddingLeft: 10,paddingRight: 10}}>
        <View style={{flex: 2}} >
          <View><Text style={{ color: "#232323" }}>{props.name}</Text></View>
        </View>
        <View style={{flex: 1}} >
          <View><Text style={{ color: "#232323" }}>{props.val}</Text></View>
        </View>
      </View>
		);
}