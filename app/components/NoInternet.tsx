import { View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from './AppText';
import { Colors } from '../utils/Colors';
import { SizeConfig } from '../utils/SizeConfig';
import { Fonts } from '../utils/Fonts';


const NoInternetScreen = () => {
  return (
   
      <View style={styles.container}>
        <Image
          source={require('../assets/images/global/noInternet.png')}
          style={styles.image}
        />
        <AppText style={styles.title}>
          Oops! No Internet Connection
        </AppText>
        <AppText style={styles.subtitle}>
          Please check your network settings and try again.
        </AppText>
      </View>

  );
};

export default NoInternetScreen;

const styles = StyleSheet.create({
 
  container: {
    height : '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SizeConfig.width * 5,
    // backgroundColor: 'red',
  },
  image: {
    width: SizeConfig.width * 40,
    height: SizeConfig.width * 65,
    resizeMode: 'contain',
    marginBottom: SizeConfig.height * 3,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: SizeConfig.fontSize * 4.5,
    color: Colors.textColor,
    textAlign: 'center',
    marginBottom: SizeConfig.height * 1.5,
  },
  subtitle: {
    fontFamily: Fonts.medium,
    fontSize: SizeConfig.fontSize * 3.5,
    color: Colors.textColor,
    textAlign: 'center',
  },
});
