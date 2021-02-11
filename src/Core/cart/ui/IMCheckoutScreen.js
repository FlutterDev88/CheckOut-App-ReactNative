import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Button from 'react-native-button';
import { useSelector, useDispatch } from 'react-redux';
import stripe from 'tipsi-stripe';
import { firebaseUser } from '../../firebase';
import PaymentRequestAPI from '../../payment/api';
import CartAPIManager from '../api/CartAPIManager';
import { overrideCart } from '../redux/actions';
import { setUserData } from '../../onboarding/redux/auth';
import dynamicStyles from './styles';
import { IMPlacingOrderModal } from '../../delivery/IMPlacingOrderModal/IMPlacingOrderModal';
import { IMLocalized } from '../../localization/IMLocalization';
import { logger } from 'react-native-logs';

var log = logger.createLogger();

function IMCheckoutScreen(props) {
  const appStyles = props.route.params.appStyles;
  const appConfig = props.route.params.appConfig;
  const styles = dynamicStyles(appStyles);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const currentUser = useSelector((state) => state.auth.user);
  const cartVendor = useSelector((state) => state.cart.vendor);
  const selectedPaymentMethod = useSelector(
    (state) => state.checkout.selectedPaymentMethod,
  );
  const shippingAddress = useSelector(
    (state) => state.checkout.shippingAddress,
  );

  const [placeOrderVisible, setPlaceOrderVisible] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const paymentRequestAPI = useRef(new PaymentRequestAPI(appConfig));
  const apiManager = useRef(new CartAPIManager(appConfig));

  useEffect(() => {
    if (cartItems?.length > 0) {
      const newTotalPrice = cartItems.reduce(
        (prev, next) => prev + next.price * next.quantity,
        0,
      );
      setTotalPrice(newTotalPrice);
    }
  }, [cartItems]);

  const handleNativePay = async (stripeCustomerID) => {
    const options = {
      requiredBillingAddressFields: ['all'],
      billing_address_required: false,
      total_price: `${totalPrice}`,
      currency_code: 'USD',
      shipping_countries: ['US', 'CA'], //android
      line_items: [
        {
          currency_code: 'USD',
          description: 'Pay ChekOut Services, Inc',
          unit_price: `${totalPrice}`,
          total_price: `${totalPrice}`,
          quantity: '1',
        },
      ],
    };

    const items = [
      {
        label: 'ChekOut Services, Inc',
        amount: `${totalPrice}`,
      },
    ];
    const token = await stripe.paymentRequestWithNativePay(options, items);

    if (!token.tokenId) {
      return;
    }

    const source = await paymentRequestAPI.current.addNewPaymentSource(
      stripeCustomerID,
      token.tokenId,
    );

    if (!source?.data?.response?.id) {
      alert(IMLocalized('An error occurred, please try again later'));
      return;
    }

    const stripeResponse = await completePayment(
      stripeCustomerID,
      source.data.response.id,
    );

    console.log("response" + stripeResponse)
    if (stripeResponse.success && stripeResponse?.data?.response?.id) {
      persistOrder();
      return;
    }
    alert(IMLocalized('Transaction failed, please select another card'));
  };

  const setStripeCustomerId = async () => {
    let stripeCustomerID = currentUser.stripeCustomerID;
    if (!stripeCustomerID) {
      const response = await paymentRequestAPI.current.getStripeCustomerID(
        currentUser.email,
        currentUser.id
      );

      stripeCustomerID = response;
      log.info("finding ID: " + response);
      firebaseUser.updateUserData(currentUser.id, {
        stripeCustomerID: response,
      });
      dispatch(
        setUserData({
          user: { ...currentUser, stripeCustomerID: response },
        }),
      );

      return stripeCustomerID;
    }

    log.info("stripeCustomerID: " + stripeCustomerID);
    return stripeCustomerID;
  };

  const persistOrder = () => {
    apiManager.current.placeOrder(
      cartItems,
      currentUser,
      shippingAddress,
      cartVendor,
      () => {
        setPlaceOrderVisible(false);
        dispatch(overrideCart([]));
        props.navigation.navigate('Home');
      },
    );
  };

  const completePayment = async (stripeCustomerID, source) => {

    const stripecompletePayment = await apiManager.current.chargeCustomer({
      customer: stripeCustomerID,
      currency: 'usd',
      amount: totalPrice * 100,
      source: source,
    });

    // console.log(stripecompletePayment)
    return stripecompletePayment
  };

  const handleNonNativePay = async (stripeCustomerID) => {
    const stripeResponse = await completePayment(
      stripeCustomerID,
      selectedPaymentMethod.cardId,
    );


    console.log("object: " + Object.getOwnPropertyNames(stripeResponse.data))
    stripeJson = stripeResponse.response
    console.log("response: " + stripeJson)
    if (stripeResponse.success && stripeResponse?.data?.id) {
      persistOrder();
      return;
    }
    alert(IMLocalized('Transaction failed, please select another card'));
  };

  const placeOrder = async () => {
    setPlaceOrderVisible(true);

    const stripeCustomerID = await setStripeCustomerId();

    if (!stripeCustomerID) {
      alert(IMLocalized('An error occurred, please try again later'));
      return;
    }

    if (selectedPaymentMethod.isNativePaymentMethod) {
      handleNativePay(stripeCustomerID);
    } else {
      handleNonNativePay(stripeCustomerID);
      log.info("used non-native pay")
    }
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => <View />,
    });
  });

  return (
    <View style={styles.container}>
      <Text style={styles.checkoutTitle}>{IMLocalized('  Please Confirm Your Order!')}</Text>
      {placeOrderVisible && (
        <IMPlacingOrderModal
          onCancel={() => setPlaceOrderVisible(false)}
          cartItems={cartItems}
          shippingAddress={shippingAddress}
          appStyles={appStyles}
          isVisible={true}
          user={currentUser}
        />
      )}
      <View style={styles.optionsContainer}>
        <Text style={styles.Title, styles.options}>{IMLocalized(' Payment')}</Text>
        <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate('Cards', { appConfig, appStyles })}>
          <Text >{selectedPaymentMethod.last4}</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.optionsContainer}>
        <Text style={styles.Title, styles.options}>{IMLocalized(' Deliver to')}</Text>
        <TouchableWithoutFeedback>
          <Text onPress={() => setVisible(true)}>
            {shippingAddress.length === 0
              ? IMLocalized('Select Address')
              : `${shippingAddress.line1} ${shippingAddress.line2}`}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.optionsContainer}>
        <Text style={styles.Title, styles.options}>{IMLocalized(' Total')}</Text>
        <TouchableWithoutFeedback>
          <Text>${totalPrice?.toFixed(2)}</Text>
        </TouchableWithoutFeedback>
      </View>

      <Button
        containerStyle={styles.actionButtonContainer}
        onPress={() => placeOrder()}
        style={styles.actionButtonText}>
        {IMLocalized('PLACE ORDER')}
      </Button>
    </View>
  );
}

export default IMCheckoutScreen;
