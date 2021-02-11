import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import dynamicStyles from './styles';
import IMRatingReview from '../../components/IMRatingReview/IMRatingReview';
import {Appearance} from 'react-native-appearance';
import IMVendorFilterModal from '../../components/IMVendorFilterModal/IMVendorFilterModal';

function IMVendorsScreen({navigation, vendors, appConfig, appStyles}) {
  const styles = dynamicStyles(appStyles);
  const [filters, setFilters] = useState({});
  const [isVisible, setVisible] = useState(false);

  const COLOR_SCHEME = Appearance.getColorScheme();

  const onPressVendorItem = item => {
    navigation.navigate('SingleVendor', {
      vendor: item,
    });
  };

  const onPressReview = item => {
    navigation.navigate('Reviews', {
      entityID: item.id,
      appStyles,
      appConfig,
    });
  };

  const onViewFilter = currentFilter => {
    setFilters(currentFilter);
    setVisible(true);
  };

  const renderVendorItem = ({item}) => {
    let count = item.reviewsCount === undefined ? 0 : item.reviewsCount;
    let reviewAvg =
      item.reviewsCount === undefined
        ? 0
        : Math.fround(item.reviewsSum / item.reviewsCount);
    reviewAvg = Number(Math.round(reviewAvg + 'e' + 2) + 'e-' + 2);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onPressVendorItem(item)}>
        <View style={styles.vendorItemContainer}>
          <FastImage
            placeholderColor={appStyles.colorSet[COLOR_SCHEME].grey9}
            style={styles.foodPhoto}
            source={{uri: item.photo}}
          />
          <View style={styles.foodInfo}>
            <Text style={styles.foodName}>{item.title}</Text>
          </View>
          <Text
            onPress={() => onViewFilter(item.filters)}
            style={styles.description}>
            Outdoor Seats, Free WIFI
          </Text>
          <IMRatingReview
            appStyles={appStyles}
            onPressReview={() => onPressReview(item)}
            number={count}
            rating={reviewAvg}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <IMVendorFilterModal
        appStyles={appStyles}
        isVisible={isVisible}
        filters={filters}
        close={() => setVisible(false)}
      />
      <FlatList
        initialNumToRender={12}
        data={vendors}
        renderItem={renderVendorItem}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  );
}

export default IMVendorsScreen;
