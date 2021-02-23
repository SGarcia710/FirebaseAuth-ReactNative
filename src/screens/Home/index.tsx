import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {View, Text, StatusBar, Pressable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {App} from '../../@types/navigation/scenes';
import {AuthContext} from '../../providers/AuthProvider';

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
  const {signout} = useContext(AuthContext);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StatusBar hidden />
      <Text>HomeScreen</Text>
      <TouchableOpacity
        style={{
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
          width: 120,
          height: 44,
          borderRadius: 12,
          backgroundColor: '#333',
        }}
        onPress={signout}>
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
          }}>
          Signout
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
          width: 120,
          height: 44,
          borderRadius: 12,
          backgroundColor: '#333',
        }}
        onPress={() => props.navigation.navigate(App.CardsList)}>
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
          }}>
          CardsList
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
