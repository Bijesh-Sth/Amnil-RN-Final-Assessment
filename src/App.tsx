import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { StackNavigator } from './navigation';
import store from './redux/store';

export default function App() {
  return (
<Provider store={store}>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
</Provider>
  );
}