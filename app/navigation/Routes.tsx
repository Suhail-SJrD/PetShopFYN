import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home/Home';
import SplashScreen from '../screens/auth/SplashScreen';
import { NavigationTypes } from './NavigationTypes';
import NewPetForm from '../screens/addNewPet/NewPetForm';
import CaptureImage from '../screens/addNewPet/CaptureImage';
import Cart from '../screens/cart/Cart';
import NoInternetScreen from '../components/NoInternet';
import SearchScreen from '../screens/home/SearchScreen';

const Routes = () => {
  const Stack = createNativeStackNavigator<NavigationTypes>();

  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="NewPetForm" component={NewPetForm} />
      <Stack.Screen name="CaptureImage" component={CaptureImage} />
      <Stack.Screen name="Cart" component={Cart} />

      {/* Utility CGlobal comp */}

      <Stack.Screen name="NoInternetScreen" component={NoInternetScreen} />
    </Stack.Navigator>
  );
};

export default Routes;
