import React from 'react';
import {Image, StyleSheet, Text, Touchable, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ListCard = (
  props: {
    index: number;
    handleOnPress: () => void;
  } & Character,
) => {
  return (
    <TouchableOpacity onPress={props.handleOnPress}>
      <View
        style={[
          styles.container,
          {
            marginTop: props.index === 0 ? 21 : 0,
          },
        ]}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: props.image}} />
        </View>
        <View style={styles.infoContainer}>
          <View style={[styles.infoContainerTop]}>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.specie}>{props.species}</Text>
          </View>
          <View style={styles.infoContainerBottom}>
            <Text numberOfLines={1} style={styles.location}>
              {props.location.name}
            </Text>
            <Text
              style={{
                fontWeight: '800',
                fontSize: 22,
              }}>
              ·
            </Text>
            {props.gender !== 'unknown' && (
              <Image
                style={{
                  marginLeft: 8,
                }}
                source={
                  props.gender === 'Male'
                    ? require('../assets/images/male-outline.png')
                    : require('../assets/images/female-outline.png')
                }
              />
            )}
            <Text
              style={[
                styles.gender,
                {
                  color:
                    props.gender === 'Male'
                      ? '#0096D1'
                      : props.gender === 'Female'
                      ? '#F01159'
                      : '#333',
                },
              ]}>
              {props.gender}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  imageContainer: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 4,
    shadowOpacity: 0.1,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 24,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    height: 120,
    padding: 16,
    justifyContent: 'space-between',
  },
  infoContainerTop: {},
  name: {
    fontWeight: '800',
    fontSize: 16,
    color: '#555555',
    marginBottom: 4,
  },
  specie: {
    fontSize: 12,
    color: '#C4C4C4',
  },
  location: {
    fontSize: 11,
    color: '#555555',
    marginRight: 8,
    maxWidth: 55,
  },
  gender: {
    fontSize: 11,
    marginLeft: 4,
  },
  infoContainerBottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ListCard;
