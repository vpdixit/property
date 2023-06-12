import React, {Component} from 'react';
import {NavigationContainer,useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login/Login';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import BarcodeScan from '../screens/Common/BarcodeScan';
import AssignFormScreen from '../screens/AssignItem/AssignFormScreen';
import EditPropertyScreen from '../screens/EditProperty/EditPropertyScreen';
import ViewDetailScreen from '../screens/ViewDetails/ViewDetailScreen';

const Stack = createNativeStackNavigator();

class Navigator extends Component {
  render() {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerMode: 'null',animation: 'none'}} initialRouteName="Login">
            <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
            <Stack.Screen name="Dashboard" options={{headerShown: false}} component={DashboardScreen} />
            <Stack.Screen name="Barcode" options={{headerShown: false}} component={BarcodeScan} />
            <Stack.Screen name="AssignItemForm" options={{headerShown: false}} component={AssignFormScreen} />
            <Stack.Screen name="EditPropertyScreen" options={{headerShown: false}} component={EditPropertyScreen} />
            <Stack.Screen name="ViewDetail" options={{headerShown: false}} component={ViewDetailScreen} />

          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}

export default Navigator;
