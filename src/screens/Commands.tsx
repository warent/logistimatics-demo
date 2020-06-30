import React from 'react';
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import MutableCoordinate from 'lib/components/MutableCoordinate';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

type Props = {
  coordinates: Coordinate[];
}

export default ({
  coordinates
}: Props) => {

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 32 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View>
            <GooglePlacesAutocomplete
              textInputProps={{

              }}
              placeholder='Add a new location'
              minLength={5}
              autoFocus={false}
              returnKeyType="done"
              listViewDisplayed
              fetchDetails
              onPress={(data, details = null) => {
                firestore()
                  .collection("coordinates")
                  .add({
                    order: coordinates.length,
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                  })
              }}
              query={{
                key: 'AIzaSyDVpBSFrJ0j8EixygTH3W5uktMS2TQVA4I',
                language: 'en',
                types: 'address',
              }}
              styles={{
                row: {
                  backgroundColor: "white"
                },
                textInputContainer: {
                  backgroundColor: 'black',
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                },
                textInput: {
                  marginLeft: 0,
                  marginRight: 0,
                  marginTop: 0,
                  marginBottom: 0,
                  height: 38,
                  color: 'black',
                  fontSize: 16,
                  borderRadius: 0
                },
              }}
              GooglePlacesDetailsQuery={{ fields: 'geometry' }}
              debounce={300}
            />
          </View>
        </ScrollView>

      </View>
      <FlatList
        data={coordinates}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.mutableCoordinateContainer}>
            <MutableCoordinate
              coordinate={item}
              onChange={(prop, value) => {
                firestore()
                  .collection("coordinates")
                  .doc(item.id)
                  .set({
                    [prop]: value,
                  }, { merge: true })
              }}
              onDelete={() => {
                firestore()
                  .collection("coordinates")
                  .doc(item.id)
                  .delete();
              }}
            />
          </View>
        )} />
    </View>
  );
}

const styles = StyleSheet.create({
  mutableCoordinateContainer: {
    margin: 16
  },
  container: {
    backgroundColor: "black",
    flex: 1
  },
  newAddressInput: {
    padding: 4
  }
});
