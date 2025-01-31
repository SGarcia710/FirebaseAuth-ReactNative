import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../providers/AuthProvider';

import AppStack from './AppStack';
import AuthStack from './AuthStack';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user: any) => {
    setUser(user);
    if (!!initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (!!initializing) {
    return null; // We can have here the splash screen
  }

  return (
    <NavigationContainer>
      {!!user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
