import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/HomeScreen/Home';
import Details from './src/screens/DetailsScreen/Details';
import {ScreenNames} from './src/ScreenNames';
import io from 'socket.io-client';
import {Platform} from 'react-native';
// import {SafeAreaView, Text, View} from 'react-native';

//* For Android simulator Locally to connect to localhost, you must connect to ip of your device:
//* which is: 192.168.1.2
//* For IOS simulator Locally is just 127.0.0.1
// export const socket = io('http://127.0.0.1:3000');

const Stack = createNativeStackNavigator();

export const socket =
  Platform.OS === 'ios'
    ? io(process.env.SOCKET_IO_URL_IOS as string)
    : io(process.env.SOCKET_IO_URL_ANDROID as string);

socket.on('connect', () => {
  console.log('Socket is Connected');
});

function App(): JSX.Element {
  return (
    // <SafeAreaView style={{flex: 1}}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={ScreenNames.Home}
          component={Home}
          // options={{
          //   headerShown: false,
          // }}
        />
        <Stack.Screen name={ScreenNames.Details} component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
    // </SafeAreaView>
  );
}

export default App;
