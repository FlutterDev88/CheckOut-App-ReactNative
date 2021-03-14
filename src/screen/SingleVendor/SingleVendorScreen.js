import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';
import DynamicAppStyles from '../../DynamicAppStyles';
import { firebase } from '../../Core/firebase/config';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import { TNEmptyStateView } from '../../Core/truly-native';
import Modal from 'react-native-modal';
import SingleItemDetail from '../SingleItemDetail/SingleItemDetailScreen';
import styles from './styles';
import { storeCartToDisk } from '../../Core/cart/redux/reducers';
import { connect, useSelector } from 'react-redux';
import VendorAppConfig from './../../VendorAppConfig';

function SingleVendorScreen(props) {
  const { navigation, route } = props;
  const singleVendor = route.params.vendor;
  const singleCategory = route.params.category; // used only for single vendor config

  const emptyStateConfig = {
    title: IMLocalized('No Items'),
    description: IMLocalized(
      'There are currently no items under this vendor. Please wait until the vendor completes their profile.',
    ),
  };

  const [data, setData] = useState([]);
  const [refreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [vendor] = useState(singleVendor);
  const [category] = useState(singleCategory);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartVendor = useSelector((state) => state.cart.vendor);

  // const ref = useRef(null);

  const ref = VendorAppConfig.isMultiVendorEnabled
    ? useRef(
        firebase
          .firestore()
          .collection(VendorAppConfig.tables.VENDOR_PRODUCTS)
          .where('vendorID', '==', vendor.id),
      )
    : useRef(
        firebase
          .firestore()
          .collection(VendorAppConfig.tables.VENDOR_PRODUCTS)
          .where('categoryID', '==', category?.id),
      );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: vendor?.title || category?.title,
      headerRight: () => <View />,
    });

    if (VendorAppConfig.isMultiVendorEnabled) {
      navigation.setOptions({
        headerRight: () => (
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ReservationScreen', {
                  vendor: vendor,
                  appConfig: VendorAppConfig,
                })
              }>
              <Image
                style={styles.icon}
                source={require('../../../assets/icons/reservation.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Reviews', {
                  entityID: vendor.id,
                  appStyles: DynamicAppStyles,
                  appConfig: VendorAppConfig,
                })
              }>
              <Image
                style={styles.icon}
                source={require('../../../assets/icons/review.png')}
              />
            </TouchableOpacity>
          </View>
        ),
      });
    }
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = ref.current.onSnapshot(onCollectionUpdate);

    return () => {
      unsubscribe();
    };
  }, [ref]);

  const onCollectionUpdate = (querySnapshot) => {
    const vendorProducts = [];
    querySnapshot.forEach((doc) => {
      vendorProducts.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setData(vendorProducts);
    setLoading(false);
  };

  const onPress = (item) => {
    setSelectedItem(item);
    setIsVisible(true);
  };

  const renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      titleStyle={styles.title}
      subtitle={
        <View style={styles.subtitleView}>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      }
      onPress={() => onPress(item)}
      rightIcon={
        <Image style={styles.rightIcon} source={{ uri: item.photo }} />
      }
      containerStyle={{ borderBottomWidth: 0 }}
    />
  );
  return (
    <View style={styles.container}>
      {data.length === 0 && !loading && (
        <View style={styles.emptyViewContainer}>
          <TNEmptyStateView
            emptyStateConfig={emptyStateConfig}
            appStyles={DynamicAppStyles}
          />
        </View>
      )}
      <Modal
        style={styles.modalContainer}
        swipeDirection="down"
        onModalHide={async () => storeCartToDisk(cartItems, cartVendor)}
        onSwipeComplete={() => setIsVisible(false)}
        isVisible={isVisible}>
        <SingleItemDetail
          close={() => setIsVisible(false)}
          vendor={vendor}
          foodItem={selectedItem}
        />
      </Modal>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        initialNumToRender={5}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

SingleVendorScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

export default SingleVendorScreen;
