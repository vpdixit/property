import React, {useState, useRef,useEffect } from 'react';
import { StyleSheet, Text, View,SafeAreaView,Image,ScrollView,FlatList,BackHandler } from 'react-native';
import { Card,Input,Button,ListItem,Avatar,Icon  } from '@rneui/themed';
import {post} from '../../api';
import {category_list,colony_list,property_list} from '../../host';
import DetailList from '../../Components/DetailList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logout from '../../Components/Logout';
import Select2 from "react-native-select-two";

export default function DashboardScreen({navigation,route}) {

  const [name, setName] = useState('');
  const [category, changeCategroy] = useState([]);
  const [categoryVal, setCategroyVal] = useState('');
  const [colony, changeColony] = useState([]);
  const [colonyVal, setColonyVal] = useState('');
  const [property, changeProperty] = useState([]);
  const [propertyId, setPropertyId] = useState("");
  const [loginUserId, setLoginUserId] = useState('');
  const [loading, setLoading] = useState('');

  const [errortext, setErrortext] = useState('');

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


 // get status
  React.useEffect(() => {
   if(loginUserId !=="" && loginUserId!==undefined){
      let formData = new FormData();
      formData.append('user_id', loginUserId);
      post(category_list, formData, response => {
        let _resp = response;
        console.log(_resp);
        if(_resp.code==0){
          changeCategroy(_resp.result);
        }
        else{
          setErrortext(_resp.result[0]);
        }
      });

      post(colony_list, formData, response => {
        let _resp = response;
        console.log(_resp);
        if(_resp.code==0){
          changeColony(_resp.result);
        }
        else{
          setErrortext(_resp.result[0]);
        }
      });
}
  },[loginUserId]);
  // /get status

   const handleSearch = () => {
    if(propertyId==""){
      setErrortext("Please enter property id.");
      return false;
    }
    else{
      setLoading("Loading...");
          changeProperty([]);
      let formData = new FormData();
      formData.append('user_id', loginUserId);
      formData.append('property_id', propertyId);
      post(property_list, formData, response => {
        let _resp = response;
      setLoading("");
        if(_resp.code==0){
          changeProperty(_resp.result);
        }
        else{
          changeProperty([]);
          setErrortext(_resp.message);
        }
      });
    }
   }

  return (
     <ScrollView style={styles.container}>
  
    <View style={styles.header}>
        <Image source={require('../../../assets/logo.png')} style={{ width: 80, height: 40, resizeMode: 'contain'}} />
        <Text style={{color: "#000", justifyContent: "center"}}>
            <Logout name={name} />
        </Text>
      </View>
  <View>


 <Card>

          <Card.Title>Dashboard</Card.Title>
          <Card.Divider />

      <Text style={styles.error}>{errortext}</Text>
              <Input
      placeholder='Property ID'
      inputStyle={styles.input}
      onChangeText={(property_id) => setPropertyId(property_id) }
    />

        <View style={{ marginTop:10,flexDirection:"row",width:100 }}>
        <Button onPress={handleSearch}>Search</Button>
        </View>
</Card>


 <Card>
          <Card.Title>Property List</Card.Title>
          </Card>
          {(property.length > 0) ? 
             property.map((item,i) => {
              console.log(item);
                return(
 <Card>

                  <View key={i}>
                   
                    <View key={item.key} style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}><Text style={{ color: "#000" }}>Adhaar No</Text></View>
                    <View style={{ flex: 1 }}><Text style={{ color: "#000" }}>{item.adhaar_no}</Text></View>
                    </View>
                    <View key={item.key} style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}><Text style={{ color: "#000" }}>Commercial</Text></View>
                    <View style={{ flex: 1 }}><Text style={{ color: "#000" }}>{item.commercial}</Text></View>
                    </View>
                    <View key={item.key} style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}><Text style={{ color: "#000" }}>Floor Number</Text></View>
                    <View style={{ flex: 1 }}><Text style={{ color: "#000" }}>{item.floor_no}</Text></View>
                    </View>
                    <View key={item.key} style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}><Text style={{ color: "#000" }}>Mobile</Text></View>
                    <View style={{ flex: 1 }}><Text style={{ color: "#000" }}>{item.mobile}</Text></View>
                    </View>
                    <View key={item.key} style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}><Text style={{ color: "#000" }}>Occupier Name</Text></View>
                    <View style={{ flex: 1 }}><Text style={{ color: "#000" }}>{item.occupier_name}</Text></View>
                    </View>
                    <View key={item.key} style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}><Text style={{ color: "#000" }}>Owner Name</Text></View>
                    <View style={{ flex: 1 }}><Text style={{ color: "#000" }}>{item.owner_name}</Text></View>
                    </View>
                    <View key={item.key} style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}><Text style={{ color: "#000" }}>Property Id</Text></View>
                    <View style={{ flex: 1 }}><Text style={{ color: "#000" }}>{item.property_id}</Text></View>
                    </View>
                    <View key={item.key} style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}><Text style={{ color: "#000" }}>Status</Text></View>
                    <View style={{ flex: 1 }}><Text style={{ color: "#000" }}>{item.status}</Text></View>
                    </View>
                    <View key={item.key} style={{ flexDirection: "row", marginBottom: 10 }}>
                    <View style={{ flex: 1 }}><Text style={{ color: "#000" }}>Category</Text></View>
                    <View style={{ flex: 1 }}><Text style={{ color: "#000" }}>{item.category}</Text></View>
                    </View>   
                    <View style={{alignItems: 'flex-end' }}>
                     <Button onPress={() => navigation.push('EditPropertyScreen',{screen:'EditProperty',id:item.id})}>Edit</Button>
                    </View>
                  </View>

 </Card>

                  );
             })
         : 
        <Card><View><Text style={{ color: "#000",textAlign: "center" }}>{loading ? loading : <Text>No Data Found</Text> }</Text></View></Card>
       }


      </View>

      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
  aspectRatio: 1,
  width: '100%',
  flex: 1,
},
cardTitle:{
  paddingBottom: 20
},
  header:{
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: 'space-between',
    color: "#000",
    padding: 10,
    alignItems: "center"
  },
  input:{
    padding: 10,
    fontSize: 14
  },
error:{
  color: "red",
  textAlign: "center"
},
});