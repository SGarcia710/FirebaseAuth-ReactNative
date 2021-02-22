import React from 'react';
import {HomeScreen} from '../screens';
import {createStackNavigator} from '@react-navigation/stack';
import {App} from '../@types/navigation/scenes';

const Stack = createStackNavigator<AppStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={App.Home} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
