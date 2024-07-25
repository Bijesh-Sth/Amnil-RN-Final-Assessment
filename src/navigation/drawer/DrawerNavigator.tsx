import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { TodosScreen,PostsScreen } from '../../screens'
import { TabNavigator } from '..';

const Drawer = createDrawerNavigator()

const DrawerNavigator:React.FC = () => {
    return (
        <Drawer.Navigator>
           <Drawer.Screen name="Tab" component={TabNavigator} />
           <Drawer.Screen name="Todos" component={TodosScreen} />
           <Drawer.Screen name="Posts" component={PostsScreen} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;