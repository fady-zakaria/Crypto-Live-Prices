import {
  ActivityIndicator,
  Platform,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {colors} from '../../utils/Colors';
import {approximatePrices} from '../../utils';
import RenderHtml from 'react-native-render-html';
import {CryptoMarketDataInit, CryptoProfileInit} from '../../models/crypto';
import styles from './Details.style';
import {API_URL_IOS, API_URL_ANDROID} from '@env';

const API_URL = Platform.OS === 'ios' ? API_URL_IOS : API_URL_ANDROID;

const Details = ({route}: {route: any}) => {
  const {width} = useWindowDimensions();
  const id = route.params?.id;
  const [cryptoProfile, setCryptoProfile] = useState(CryptoProfileInit);
  const [cryptoMarketData, setCryptoMarketData] =
    useState(CryptoMarketDataInit);
  const [cryptoDataLoaded, setCryptoDataLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      axios.get(`${API_URL}/cryptos/profile/${id}`),
      axios.get(`${API_URL}/cryptos/market-data/${id}`),
    ])
      .then(([resProfile, resMarketData]) => {
        setCryptoProfile(resProfile?.data);
        setCryptoMarketData(resMarketData?.data);
        setCryptoDataLoaded(true);
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);

  const cryptoHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{cryptoProfile?.name}</Text>
          <Text style={styles.symbol}>{cryptoProfile?.symbol}</Text>
          <Text style={styles.price}>{`$ ${approximatePrices(
            cryptoMarketData?.market_data?.price_usd,
          )}`}</Text>
        </View>
        <View style={styles.headerTagLine}>
          <Text style={styles.line}>
            {cryptoProfile?.profile?.general?.overview?.tagline}
          </Text>
        </View>
      </View>
    );
  };

  const priceChanges = () => {
    return (
      <View style={styles.priceChanges}>
        <View style={styles.priceChangeRow}>
          <Text style={styles.line}>Percent Change 24h</Text>
          <Text style={styles.line}>{`% ${approximatePrices(
            cryptoMarketData?.market_data?.percent_change_usd_last_1_hour,
          )}`}</Text>
        </View>
        <View style={styles.priceChangeRow}>
          <Text style={styles.line}>Percent Change 1h</Text>
          <Text style={styles.line}>{`% ${approximatePrices(
            cryptoMarketData?.market_data?.percent_change_usd_last_24_hours,
          )}`}</Text>
        </View>
      </View>
    );
  };

  const cryptoInfo = () => {
    return (
      <ScrollView style={styles.cryptoInfo}>
        <View style={styles.cryptoInfoRow}>
          <Text style={styles.cryptoInfoTitle}>Overview</Text>
          <RenderHtml
            contentWidth={width}
            source={{
              html: `<p style="color: #fff">${cryptoProfile?.profile?.general?.overview?.project_details}</p>`,
            }}
          />
        </View>
        <View style={styles.cryptoInfoRow}>
          <Text style={styles.cryptoInfoTitle}>Background</Text>
          <RenderHtml
            contentWidth={width}
            source={{
              html: `<p style="color: #fff">${cryptoProfile?.profile?.general?.background?.background_details}</p>`,
            }}
          />
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {cryptoDataLoaded ? (
        <>
          {cryptoHeader()}
          {priceChanges()}
          {cryptoInfo()}
        </>
      ) : (
        <ActivityIndicator size={'large'} color={colors.secondary} />
      )}
    </View>
  );
};

export default Details;
