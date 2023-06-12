import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Colors} from '../styles';

export default function Splash({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('BlogsList')}
        style={{width: 100, height: 100, backgroundColor: 'red'}}
      />
    </View>
  );
}
