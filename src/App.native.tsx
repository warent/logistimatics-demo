import React from 'react';
import Home from 'lib/screens/Home';
import Map from 'lib/screens/Map';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

export default () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Map">
        <Stack.Screen name="Home" component={Home} options={{ header: () => null }} />
        <Stack.Screen name="Map" component={Map} options={{ title: "Logistimobile" }} />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
);