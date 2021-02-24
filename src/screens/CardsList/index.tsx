import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import useSWR from 'swr';
import {App} from '../../@types/navigation/scenes';
import {ListCard} from '../../components';
import {fetcher} from '../../utils';
import LottieView from 'lottie-react-native';

type CardsListScreenRouterProp = RouteProp<AppStackParamList, App.CardsList>;

type CardsListScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  App.CardsList
>;

type CardsListScreenProps = {
  route: CardsListScreenRouterProp;
  navigation: CardsListScreenNavigationProp;
};

const CardsListScreen = (props: CardsListScreenProps) => {
  const {data, error} = useSWR<{
    info: {
      count: number;
      next: string | null;
      pages: number;
      prev: string | null;
    };
    results: Character[];
  }>('https://rickandmortyapi.com/api/character', fetcher);

  return (
    <View style={styles.container}>
      {!!data && (
        <FlatList
          style={{width: '100%'}}
          data={data.results}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <ListCard
                handleOnPress={() => {
                  props.navigation.navigate(App.CharacterDetails, {
                    character: item,
                  });
                }}
                {...item}
                index={index}
              />
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      {!data && (
        <LottieView
          source={require('../../assets/lottie/the-morty-dance.json')}
          autoPlay
          loop
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
});

export default CardsListScreen;
