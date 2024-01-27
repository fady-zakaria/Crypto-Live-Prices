import {ActivityIndicator, FlatList, Pressable, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Crypto} from '../../models/crypto';
import {ScreenNames} from '../../ScreenNames';
import {socket} from '../../../App';
import {approximatePrices} from '../../utils';
import {colors} from '../../utils/Colors';
import styles from './Home.style';
import {socketVar} from '@env';

const Home = ({navigation}: {navigation: any}) => {
  const [cryptoList, setCryptoList] = useState();
  const [cryptoDataLoaded, setCryptoDataLoaded] = useState(false);

  useEffect(() => {
    socket.on(socketVar, data => {
      setCryptoList(data);
      setCryptoDataLoaded(true);
    });
  }, []);

  const openCryptoDetails = (id: string) => {
    navigation.navigate(ScreenNames.Details, {id: id});
  };

  const renderItem = ({item}: {item: Crypto}) => {
    return (
      <Pressable
        style={styles.crypto}
        onPress={() => openCryptoDetails(item?.id)}>
        <Text style={styles.name}>{item?.name}</Text>
        <Text style={styles.price}>{approximatePrices(item?.price)}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {cryptoDataLoaded ? (
        <FlatList
          data={cryptoList}
          renderItem={renderItem}
          keyExtractor={item => item?.id}
        />
      ) : (
        <ActivityIndicator size={'large'} color={colors.secondary} />
      )}
    </View>
  );
};

export default Home;
