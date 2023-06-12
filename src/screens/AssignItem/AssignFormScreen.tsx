import React, {useState, useRef,useEffect  } from 'react';
import { StyleSheet, Text, View,SafeAreaView,Image,TextInput,BackHandler,LogBox  } from 'react-native';
import { Card,Input,Button,Icon  } from '@rneui/themed';
import {post} from '../../api';
import {employees_list,assign_item_url} from '../../host';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Select2 from "react-native-select-two";
import Logout from '../../Components/Logout';

export default function AssignItemForm({navigation, route}) {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [loginUserId, setLoginUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [name, setName] = useState('');
  const [employees, changeEmployees] = React.useState([]);
 
  const [barcode, setBarcode] = useState('');
  const [barcodeVal, setBarcodeVal] = useState('');
  const [employee, setEmployee] = useState('');
  const [remarks, setRemarks] = useState('');
  const [isEmail, setIsEmail] = useState('');
  const [notifications, changeNotifications] = React.useState([]);

useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
}, [])

// on go back
   const onBackPress = (callback) => {
  BackHandler.addEventListener('hardwareBackPress', callback);
  return () => {
    BackHandler.removeEventListener('hardwareBackPress', callback);
  };
};

    function handleBackPress() {
    navigation.push('Dashboard',{screen:'Dashboard'});
  }
  useEffect(() => {
    onBackPress(handleBackPress);
  }, []);

  // /on go back

  AsyncStorage.getItem('user', (err, result) => {
      let _jsn = JSON.parse(result);
          if(_jsn.id){
            if(loginUserId == ""){
              setLoginUserId(_jsn.id);
              setName(_jsn.name);
            }
          }
        });


  // set barcode to input box
  if(barcode ===""){
    setBarcode(route.params.barcode);
    setBarcodeVal(route.params.barcode);
  }
  // /set barcode to input box
 

  // get employees  
  React.useEffect(() => {
   if(loginUserId !=="" && loginUserId!==undefined){

    let dataToSend = {id: loginUserId};
     post(employees_list, dataToSend, response => {
        let _resp = response;
        if(_resp.host_code==0){
          changeEmployees(_resp.result);

          let notif = [];
          notif = [{
            "id": 1,"name":"Yes"
          },
          {
            "id": 0,"name":"No"
          }
          ];

          changeNotifications(notif);
        }
        else{
          setErrortext(_resp.result[0]);
        }
      });
  }

  },[loginUserId]);
  // /get employees


// handle submit
   const handleSubmitPress = () => {

    if(barcode=="" || barcode==undefined){
      setErrortext("Barcode number is required");
    }
    else if(employee=="" || employee==undefined){
      setErrortext("Employee is required");
    }
    else if(loginUserId==""){
      navigation.navigate("Login");
    }
    else{
      setErrortext("");
      let dataToSend = {
        id: loginUserId, 
        bar_code: barcode,
        employee_id: employee.toString(),
        remark:(remarks!=="" && remarks !==undefined) ? remarks : "",
        is_email: (isEmail==1) ? 1 : 0
      };
      console.log(dataToSend);
      post(assign_item_url, dataToSend, response => {
        let _resp = response;
        if(_resp.host_code==0){
          navigation.navigate("Dashboard");
        }else{
          setErrortext(_resp.host_description);
        }
      });

    }
   }
// /handle submit




  return (
    <View style={styles.container}>
     <View style={styles.header}>
        <Image source={require('../../../assets/logo.png')} style={{ width: 80, height: 40, resizeMode: 'contain'}} />
        <Text style={{color: "#000", justifyContent: "center"}}>
            <Logout name={name} />
        </Text>

      </View>
<View style={{position: "absolute",top:80, right: 0, padding: 10}}>
<Icon
        
        name='keyboard-backspace'
        type='MaterialIcons'
        size={35}
        onPress={() => navigation.navigate('Dashboard',{screen:'Dashboard'})} />
</View>
    <Card>

          <Card.Title style={ styles.cardTitle }>  Assign Item</Card.Title>
          <Card.Divider />

          <View>
      <Text style={styles.error}>{errortext}</Text>
      <Input
        onChangeText={(barcodeVal) => 
          setBarcodeVal(barcodeVal)
        }
      value={barcodeVal ? barcodeVal : ""}
        placeholder='Barcode'
        inputStyle={styles.input}
      />
<View
  style={{
  padding: 10
}}>
<Select2
          isSelectSingle
          style={{borderBottomWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0}}

          colorTheme="blue"
          searchPlaceHolderText="Search"
          listEmptyTitle=""
          cancelButtonText="Cancel"
          selectButtonText="Choose"
          popupTitle="Select Employee"
          title="Select Employee"
          data={employees}
          onSelect={data => {
            setEmployee( data )
          }}
          onRemoveItem={data => {
              setEmployee("")
          }}
        />
</View>

  <Input
    numberOfLines={3}
    placeholder='Remark'
    onChangeText={(remark) => 
      setRemarks(remark)
    }
  />

<View
  style={{
  marginBottom: 15,
  padding: 7
}}>


<Select2
          isSelectSingle
          style={{borderBottomWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0}}
          colorTheme="blue"
          searchPlaceHolderText="Search"
          listEmptyTitle=""
          cancelButtonText="Cancel"
          selectButtonText="Choose"
          popupTitle="Select Notification"
          title="Select Notification"
          data={notifications}
          onSelect={data => {
            setIsEmail({ data })
          }}
          onRemoveItem={data => {
              setIsEmail("")
          }}
        />
</View>

      <Button onPress={handleSubmitPress}>Submit</Button>
          </View>
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
  input:{
    padding: 10,
    fontSize: 14,
    color: "#000"
  },
  item: {
  aspectRatio: 1,
  width: '100%',
  flex: 1,
},
error:{
  color: "red",
  textAlign: "center"
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