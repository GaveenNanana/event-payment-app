import React, { useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StripeProvider } from '@stripe/stripe-react-native';

// Import screens and navigations
import BottomTabNav from './navigations/BottomTabNav';
import Welcome from './Welcome';
import Login from './screens/Login';
import Register from './screens/Register';

import Payment from './screens/Customer/Payment';
import AddCard from './screens/Customer/AddCard';
import Favourites from './screens/Customer/Favourites';
import Receipts from './screens/Customer/Receipts';
import Wallet from './screens/Customer/Wallet';
import Vendor_Home from './screens/Vendor/Vendor_Home';
import BottomTabNav_Vendor from './navigations/BottomTabNav_Vendor';
import Vendor_Generate_QR from './screens/Vendor/Vendor_Generate_QR';
import Vendor_Account from './screens/Vendor/Vendor_Account';
import Vendor_My_Business from './screens/Vendor/Vendor_My_Business';
import Vendor_Withdraw_Earnings from './screens/Vendor/Vendor_Withdraw_Earnings';
import Vendor_Bank_Details from './screens/Vendor/Vendor_Bank_Details';
import SingleBusinessView from './screens/Customer/SingleBusinessView';
import QRScanner from './screens/Customer/QRScanner';
import ProceedPay from './screens/Customer/ProceedPay';
import PaymentSuccess from './screens/Customer/PaymentSuccess';
import Vendor_ScanToPay from './screens/Vendor/Vendor_ScanToPay';
import Vendor_Login from './screens/Vendor/Vendor_Login';
import Vendor_Register from './screens/Vendor/Vendor_Register';
import Vendor_Business_Details from './screens/Vendor/Vendor_Business_Details';
import Vendor_Update_business from './screens/Vendor/Vendor_Update_business';
import Vendor_Transactions from './screens/Vendor/Vendor_Transactions';
import Vendor_Update_Bank_Details from './screens/Vendor/Vendor_Update_Bank_Details';
import Vendor_withdraw_Success from './screens/Vendor/Vendor_withdraw_Success';
import VendorList from './screens/Customer/VendorList';
import EditProfile from './screens/Customer/EditProfile';

// Prevent SplashScreen from auto-hiding until ready
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    black: require('./assets/fonts/Inter-Black.ttf'),
    bold: require('./assets/fonts/Inter-Bold.ttf'),
    medium: require('./assets/fonts/Inter-Medium.ttf'),
    regular: require('./assets/fonts/Inter-Regular.ttf'),
    semiBold: require('./assets/fonts/Inter-SemiBold.ttf'),
  });

  // State for detecting first app launch
  const [firstLaunch, setFirstLaunch] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem('@firstLaunch');
        if (value === null) {
          // First launch detected
          await AsyncStorage.setItem('@firstLaunch', 'true');
          setFirstLaunch(true);
        } else {
          // Not the first launch
          setFirstLaunch(false);
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
        setFirstLaunch(false); // Default to not first launch on error
      }
    };

    checkFirstLaunch();
  }, []);

  // Hide SplashScreen after fonts are loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Render null until fonts and first launch state are loaded
  if (!fontsLoaded || firstLaunch === null) {
    return null;
  }

  return (
    <StripeProvider publishableKey="pk_test_51R44a02YjkLIszipa6adE8eHgF4ewVi83rg2nGzzPytb00LCGXmj5dxlOsxsixhlv5cWQa2Ogr9Re5oBu2P1mhYT00c22SmSz7">
      <NavigationContainer onReady={onLayoutRootView}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="BottomTabNavigation" component={BottomTabNav} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="AddCard" component={AddCard} />
          <Stack.Screen name="Favourites" component={Favourites} />
          <Stack.Screen name="Receipts" component={Receipts} />
          <Stack.Screen name="Wallet" component={Wallet} />
          <Stack.Screen name="SingleBusinessView" component={SingleBusinessView} />
          <Stack.Screen name="QRScanner" component={QRScanner} />
          <Stack.Screen name="ProceedPay" component={ProceedPay} />
          <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
          <Stack.Screen name="VendorList" component={VendorList} />
          <Stack.Screen name="EditProfile" component={EditProfile} />

          <Stack.Screen name="Vendor_Login" component={Vendor_Login} />
          <Stack.Screen name="Vendor_Register" component={Vendor_Register} />
          <Stack.Screen name="Vendor_Business_Details" component={Vendor_Business_Details} />
          <Stack.Screen name="Vendor_Home" component={Vendor_Home} />
          <Stack.Screen name="BottomTabNav_Vendor" component={BottomTabNav_Vendor} />
          <Stack.Screen name="Vendor_Generate_QR" component={Vendor_Generate_QR} />
          <Stack.Screen name="Vendor_Account" component={Vendor_Account} />
          <Stack.Screen name="Vendor_My_Business" component={Vendor_My_Business} />
          <Stack.Screen name="Vendor_Withdraw_Earnings" component={Vendor_Withdraw_Earnings} />
          <Stack.Screen name="Vendor_Bank_Details" component={Vendor_Bank_Details} />
          <Stack.Screen name="Vendor_ScanToPay" component={Vendor_ScanToPay} />
          <Stack.Screen name="Vendor_UpdateBusiness" component={Vendor_Update_business} />
          <Stack.Screen name="Vendor_Transactions" component={Vendor_Transactions} />
          <Stack.Screen name="Vendor_Update_Bank_Details" component={Vendor_Update_Bank_Details} />
          <Stack.Screen name="Vendor_withdraw_Success" component={Vendor_withdraw_Success} />

        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}
