import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

type Props = {
  coordinates: Coordinate[];
}
export default ({
  coordinates
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LogistimaticsDemo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 64,
  },
  content: {
    maxWidth: 300,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      web: {
        position: "absolute",
        width: "100%",
        height: "100vh"
      }
    })
  }
});
