import React from 'react';
import {Text} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import Add from './screens/Add';
import Edit from './screens/Edit';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name={'Home'}
          component={Home}
          options={{
            headerStyle: {
              backgroundColor: '#0f4c75',
            },
            title: 'LCO App',
            headerTitleStyle: {textAlign: 'center', color: '#00b7c2'},
          }}
        />
        <Stack.Screen
          name={'Add'}
          component={Add}
          options={{
            headerStyle: {
              backgroundColor: '#0f4c75',
            },
            title: 'LCO App',
            headerTitleStyle: {textAlign: 'center', color: '#00b7c2'},
          }}
        />
        <Stack.Screen
          name={'Edit'}
          component={Edit}
          options={{
            headerStyle: {
              backgroundColor: '#0f4c75',
            },
            title: 'LCO App',
            headerTitleStyle: {textAlign: 'center', color: '#00b7c2'},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
