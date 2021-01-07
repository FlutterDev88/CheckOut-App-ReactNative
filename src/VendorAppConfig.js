import { IMLocalized, setI18nConfig } from './Core/localization/IMLocalization';
import DynamicAppStyles from './DynamicAppStyles';

setI18nConfig();

const regexForNames = /^[a-zA-Z]{2,25}$/;
const regexForPhoneNumber = /\d{9}$/;

const VendorAppConfig = {
  isMultiVendorEnabled: true,
  isSMSAuthEnabled: false,
  appIdentifier: 'rn-restaurant-android',
  tables: {
    VENDOR: 'vendors',
    VENDOR_ORDERS: 'restaurant_orders',
    VENDOR_DELIVERIES: 'restaurant_deliveries',
    VENDOR_REVIEWS: 'vendor_reviews',
    VENDOR_PRODUCTS: 'vendor_products',
    RESERVATIONS: 'reservations',
  },
  onboardingConfig: {
    welcomeTitle: IMLocalized('Welcome to ChekOut'),
    welcomeCaption: IMLocalized(
      'Order food from restaurants around you and track your orders in real-time.',
    ),
    walkthroughScreens: [
      {
        icon: require('../assets/icons/restaurant-menu.png'),
        title: IMLocalized('Welcome to ChekOut'),
        description: IMLocalized(
          'Log in and order delicious food from restaurants around you.',
        ),
      },
      {
        icon: require('../assets/icons/delivery-icon.png'),
        title: IMLocalized('Order Food'),
        description: IMLocalized(
          "Hungry? Order food in just a few clicks and we'll take care of you..",
        ),
      },
      {
        icon: require('../assets/icons/calendar-grid-icon.png'),
        title: IMLocalized('Reorder and Save'),
        description: IMLocalized(
          'Reorder in one click. Bookmark your favorite restaurants.',
        ),
      },
      {
        icon: require('../assets/icons/binoculars.png'),
        title: IMLocalized('Track Delivery'),
        description: IMLocalized(
          'Track your food order in real-time with an interactive map.',
        ),
      },
      {
        icon: require('../assets/icons/apple.png'),
        title: IMLocalized('Seamless Payments'),
        description: IMLocalized(
          'Pay with your credit cards, Apple Pay or Android Pay, with one click.',
        ),
      },
    ],
  },
  drawerMenuConfig: {
    adminDrawerConfig: {
      upperMenu: [
        {
          title: IMLocalized('HOME'),
          icon: DynamicAppStyles.iconSet.shop,
          navigationPath: 'Restaurants',
        },
        {
          title: IMLocalized('ORDERS'),
          icon: DynamicAppStyles.iconSet.delivery,
          navigationPath: 'AdminOrder',
        },
        {
          title: IMLocalized('DELIVERY'),
          icon: DynamicAppStyles.iconSet.delivery,
          navigationPath: 'Map',
        },
      ],
      lowerMenu: [
        {
          title: IMLocalized('LOG OUT'),
          icon: DynamicAppStyles.iconSet.shutdown,
          action: 'logout',
        },
      ],
    },
    vendorDrawerConfig: {
      upperMenu: [
        {
          title: IMLocalized('HOME'),
          icon: DynamicAppStyles.iconSet.shop,
          navigationPath: 'Home',
        },
        {
          title: IMLocalized('CUISINES'),
          icon: DynamicAppStyles.iconSet.menu,
          navigationPath: 'CategoryList',
        },
        {
          title: IMLocalized('SEARCH'),
          icon: DynamicAppStyles.iconSet.search,
          navigationPath: 'Search',
        },
        {
          title: IMLocalized('CART'),
          icon: DynamicAppStyles.iconSet.cart,
          navigationPath: 'Cart',
        },
        {
          title: IMLocalized('RESERVATIONS'),
          icon: DynamicAppStyles.iconSet.reserve,
          navigationPath: 'ReservationHistoryScreen',
        },
        {
          title: IMLocalized('PROFILE'),
          icon: DynamicAppStyles.iconSet.profile,
          navigationPath: 'MyProfile',
        },
        {
          title: IMLocalized('ORDERS'),
          icon: DynamicAppStyles.iconSet.delivery,
          navigationPath: 'OrderList',
        },
      ],
      lowerMenu: [
        {
          title: IMLocalized('LOG OUT'),
          icon: DynamicAppStyles.iconSet.shutdown,
          action: 'logout',
        },
      ],
    },
    customerDrawerConfig: {
      upperMenu: [
        {
          title: IMLocalized('HOME'),
          icon: DynamicAppStyles.iconSet.shop,
          navigationPath: 'Restaurants',
        },
        {
          title: IMLocalized('CUISINES'),
          icon: DynamicAppStyles.iconSet.menu,
          navigationPath: 'CategoryList',
        },
        {
          title: IMLocalized('SEARCH'),
          icon: DynamicAppStyles.iconSet.search,
          navigationPath: 'Search',
        },
        {
          title: IMLocalized('CART'),
          icon: DynamicAppStyles.iconSet.cart,
          navigationPath: 'Cart',
        },
        {
          title: IMLocalized('PROFILE'),
          icon: DynamicAppStyles.iconSet.profile,
          navigationPath: 'MyProfile',
        },
        {
          title: IMLocalized('ORDERS'),
          icon: DynamicAppStyles.iconSet.delivery,
          navigationPath: 'OrderList',
        },
      ],
      lowerMenu: [
        {
          title: IMLocalized('LOG OUT'),
          icon: DynamicAppStyles.iconSet.shutdown,
          action: 'logout',
        },
      ],
    },
    vendorDrawer: {
      upperMenu: [
        {
          title: IMLocalized('MANAGE ORDERS'),
          icon: DynamicAppStyles.iconSet.shop,
          navigationPath: 'Home',
        },
        {
          title: IMLocalized('MANAGE PRODUCTS'),
          icon: DynamicAppStyles.iconSet.foods,
          navigationPath: 'Products',
        },
      ],
      lowerMenu: [
        {
          title: IMLocalized('LOG OUT'),
          icon: DynamicAppStyles.iconSet.shutdown,
          action: 'logout',
        },
      ],
    },
    driverDrawerConfig: {
      upperMenu: [
        {
          title: IMLocalized('Home'),
          icon: DynamicAppStyles.iconSet.shop,
          navigationPath: 'Home',
        },
        {
          title: IMLocalized('ORDERS'),
          icon: DynamicAppStyles.iconSet.delivery,
          navigationPath: 'OrderList',
        },
        {
          title: IMLocalized('PROFILE'),
          icon: DynamicAppStyles.iconSet.profile,
          navigationPath: 'MyProfile',
        },
      ],
      lowerMenu: [
        {
          title: IMLocalized('LOG OUT'),
          icon: DynamicAppStyles.iconSet.shutdown,
          action: 'logout',
        },
      ],
    }
  },
  tosLink: 'https://www.orderchekout.com/eula-instachatty/',
  editProfileFields: {
    sections: [
      {
        title: IMLocalized('PUBLIC PROFILE'),
        fields: [
          {
            displayName: IMLocalized('First Name'),
            type: 'text',
            editable: true,
            regex: regexForNames,
            key: 'firstName',
            placeholder: 'Your first name',
          },
          {
            displayName: IMLocalized('Last Name'),
            type: 'text',
            editable: true,
            regex: regexForNames,
            key: 'lastName',
            placeholder: 'Your last name',
          },
        ],
      },
      {
        title: IMLocalized('PRIVATE DETAILS'),
        fields: [
          {
            displayName: IMLocalized('E-mail Address'),
            type: 'text',
            editable: false,
            key: 'email',
            placeholder: 'Your email address',
          },
          {
            displayName: IMLocalized('Phone Number'),
            type: 'text',
            editable: true,
            regex: regexForPhoneNumber,
            key: 'phone',
            placeholder: 'Your phone number',
          },
        ],
      },
    ],
  },
  userSettingsFields: {
    sections: [
      {
        title: IMLocalized('SECURITY'),
        fields: [
          {
            displayName: IMLocalized('Allow Push Notifications'),
            type: 'switch',
            editable: true,
            key: 'push_notifications_enabled',
            value: true,
          },
          {
            ...Platform.OS === 'ios' ?
              {
                displayName: IMLocalized('Enable Face ID / Touch ID'),
                type: 'switch',
                editable: true,
                key: 'face_id_enabled',
                value: false,
              } : {}
          },
        ],
      },
      {
        title: IMLocalized('PUSH NOTIFICATIONS'),
        fields: [
          {
            displayName: IMLocalized('Order updates'),
            type: 'switch',
            editable: true,
            key: 'order_updates',
            value: true,
          },
          {
            displayName: IMLocalized('New arrivals'),
            type: 'switch',
            editable: false,
            key: 'new_arrivals',
            value: true,
          },
          {
            displayName: IMLocalized('Promotions'),
            type: 'switch',
            editable: false,
            key: 'promotions',
            value: true,
          },
        ],
      },
      {
        title: IMLocalized('ACCOUNT'),
        fields: [
          {
            displayName: IMLocalized('Save'),
            type: 'button',
            key: 'savebutton',
          },
        ],
      },
    ],
  },
  contactUsFields: {
    sections: [
      {
        title: IMLocalized('CONTACT'),
        fields: [
          {
            displayName: IMLocalized('Address'),
            type: 'text',
            editable: false,
            key: 'contacus',
            value: '214 West 29th Street, New York, NY 10001',
          },
          {
            displayName: IMLocalized('E-mail us'),
            value: 'support@orderchekout.com',
            type: 'text',
            editable: false,
            key: 'email',
            placeholder: 'Your email address',
          },
        ],
      },
      {
        title: '',
        fields: [
          {
            displayName: IMLocalized('Call Us'),
            type: 'button',
            key: 'savebutton',
          },
        ],
      },
    ],
  },
  contactUsPhoneNumber: '+16504859694',
  APIs: {
    firebase: 'firebase',
  },
  API_TO_USE: 'firebase', // "firebase", "wooCommerce", "shopify",
  stripeEnv: {
    API: {
      baseURL: 'http://127.0.0.1:8000/', //your copied heroku link
      timeout: 30000,
    },
  },
  STRIPE_CONFIG: {
    PUBLISHABLE_KEY: 'pk_test_LSo5mTIQqkRiTWd0eBMSDAXf00QZGCttt3', // "pk_test_..." in test mode and ""pk_live_..."" in live mode
    MERCHANT_ID: 'merchant.com.orderchekout.vendor.ios',
    ANDROID_PAYMENT_MODE: 'test', // test || production
  },
  GOOGLE_SIGNIN_CONFIG: {
    SCOPES: ['https://www.googleapis.com/auth/drive.photos.readonly'],
    WEB_CLIENT_ID:
      '706061484183-l0l58dds4kg329fh1trbiha1ci5rqm5n.apps.googleusercontent.com', // from google-services.json file
    OFFLINE_ACCESS: true,
  },
  FIREBASE_COLLECTIONS: {
    USERS: 'users',
    PAYMENT_METHODS: 'payment_methods',
    STRIPE_CUSTOMERS: 'stripe_customers',
    CATEGORIES: 'vendor_categories',
    CHARGES: 'charges',
    ORDERS: 'restaurant_orders',
    SOURCES: 'sources',
    PRODUCTS: 'vendor_products',
    SHIPPING_METHODS: 'shipping_methods',
  },
};

export default VendorAppConfig;
