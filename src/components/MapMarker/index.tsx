import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Marker, LatLng } from 'react-native-maps';

type Props = {
  coordinate: LatLng;
  variant: "start" | "middle" | "end";
}
export default ({ coordinate, variant }: Props) => (
  <Marker
    coordinate={coordinate}
  >
    {
      variant !== "start" && <View style={[styles.marker, variant === "end" && styles.markerEnd]} />
    }
  </Marker>
)

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
  },
  markerEnd: {
    backgroundColor: "red"
  }
});