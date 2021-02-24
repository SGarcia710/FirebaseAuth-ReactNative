import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        width: 40,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => navigation.goBack()}>
      <Image source={require('../assets/icons/arrow-left.png')} />
    </TouchableOpacity>
  );
};

export default BackButton;
