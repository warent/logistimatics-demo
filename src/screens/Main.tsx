import React, { useEffect, useState } from 'react';
import Commands from 'lib/screens/Commands';
import Map from 'lib/screens/Map';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

const Tab = createBottomTabNavigator();

export default () => {

  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('coordinates')
      .onSnapshot(documentSnapshot => {
        const newCoords = documentSnapshot.docs
          .map<Coordinate>(snapshot => ({ ...snapshot.data(), id: snapshot.id }) as Coordinate)
          .sort((a, b) => a.order - b.order);
        setCoordinates(newCoords);
      });
    return () => subscriber();
  }, []);

  return (
    <Tab.Navigator initialRouteName="Commands">
      <Tab.Screen
        name="Map"
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" color={color} size={size} />
          ),
        }}>
        {() => <Map coordinates={coordinates} />}
      </Tab.Screen>
      <Tab.Screen
        name="Commands"
        options={{
          tabBarLabel: 'Commands',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="forum" color={color} size={size} />
          ),
        }}
      >
        {() => (<Commands coordinates={coordinates} />)}
      </Tab.Screen>
    </Tab.Navigator>
  )
}