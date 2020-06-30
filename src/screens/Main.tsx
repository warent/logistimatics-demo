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
          .map<Coordinate>(snapshot => snapshot.data() as Coordinate)
          .sort((a, b) => a.order - b.order);
        setCoordinates(newCoords);
      });
    return () => subscriber();
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Map"
        component={() => <Map coordinates={coordinates} />}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" color={color} size={size} />
          ),
        }} />
      <Tab.Screen
        name="Commands"
        component={() => <Commands coordinates={coordinates} />}
        options={{
          tabBarLabel: 'Commands',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="forum" color={color} size={size} />
          ),
        }} />
    </Tab.Navigator>
  )
}