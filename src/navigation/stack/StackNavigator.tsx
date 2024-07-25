import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SplashScreen, LoginScreen } from '../../screens';
import {DrawerNavigator} from '..';

const Stack = createStackNavigator();

const StackNavigator:React.FC=()=> {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Home" component={DrawerNavigator} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

export default StackNavigator;
