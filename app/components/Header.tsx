import { StyleSheet, View } from 'react-native';
import IconButton from './IconButton';
import { SizeConfig } from '../utils/SizeConfig';
import { Colors } from '../utils/Colors';
import AppText from './AppText';
import { Fonts } from '../utils/Fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Header = ({ headerTitle }: { headerTitle: string }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <IconButton
        icon={
          <MaterialIcons
            name="keyboard-arrow-left"
            size={SizeConfig.width * 6}
            color={Colors.textColor}
          />
        }
        onPress={() => navigation.goBack()}
        touchableOpacityStyle={styles.backBtn}
      />

      <AppText style={styles.title}>{headerTitle ?? 'Header'}</AppText>

      <View style={styles.headerSpacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SizeConfig.width * 5,
    paddingVertical: SizeConfig.height * 2,
  },

  backBtn: {
    borderRadius: SizeConfig.width * 10,
  },

  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: Fonts.semiBold,
    fontSize: SizeConfig.fontSize * 5,
    color: Colors.primary,
  },

  headerSpacer: {
    width: SizeConfig.width * 10,
  },
});
export default Header;
