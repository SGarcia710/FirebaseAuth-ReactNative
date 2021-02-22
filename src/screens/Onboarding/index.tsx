import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  View,
  Text,
  StatusBar,
  Animated,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Auth} from '../../@types/navigation/scenes';

const {width, height} = Dimensions.get('screen');

// Credits:
// https://www.flaticon.es/packs/retro-wave
// https://www.youtube.com/watch?v=YE7c6ch2msY&t=27s

const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
const DATA = [
  {
    key: '1',
    text: 'Find projects from companies everywhere in the word',
    image: require(`../../assets/images/joystick.png`),
  },
  {
    key: '2',
    text: 'Make money while working on awesome projects',
    image: require(`../../assets/images/pink.png`),
  },
  {
    key: '3',
    text: 'Chat with others freelancers and develop your network',
    image: require(`../../assets/images/spray.png`),
  },
  {
    key: '4',
    text: 'Work hard and level up!',
    image: require(`../../assets/images/flamingo.png`),
  },
];

const Indicator = ({scrollX}: {scrollX: Animated.Value}) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 100,
        flexDirection: 'row',
      }}>
      {React.Children.toArray(
        DATA.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.4, 0.8],
            extrapolate: 'clamp', // We want to extrapolate, becase we dont want a movement outside the input range for this particular item. I meant, we only want the thre related dots to be animated and transformed, not the fourth. (i.e. we are going to animate the previus, the actual and the next dot, three by three)
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 0.9, 0.5],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              style={{
                height: 10,
                width: 10,
                borderRadius: 5,
                backgroundColor: '#fff',
                margin: 4,
                opacity,
                transform: [{scale}],
              }}
            />
          );
        }),
      )}
    </View>
  );
};

const Backdrop = ({scrollX}: {scrollX: Animated.Value}) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor,
        },
      ]}
    />
  );
};

const Square = ({scrollX}: {scrollX: Animated.Value}) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1,
  );
  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['35deg', '0deg', '35deg'],
  });
  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });

  return (
    <Animated.View
      style={{
        width: height,
        height,
        backgroundColor: 'white',
        borderRadius: 86,
        position: 'absolute',
        top: -height * 0.6,
        left: -height * 0.3,
        transform: [{rotate}, {translateX}],
      }}
    />
  );
};

type OnboardingScreenRouterProp = RouteProp<
  AuthStackParamList,
  Auth.Onboarding
>;

type OnboardingScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  Auth.Onboarding
>;

type OnboardingScreenProps = {
  route: OnboardingScreenRouterProp;
  navigation: OnboardingScreenNavigationProp;
};

const OnboardingScreen = (props: OnboardingScreenProps) => {
  // We use useRef beacuse react will keep track of this value and when this component will be re-render the value is not going to change
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        horizontal
        contentContainerStyle={{}}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false}, // We need to deactivate the nativeDriver because it doesnt support changing the BG, it only supports transforming
        )}
        pagingEnabled
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width,
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: 'center',
                }}>
                <Image
                  source={item.image}
                  style={{
                    resizeMode: 'contain',
                    width: width / 2,
                    height: width / 2,
                  }}
                />
              </View>
              <View
                style={{
                  flex: 0.3,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    maxWidth: '60%',
                    color: 'white',
                  }}>
                  {item.text}
                </Text>
                {index === DATA.length - 1 && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'white',
                      width: 100,
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 12,
                      marginTop: 20,
                    }}
                    onPress={() => props.navigation.replace(Auth.Signup)}>
                    <Text
                      style={{
                        color: '#333',
                      }}>
                      Let's rock!
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX} />
    </View>
  );
};

export default OnboardingScreen;
