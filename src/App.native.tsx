import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Main from 'lib/screens/Main'

const Stack = createStackNavigator();

export default () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} options={{ title: "Logistimobile" }} />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
);