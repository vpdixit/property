import React, {useState, useRef,useEffect  } from 'react';
import { 
StyleSheet, 
Text, 
View,
SafeAreaView,
Image,
TextInput,
BackHandler,
ScrollView,
TouchableOpacity,
Platform,
PermissionsAndroid,
 } from 'react-native';
import { Card,Input,Button,Icon  } from '@rneui/themed';
import {post} from '../../api';
import {property_view,property_list,category_list,status_list,property_edit} from '../../host';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import Select2 from "react-native-select-two"
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';

export default function EditPropertyScreen({navigation, route}) {
  const [filePath, setFilePath] = useState({});

  const [name, setName] = useState('');
  const [loginUserId, setLoginUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [properties, changeProperties] = React.useState([]);
  const [category, changeCategroy] = useState([]);
  const [status, changeStatus] = useState([]);
  const [statusVal, setStatusVal] = useState([]);
  const [categoryVal, setCategroyVal] = useState('');

  const [propertyId, setPropertyId] = useState("");
  const [owner, setOwner] = useState("");
  const [occupier, setOccupier] = useState("");
  const [mobile, setMobile] = useState("");
  const [floor, setFloor] = useState("");
  const [adhaar, setAdhar] = useState("");
  const [bill, setBill] = useState("");
  const [signature, setSignature] = useState("");
  const [singleFile, setSingleFile] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [errortext, setErrortext] = useState('');


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
      if(_jsn){
          if(_jsn.id){
            if(loginUserId == ""){
              setLoginUserId(_jsn.id);
              setName(_jsn.name);
            }
          }
        }
        });
   
  React.useEffect(() => {
          
   if(loginUserId !=="" && loginUserId!==undefined){
      let formData = new FormData();
      formData.append('user_id', loginUserId);
        post(category_list, formData, response => {
        let _resp = response;
        if(_resp.code==0){
          changeCategroy(_resp.result);
        }
        else{
          setErrortext(_resp.result[0]);
        }
      });

        post(status_list, formData, response => {
        let _resp = response;
        if(_resp.code==0){
          changeStatus(_resp.result);
        }
        else{
          setErrortext(_resp.result[0]);
        }
      });

      formData.append('id', route.params.id);
  // get status
      post(property_view, formData, response => {
        let _resp = response;
        if(_resp.code==0){

          var res = _resp.result;
          setPropertyId(res.property_id);
          setAdhar(res.aadhar_no);
          setCategroyVal(res.category);
          setFloor(res.floor);
          setMobile(res.mobile);
          setOccupier(res.occupier_name);
          setOwner(res.owner_name);
          setStatusVal(res.val);
        }
        else{
          setErrortext(res.result[0]);
        }
      });
  // /get status

  }


  },[loginUserId]);



// handle submit
   const handleSubmitPress = () => {

      let formData = new FormData();
      formData.append('user_id', loginUserId);
      formData.append('id', route.params.id);
      formData.append('property_id', propertyId);
      formData.append('owner_name', owner);
      formData.append('occupier_name', occupier);
      formData.append('mobile', mobile);
      formData.append('category', categoryVal);
      formData.append('floor_no', floor ? floor : "");
      formData.append('aadhar_no', adhaar ? adhaar : "");
      formData.append('bill_receive_mobile', bill ? bill : "");
      formData.append('signature', signature ? signature : "");
      formData.append('status', statusVal ? statusVal : "");
      formData.append('image', filePath);
      formData.append('latitude', latitude ? latitude : "");
      formData.append('longitude', longitude ? longitude : "");    
      setErrortext("");

      post(property_edit, formData, response => {
        let _resp = response;
        console.log(_resp);
        if(_resp.code==0){
          alert(_resp.message);
          navigation.navigate("Dashboard");
        }else{
          setErrortext(_resp.host_description);
        }
      });
   }
// /handle submit


 const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log(response.assets[0]);
     if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }


      setFilePath(response.assets[0]);
    });
  };

  return (
     <ScrollView style={styles.container}>
    <View style={styles.container}>

    <View style={styles.header}>
        <Image source={require('../../../assets/logo.png')} style={{ width: 80, height: 40, resizeMode: 'contain'}} />
        <Text style={{color: "#000", justifyContent: "center"}}>
        <Text style={{ padding: 10, marginRight: 20 }}>{ name ? name : "" } {'  '}</Text>
   
   <Icon
        name='logout'
        type='SimpleLineIcons'
        size={18}
        style={{transform: [{rotateY: '180deg'}]}}
        onPress={() => navigation.navigate('Login',{screen:'Login'})} />
        </Text>

      </View>
<View style={{position: "absolute",top:60, right: 0, padding: 10}}>
<Icon
        
        name='keyboard-backspace'
        type='MaterialIcons'
        size={35}
        onPress={() => navigation.navigate('Dashboard',{screen:'Dashboard'})} />
</View>
    <Card>
          <Card.Title style={ styles.cardTitle }>  Return Item</Card.Title>
          <Card.Divider />
          <View>
     
<View
  style={{
  marginBottom: 15,
  paddingLeft: 10,
  paddingRight: 10
}}>
       <Input
      placeholder='Property ID'
      inputStyle={styles.input}
      value={propertyId ? propertyId : ""}
      onChangeText={(property_id) => setPropertyId(property_id) }
    />
        <Input
      placeholder='Owner Name'
      inputStyle={styles.input}
      value={owner ? owner : ""}
      onChangeText={(owner) => setOwner(property_id) }
    />
        <Input
      placeholder='Occupier Name'
      inputStyle={styles.input}
      value={occupier ? occupier : ""}
      onChangeText={(occuier) => setOccupier(occuier) }
    />
        <Input
      placeholder='Mobile'
      inputStyle={styles.input}
      value={mobile ? mobile : ""}
      onChangeText={(mobile) => setMobile(mobile) }
    />
          <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle,{padding:10,borderBottomWidth:0.5, marginBottom:20}}
          onPress={() => chooseFile('photo')}>
          <Text style={{color:"#000"}}>Choose Image</Text>
        </TouchableOpacity>

    <Select2
          isSelectSingle
          style={{borderBottomWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0}}
          colorTheme="blue"
          searchPlaceHolderText="Search"
          listEmptyTitle=""  
          cancelButtonText="Cancel"
          selectButtonText="Choose"
          popupTitle="Select Category"
          title="Select Category"
          data={category}
          onSelect={data => {
              setCategroyVal(data)
          }}
          onRemoveItem={data => {
              setCategroyVal("")
          }}
        />


        <Input
      placeholder='Floor Number'
      inputStyle={styles.floor}
      value={floor ? floor : ""}
      onChangeText={(floor) => setFloor(floor) }
    />
         <Input
      placeholder='Aadhar Number'
      inputStyle={styles.input}
      value={adhaar ? adhaar : ""}
      onChangeText={(adhar) => setAdhar(adhar) }
    />
        <Input
      placeholder='Bill Receive Mobile'
      inputStyle={styles.input}
      onChangeText={(bill) => setBill(bill) }
    />
     <Input
      placeholder='Signature'
      inputStyle={styles.input}
      onChangeText={(signature) => setSignature(signature) }
    />

    <Select2
          isSelectSingle
          style={{borderBottomWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0, marginTop:20}}
          colorTheme="blue"
          searchPlaceHolderText="Search"
          listEmptyTitle=""  
          cancelButtonText="Cancel"
          selectButtonText="Choose"
          popupTitle="Select Category"
          title="Select Status"
          data={status}
          onSelect={data => {
              setStatusVal(data)
          }}
          onRemoveItem={data => {
              setStatusVal("")
          }}
        />


  {/*  <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={selectFile}>
        <Text style={{color: "#000"}}>Select File</Text>
      </TouchableOpacity>*/}


     <Input
      placeholder='Latitude'
      inputStyle={styles.input}
      onChangeText={(latitude) => setLatitude(latitude) }
    />

     <Input
      placeholder='Longitude'
      inputStyle={styles.input}
      onChangeText={(longitude) => setLongitude(longitude) }
    />

</View>

      <Button onPress={handleSubmitPress}>Submit</Button>
          </View>
        </Card>

      <View style={styles.header}>
        <Text>Footer</Text>
      </View>
      
    </View>

</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input:{
    padding: 5,
    fontSize: 14
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
  },
  floor:{
    padding: 5,
    fontSize: 14,
    marginTop: 20
  }
});