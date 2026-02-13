import { Image, StatusBar, View, StyleSheet } from 'react-native';
import { SizeConfig } from '../../utils/SizeConfig';
import { Colors } from '../../utils/Colors';
import AppText from '../../components/AppText';
import { Fonts } from '../../utils/Fonts';
import Button from '../../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationTypes } from '../../navigation/NavigationTypes';
import { SafeAreaView } from 'react-native-safe-area-context';

type SplashScreenProps = NativeStackScreenProps<
  NavigationTypes,
  'SplashScreen'
>;

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

      <View style={styles.wrapper}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/global/dogLogo.png')}
            style={styles.logo}
          />
        </View>

        <Image
          source={require('../../assets/images/splashScreen/heroSplash.png')}
          style={styles.heroImage}
        />

        <View style={{ marginBottom: SizeConfig.height * 2 }}>
          <View style={styles.titleWrapper}>
            <AppText style={styles.title}>
              Find a New <AppText style={styles.highlight}>Pet For</AppText>
            </AppText>

            <AppText style={styles.you}>You</AppText>
          </View>

          <AppText style={styles.desc}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure,
            earum.
          </AppText>
        </View>

        <Button
          buttonText="Continue"
          onPress={() => {
            navigation.navigate('Home');
          }}
          touchableOpacityStyle={{ width: SizeConfig.width * 60 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  wrapper: {
    flex: 1,
    paddingVertical: SizeConfig.height * 5,
    alignItems: 'center',
    gap: SizeConfig.height * 2,
  },
  logoContainer: {
    backgroundColor: Colors.primary,
    width: SizeConfig.width * 12,
    height: SizeConfig.width * 13,
    borderRadius: SizeConfig.width * 4,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  logo: {
    width: SizeConfig.width * 10,
    height: SizeConfig.width * 10,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  heroImage: {
    width: SizeConfig.width * 90,
    height: SizeConfig.height * 50,
    resizeMode: 'contain',
    // backgroundColor : 'red'
  },
  titleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: SizeConfig.fontSize * 7,
    color: Colors.secondaryBlack,
    textAlign: 'center',
  },
  highlight: {
    color: Colors.primary,
  },
  you: {
    fontFamily: Fonts.bold,
    fontSize: SizeConfig.fontSize * 7,
    textAlign: 'center',
    color: Colors.primary,
  },
  desc: {
    fontFamily: Fonts.light,
    fontSize: SizeConfig.fontSize * 3,
    color: Colors.grayText,
    textAlign: 'center',
    width: SizeConfig.width * 80,
  },
});
