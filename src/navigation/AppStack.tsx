import React from 'react';
import {CardsListScreen, HomeScreen, CharacterDetailsScreen} from '../screens';
import {createStackNavigator} from '@react-navigation/stack';
import {App} from '../@types/navigation/scenes';

const Stack = createStackNavigator<AppStackParamList>();

const AppStack = () => {
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
      }}
      headerMode="none">
      <Stack.Screen name={App.Home} component={HomeScreen} />
      <Stack.Screen
        name={App.CardsList}
        component={CardsListScreen}
        options={({route}) => ({
          headerBackTitleVisible: false,
          title: 'Characters',
        })}
      />
      <Stack.Screen
        name={App.CharacterDetails}
        component={CharacterDetailsScreen}
        options={({route}) => ({
          headerBackTitleVisible: false,
          title: false,
          headerTransparent: true,
        })}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
