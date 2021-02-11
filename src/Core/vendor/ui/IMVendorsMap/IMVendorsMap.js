import React, { useState, useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from './styles';
import MAP_STYLE from '../../../../MapStyle';

function IMVendorMapScreen({ navigation, vendors }) {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markers, setMarkers] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Restaurants',
      headerRight: () => <Text />,
    });
    setMarkers(vendors);
  }, [vendors]);

  const onPressMarkerItem = (item) => {
    navigation.navigate('SingleVendor', {
      vendor: item,
    });
  };

  return (
    <View style={styles.container}>
      <MapView region={region} style={styles.map} customMapStyle={MAP_STYLE}>
        {markers.map((marker) => (
          <Marker
            onPress={() => onPressMarkerItem(marker)}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            title={marker.title}
          />
        ))}
      </MapView>
    </View>
  );
}

export default IMVendorMapScreen;
