import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {App} from '../../@types/navigation/scenes';

type HomeScreenRouterProp = RouteProp<AppStackParamList, App.Home>;

type HomeScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  App.Home
>;

type HomeScreenProps = {
  route: HomeScreenRouterProp;
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = (props: HomeScreenProps) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StatusBar hidden />
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
