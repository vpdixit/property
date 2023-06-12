import React, {useState, useRef,useEffect } from 'react';
import { StyleSheet, Text, View,SafeAreaView,Image,ScrollView,FlatList,BackHandler } from 'react-native';
import { Card,Input,Button,ListItem,Avatar,Icon  } from '@rneui/themed';
import {post} from '../../api';
import {return_item_list} from '../../host';
import DetailList from '../../Components/DetailList';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logout from '../../Components/Logout';

export default function ViewReturnDetails({navigation,route}) {

  const [name, setName] = useState('');
  const [loginUserId, setLoginUserId] = useState('');
  const [expanded, setExpanded] = useState('');
  const [list, changeList] = React.useState([]);
  const [itemData, changeItemData] = React.useState([]);
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

  // get item returned list  
  React.useEffect(() => {
   if(loginUserId !=="" && loginUserId!==undefined){

    let dataToSend = {id: loginUserId,bar_code:route.params.barcode};
     post(return_item_list, dataToSend, response => {
        let _resp = response;

        if(_resp.host_code==0){
          let result = [];

          changeList(_resp.assign_data);
          changeItemData(_resp.item_data);
        }
        else{
          setErrortext("No Data found");
        }
      });
  }
  },[loginUserId]);
  // /get item returned list 
  console.log(route.params.barcode);

  return (
     <ScrollView style={styles.container}>
  
    <View style={styles.header}>
        <Image source={require('../../../assets/logo.png')} style={{ width: 80, height: 40, resizeMode: 'contain'}} />
        <Text style={{color: "#000", justifyContent: "center"}}>
            <Logout name={name} />
        </Text>

      </View>
      <View style={{position: "absolute",top:60, right: 0, padding: 10}}>
<Icon
        
        name='keyboard-backspace'
        type='MaterialIcons'
        size={35}
        onPress={() => navigation.navigate('Dashboard',{screen:'Dashboard'})} />
</View>
  <View style={{ marginTop:40 }}>


 <Card>

  <View style={{ flexDirection: "row" }}>
    <View style={{  flex:1 }}><Button onPress={() => navigation.navigate('AssignItemForm', {barcode: route.params.barcode})}>Assign</Button></View>
    <View style={{  flex:1 }}></View>
    <View style={{  flex:1 }}><Button onPress={() => navigation.navigate('ReturnItemForm',{barcode:route.params.barcode})}>Return</Button></View>
  </View>

          <Card.Title>Assign Data</Card.Title>
          <Card.Divider />
 {errortext ? 
     <Text style={{ textAlign: "center",color: "#232323" }}>No Data Found</Text> : ""}

       {list.map((assign_data) => {
              return (
            <ListItem.Accordion
              key={assign_data.id}
              containerStyle={{backgroundColor: "#ccc",borderRadius:10}}
              itemStyle={{color: "#000"}}
              content={
                <>
                  <ListItem.Content>
                    <Text style={{ color: "#000" }}>{ assign_data.name }</Text>
                  </ListItem.Content>
                </>
              }
              isExpanded={expanded}
              onPress={() => {
                setExpanded(!expanded);
              }}
            >

            <DetailList key="1a" name="Employee Id" val={assign_data.employee_id}/>
            <DetailList key="1b" name="Assign Date" val={assign_data.assign_date}/>
            <DetailList key="1c" name="Return Date" val={assign_data.return_date}/>
            <DetailList key="1d" name="Return Comment" val={assign_data.return_comment}/>
           
            </ListItem.Accordion>
   );
})}


 {errortext ? "" : 
          <Card.Title style={{ marginTop: 20 }}>Item Detail</Card.Title>
        }
  <Card.Divider />
           {itemData.map((item) => {
              return(
                <DetailList 
                style={{ color: "#000" }}
                key={item.key}
                name={item.key} 
                val={item.value}/>
              );
              })}
          </Card>

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
  }
});