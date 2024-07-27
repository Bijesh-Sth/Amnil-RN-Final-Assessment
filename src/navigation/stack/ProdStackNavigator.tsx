import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, ProductDetailScreen, SearchScreen } from '../../screens';

type ProdStackParamList = {
  ProductHome: undefined;
  Search: undefined;
  ProductDetail: { productId: number };
};
const Stack = createStackNavigator<ProdStackParamList>();


const ProdStackNavigator:React.FC=()=> {
  return (
    <Stack.Navigator>
    <Stack.Screen name="ProductHome" component={HomeScreen} options={{headerShown:false}}/>
    <Stack.Screen name="Search" component={SearchScreen} options={{headerShown:false}}/>
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

export default ProdStackNavigator;
