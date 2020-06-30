import React, { useMemo, useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import MapMarker from "lib/components/MapMarker";

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

  const coordComponents = useMemo(() => {
    const result = [];
    for (let i = 0; i < coordinates.length; i++) {
      result.push(<MapMarker key={`coord-marker-${i}`} coordinate={coordinates[i]} variant={i === 0 ? "start" : i === coordinates.length - 1 ? "end" : "middle"} />);
      if (i < coordinates.length - 1) {
        result.push(<Polyline
          key={`coord-line-${i}`}
          coordinates={[
            coordinates[i],
            coordinates[i + 1],
          ]}
          strokeColor="#000"
          strokeWidth={2}
        />)
      }
    }
    return result;
  }, [coordinates]);

  if (!coordinates.length) {
    return (
      <ActivityIndicator />
    )
  }

  return (
    <>
      <MapView
        style={styles.mapView}
        initialRegion={{
          ...coordinates[0],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {coordComponents}
      </MapView>
    </>
  );
}

const styles = StyleSheet.create({
  mapView: {
    width: "100%",
    flex: 1
  },
  marker: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "black",
  }
});