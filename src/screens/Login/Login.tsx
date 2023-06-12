import React, {useState, useRef,useEffect } from 'react';
import { StyleSheet, Text, View,SafeAreaView,Image,Alert  } from 'react-native';
import { Card,Input,Button  } from '@rneui/themed';
import {post} from '../../api';
import {login_url, token} from '../../host';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Login({navigation}) {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

   useEffect(() => {
     AsyncStorage.getItem('user', (err, result) => {
      let _jsn = JSON.parse(result);
          if(_jsn){
            if(_jsn.id){
            navigation.push('Dashboard');
          }
        }
        });
  }, []);
   



// handle submit
   const handleSubmitPress = () => {

var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;


    if(userEmail==""){
      setErrortext("Email is required");
    }
    else if(userPassword==""){
      setErrortext("Password is required");
    }
    else if(userEmail.match(mailformat) ==null){
      setErrortext("Invalid email");
    }
    else{
      setErrortext("");
      let formData = new FormData();
      formData.append('email', userEmail);
      formData.append('password', userPassword);

      // let dataToSend = {email: userEmail, password: userPassword};

      post(login_url, formData, response => {
        let _resp = response;
        console.log(_resp);
        if(_resp.code==0){
          AsyncStorage.setItem("user", JSON.stringify(_resp.result));
          navigation.push('Dashboard');
        }
        else{
          setErrortext(_resp.message);
        }
      });

    }
   }

// /handle submit

  return (
    <View style={styles.container}>

    <Card>
        <View style={{ alignItems: "center", }}>
        <Image source={require('../../../assets/logo.png')} style={{ width: 120, height: 60, resizeMode: 'contain'}} />
        </View>
          {/*<Card.Title style={ styles.cardTitle }>    <Image source={require('./logo.png')} /></Card.Title>*/}
          {/*<Card.Divider />*/}
          <View>
      <Text style={styles.error}>{errortext}</Text>
            <Input
      placeholder='Email'
      inputStyle={styles.input}
      onChangeText={(UserEmail) => 
      setUserEmail(UserEmail)
    }
      leftIcon={{ type: 'font-awesome', name: 'user'}}
    />
             <Input
      placeholder='Password'
      secureTextEntry={true}
      inputStyle={styles.input}
      onChangeText={(userPassword) => setUserPassword(userPassword) }
      leftIcon={{ type: 'font-awesome', name: 'key' }}
    />

      <Button onPress={handleSubmitPress}>Log In</Button>
          </View>
        </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input:{
    padding: 10,
    fontSize: 14
  },
  item: {
  aspectRatio: 1,
  width: '100%',
  flex: 1,
},
cardTitle:{
  paddingBottom: 20
},
error:{
  color: "red",
  textAlign: "center"
},
});