import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/HomeScreen/Home';
import Details from './src/screens/DetailsScreen/Details';
import {ScreenNames} from './src/ScreenNames';
import io from 'socket.io-client';
import {Platform} from 'react-native';
import {SOCKET_IO_URL_IOS, SOCKET_IO_URL_ANDROID} from '@env';

//* For Android simulator Locally to connect to localhost, you must connect to ip of your device:
//* you can get the ip of your device by running the command ifconfig (MAC) or ip confing (WINDOWS)
//* For IOS simulator Locally is just 127.0.0.1

const Stack = createNativeStackNavigator();

export const socket =
  Platform.OS === 'ios' ? io(SOCKET_IO_URL_IOS) : io(SOCKET_IO_URL_ANDROID);

socket.on('connect', () => {
  console.log('Socket is Connected');
});

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={ScreenNames.Home} component={Home} />
        <Stack.Screen name={ScreenNames.Details} component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
