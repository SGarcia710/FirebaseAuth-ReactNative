import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {
  View,
  Text,
  StatusBar,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {App} from '../../@types/navigation/scenes';
import {BackButton} from '../../components';
import {AuthContext} from '../../providers/AuthProvider';

const {width, height} = Dimensions.get('screen');

type CharacterDetailsScreenRouterProp = RouteProp<
  AppStackParamList,
  App.CharacterDetails
>;

type CharacterDetailsScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  App.CharacterDetails
>;

type CharacterDetailsScreenProps = {
  route: CharacterDetailsScreenRouterProp;
  navigation: CharacterDetailsScreenNavigationProp;
};

const TRAITS = ['Active', 'Friendly', 'Loyal', 'Playful'];

const CharacterDetailsScreen = (props: CharacterDetailsScreenProps) => {
  const charInfo = props.route.params.character;
  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={{
        alignItems: 'center',
        flex: 1,
      }}
      style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.goBackButtonContainer}>
        <BackButton />
      </View>
      <Image source={{uri: charInfo.image}} style={styles.heroImage} />
      <View
        style={{
          width: width - 16 * 2,
          alignItems: 'center',
          flex: 1,
        }}>
        <View style={styles.infoCardContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.charName}>{charInfo.name}</Text>
            {charInfo.gender !== 'unknown' && (
              <Image
                style={{
                  width: 20,
                  height: 20,
                }}
                source={
                  charInfo.gender === 'Male'
                    ? require('../../assets/images/male-outline.png')
                    : require('../../assets/images/female-outline.png')
                }
              />
            )}
          </View>
          <Text style={styles.charSpecies}>{charInfo.species}</Text>
          <Text numberOfLines={1} style={styles.charLocation}>
            {charInfo.location.name}
          </Text>
        </View>
        <View style={styles.authorContainer}>
          <Image source={require('../../assets/images/userImage.png')} />
          <View style={styles.authorInfoContainer}>
            <Text style={styles.blackText}>Jessi Kurniawan</Text>
            <Text style={styles.grayText}>Owner</Text>
          </View>
          <Text style={styles.grayText}>20 Jan 2021</Text>
        </View>
        <View style={styles.traitsContainer}>
          <Text
            style={[
              styles.blackText,
              {
                marginBottom: 16,
              },
            ]}>
            Traits
          </Text>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {TRAITS.map((trait) => (
              <View style={styles.tagContainer}>
                <Text style={styles.tagText}>{trait}</Text>
              </View>
            ))}
          </View>
        </View>
        <Text style={styles.description}>
          Buddy is an active, playful, yet friendly and loyal dog for our
          family. He loves to play fetch with people, and he don’t mind if
          strange people pet his head. Buddy loves to wake up in the morning and
          then wake you up too. He is friendly to everyone, even to cats and
          bunnies.
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.heartButton}>
          <Image source={require('../../assets/icons/heart-outline.png')} />
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.adoptButton}>
            <Text style={styles.adoptButtonText}>Adopt Now</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 42,
  },
  heroImage: {
    width,
    height: 320,
    resizeMode: 'cover',
  },
  infoCardContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 16,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: -8},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    padding: 16,
    marginTop: -45,
  },
  charName: {
    color: '#555555',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
  },
  charSpecies: {
    color: '#C4C4C4',
    fontSize: 12,
    marginBottom: 15,
  },
  charLocation: {
    color: '#555555',
    fontSize: 11,
  },
  authorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 24,
  },
  authorInfoContainer: {
    marginLeft: 16,
    flex: 1,
  },
  blackText: {
    color: '#555555',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  grayText: {
    color: '#C4C4C4',
    fontSize: 12,
  },
  traitsContainer: {
    width: '100%',
    marginTop: 24,
  },
  tagContainer: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  tagText: {
    color: '#555555',
  },
  description: {
    fontSize: 12,
    color: '#555555',
    width: '100%',
    marginTop: 24,
    marginBottom: 19,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 16 * 2,
  },
  heartButton: {
    backgroundColor: '#fff',
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  adoptButton: {
    backgroundColor: '#F57B51',
    borderRadius: 16,
    width: width * 0.7,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F57B51',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  adoptButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  goBackButtonContainer: {
    position: 'absolute',
    left: 16,
    top: 68,
    zIndex: 89,
  },
});

export default CharacterDetailsScreen;
