import React from 'react';
import {OnboardingScreen, SigninScreen, SignupScreen} from '../screens';
import {createStackNavigator} from '@react-navigation/stack';
import {Auth} from '../@types/navigation/scenes';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={Auth.Onboarding} component={OnboardingScreen} />
      <Stack.Screen name={Auth.Signin} component={SigninScreen} />
      <Stack.Screen name={Auth.Signup} component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
