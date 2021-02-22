import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import {Auth} from '../../@types/navigation/scenes';
import {TextInput} from 'react-native-gesture-handler';
import {AuthContext} from '../../providers/AuthProvider';

type SigninScreenRouterProp = RouteProp<AuthStackParamList, Auth.Signin>;

type SigninScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  Auth.Signin
>;

type SigninScreenProps = {
  route: SigninScreenRouterProp;
  navigation: SigninScreenNavigationProp;
};
const SigninScreen = (props: SigninScreenProps) => {
  const [secureText, setSecureText] = useState(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {signin} = useContext(AuthContext);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 150,
        paddingHorizontal: 16,
      }}>
      <StatusBar hidden />
      <Text
        style={{
          fontSize: 48,
          marginBottom: 70,
          fontWeight: 'bold',
          maxWidth: '80%',
        }}>
        Welcome back
      </Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={[
          styles.inputText,
          styles.inputContainer,
          {
            marginBottom: 50,
          },
        ]}
        autoCorrect={false}
        keyboardType="email-address"
        autoFocus
        selectionColor="#5D4AD8"
        placeholder="Email address"
      />
      <View
        style={[
          styles.inputContainer,
          {flexDirection: 'row', justifyContent: 'space-between'},
        ]}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
          autoCapitalize="none"
          autoCorrect={false}
          selectionColor="#5D4AD8"
          style={[
            {
              flex: 1,
            },
            styles.inputText,
          ]}
          placeholder="Password"
        />
        <Pressable
          onPress={() => setSecureText(!secureText)}
          style={{paddingRight: 10}}>
          <Image
            source={
              secureText
                ? require(`../../assets/icons/eye-outline.png`)
                : require(`../../assets/icons/eye-filled.png`)
            }
            style={{tintColor: 'gray', width: 24, height: 24}}
          />
        </Pressable>
      </View>

      <TouchableOpacity style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordText}>Forgot password</Text>
      </TouchableOpacity>

      <View style={styles.ctaContainer}>
        <Text style={styles.ctaText}>Sign in</Text>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => {
            signin(email, password);
          }}>
          <Image
            style={{tintColor: 'white', width: 34, height: 34}}
            source={require('../../assets/icons/arrow-right.png')}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => props.navigation.navigate(Auth.Signup)}>
        <Text style={styles.switchCta}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputText: {
    fontSize: 20,
    fontWeight: '300',
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingBottom: 14,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    color: 'gray',
    fontSize: 18,
    textDecorationLine: 'underline',
    fontWeight: '300',
  },
  ctaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    marginBottom: 90,
  },
  ctaText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  ctaButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 58,
    height: 58,
    borderRadius: 58 / 2,
    backgroundColor: '#5D4AD8',
    shadowColor: '#5D4AD8',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  switchCta: {
    color: '#333',
    fontSize: 18,
    fontWeight: '500',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default SigninScreen;
