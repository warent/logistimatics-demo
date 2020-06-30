import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
  coordinate: Coordinate;
  onChange: (prop: "longitude" | "latitude", value: number) => void;
  onDelete: () => void;
}

export default ({
  coordinate,
  onChange,
  onDelete
}: Props) => {

  const [mutableCoord, setMutableCoords] = useState<MutableCoordinate>({ ...coordinate });
  useEffect(() => {
    setMutableCoords({ ...coordinate })
  }, [coordinate]);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Stop {coordinate.order + 1}
        </Text>
      </View>
      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.fieldTitle}>
            Latitude
        </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={mutableCoord.latitude.toString()}
            onChangeText={val => setMutableCoords(nextVal => ({ ...nextVal, latitude: val }))}
            onEndEditing={({ nativeEvent: { text } }) => {
              const nextValue = +text;
              if (isNaN(nextValue)) {
                setMutableCoords(nextVal => ({ ...nextVal, latitude: coordinate.latitude }))
                return;
              }
              onChange("latitude", nextValue);
            }}
            returnKeyType="done"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.fieldTitle}>
            Longitude
        </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={mutableCoord.longitude.toString()}
            onChangeText={val => setMutableCoords(nextVal => ({ ...nextVal, longitude: val }))}
            onEndEditing={({ nativeEvent: { text } }) => {
              const nextValue = +text;
              if (isNaN(nextValue)) {
                setMutableCoords(nextVal => ({ ...nextVal, longitude: coordinate.longitude }))
                return;
              }
              onChange("longitude", nextValue);
            }}
            returnKeyType="done"
          />
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => (
            Alert.alert(
              "Warning",
              `Are you sure you want to delete Stop ${coordinate.order + 1}`,
              [
                {
                  text: "Yes",
                  onPress: onDelete
                },
                {
                  text: "I already pressed delete so yes",
                  onPress: onDelete
                },
              ]
            )
          )}>
            <View>
              <Text>
                Delete
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: 4,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    marginLeft: 16,
    color: "white"
  },
  fieldTitle: {
    fontSize: 16
  },
  container: {
  },
  input: {
    backgroundColor: "white",
    color: "black",
    marginVertical: 6,
    borderColor: "black",
    borderWidth: 1,
    padding: 4,
    fontSize: 16
  },
  inputContainer: {
    paddingBottom: 8
  },
  inputsContainer: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 16
  }
});
