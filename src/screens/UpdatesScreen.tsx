import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {post} from '../api';
import {blogs_url, token} from '../host';
import { shadow } from '../styles';

const UpdatesScreen = ({navigation}: any) => {
  const [updateList, setUpdateList] = useState();

  useEffect(() => {
    const params = new URLSearchParams();
    params.append('token', token);
    params.append('entity', 'updates');
    post(blogs_url, params, response => {
      setUpdateList(response.data.data);
    });
  }, []);

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          margin: 8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FastImage
          resizeMode={'cover'}
          source={{
            uri: item.image_url,
          }}
          style={{
            height: 120,
            width: 120,
            borderRadius: 10,
            overflow: 'hidden',
            ...shadow.s5,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            width: 200,
            backgroundColor: 'rgb(238,242,252)',
            height: 100,
            alignItems: 'center',
            ...shadow.s3,
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <View>
            <Text style={{padding: 5, fontSize: 18, fontWeight: 'bold'}}>
              {item.meta_title}
            </Text>
            <Text style={{padding: 5, fontSize: 12, fontWeight: 'bold'}}>
              {item.created_at}
            </Text>
          </View>
          <FastImage
            style={{
              height: 25,
              width: 25,
            }}
            source={require('../assets/more.png')}
          />
        </View>
      </View>
    );
  };


  return (
    <View>
      <FlatList
        data={updateList}
        renderItem={renderItem}
        keyExtractor={item => item.news_id}
      />
    </View>
  );
};
export default UpdatesScreen;
