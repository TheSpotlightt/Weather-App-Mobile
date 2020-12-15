import React from 'react';

import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/home';
import Infos from './components/infos/infos';
import Search from './components/search-city/search';

const Stack = createStackNavigator();

export default function Navigation () {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Home" 
                    component={Home} 
                    exact 
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen 
                    name="Infos" 
                    component={Infos} 
                    options={{
                        headerStyle: {
                            backgroundColor: '#18191A'
                        },
                        headerTintColor: '#e2e2e2'
                    }}
                />
                <Stack.Screen 
                    name="Search Cities" 
                    component={Search} 
                    options={{
                        headerStyle: {
                            backgroundColor: '#18191A'
                        },
                        headerTintColor: '#e2e2e2'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}