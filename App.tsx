import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './app/navigation/Routes';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { NetworkProvider } from './app/context/NetworkProvider';

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NetworkProvider>
          <Routes />
        </NetworkProvider>
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
}

export default App;
