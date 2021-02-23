import React from 'react';
import {CardsListScreen, HomeScreen} from '../screens';
import {createStackNavigator} from '@react-navigation/stack';
import {App} from '../@types/navigation/scenes';

const Stack = createStackNavigator<AppStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: 'lightgray', // iOS
          elevation: 0, // Android
        },
        headerTintColor: '#333',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name={App.Home} component={HomeScreen} />
      <Stack.Screen
        name={App.CardsList}
        component={CardsListScreen}
        options={({route}) => ({
          headerBackTitleVisible: false,
          title: 'Characters',
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
