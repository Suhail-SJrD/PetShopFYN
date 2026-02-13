import {
  Image,
  StatusBar,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../utils/Colors';
import { SizeConfig } from '../../utils/SizeConfig';
import AppText from '../../components/AppText';
import { Fonts } from '../../utils/Fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconButton from '../../components/IconButton';
import InputBox from '../../components/InputBox';
import Button from '../../components/Button';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import Card from './components/Card';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationTypes } from '../../navigation/NavigationTypes';
import usePetStore from '../../store/PetsStore';
import { useNetwork } from '../../context/NetworkProvider';
import NoInternetScreen from '../../components/NoInternet';
import CustomToast from '../../components/CustomToast';

type HomeType = NativeStackScreenProps<NavigationTypes, 'Home'>;

const Home = ({ navigation }: HomeType) => {
  const [bannerImageURL, setBannerImageURL] = useState('');

  const { isConnected } = useNetwork();

  const pets = usePetStore(state => state.pets);

  const getBannerImage = async () => {
    try {
      if (!isConnected) return null;

      const response = await axios.get(
        'https://dog.ceo/api/breeds/image/random',
      );
      setBannerImageURL(response?.data?.message ?? '');
    } catch (error) {
      CustomToast({
        type: 'error',
        title: 'Somthing went wrong',
        description: 'Pet Listing is not updated!',
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      getBannerImage();
    }, []),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <Image
              source={require('../../assets/images/global/dogLogo.png')}
              style={styles.logo}
            />
            <AppText style={styles.title}>Pett's</AppText>
          </View>

          <IconButton
            icon={
              <MaterialIcons
                name="shopping-cart"
                size={SizeConfig.width * 5}
                color={Colors.textColor}
              />
            }
            onPress={() => {
              navigation.navigate('Cart');
            }}
            touchableOpacityStyle={styles.cartBtn}
          />
        </View>

        <InputBox
          inputValue=""
          setInputValue={() => {}}
          pressableStyle={styles.searchBox}
          lshIcon={
            <MaterialIcons
              name="search"
              size={SizeConfig.width * 5}
              color={Colors.textColor}
            />
          }
          editable={false}
          onPress={() => {
            navigation.navigate('SearchScreen');
          }}
        />

        {!isConnected ? (
          <NoInternetScreen />
        ) : (
          <>
            <View style={styles.banner}>
              <Image
                source={require('../../assets/images/home/bannerBgImg.png')}
                style={styles.bannerBg}
              />

              <View style={styles.bannerContent}>
                <AppText style={styles.bannerText}>
                  Join Our Animal Lovers Community
                </AppText>

                <View style={styles.bannerRow}>
                  <Button
                    buttonText="Join Now"
                    onPress={() => {}}
                    touchableOpacityStyle={styles.bannerBtn}
                    textStyle={styles.bannerBtnText}
                  />
                  <AppText style={styles.bannerSubText}>900+ Members</AppText>
                </View>
              </View>

              {bannerImageURL ? (
                <Image
                  source={{ uri: bannerImageURL }}
                  style={styles.bannerImage}
                />
              ) : (
                <View style={styles.placeholder} />
              )}
            </View>

            <View style={styles.section}>
              <AppText style={styles.sectionTitle}>Recomented :</AppText>

              <FlatList
                data={pets}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => <Card pet={item} />}
                ListEmptyComponent={() => (
                  <View style={styles.noDataComp}>
                    <AppText style={styles.noDataCompText}>
                      No pets added yet 🐶
                    </AppText>
                  </View>
                )}
              />
            </View>
          </>
        )}
      </ScrollView>

      <IconButton
        icon={
          <Image
            source={require('../../assets/images/home/addPets.png')}
            style={styles.fabIcon}
          />
        }
        onPress={() => {
          navigation.navigate('NewPetForm');
        }}
        touchableOpacityStyle={styles.fab}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  container: {
    paddingHorizontal: SizeConfig.width * 5,
    paddingVertical: SizeConfig.height * 2,
  },

  scrollContent: {
    gap: SizeConfig.height * 2,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SizeConfig.width * 2,
  },

  logo: {
    width: SizeConfig.width * 9,
    height: SizeConfig.width * 9,
    resizeMode: 'contain',
    tintColor: Colors.primary,
  },

  title: {
    fontFamily: Fonts.bold,
    fontSize: SizeConfig.fontSize * 4,
    color: Colors.textColor,
  },

  cartBtn: {
    borderRadius: SizeConfig.width * 10,
  },

  searchBox: {
    backgroundColor: Colors.btnLightBackground,
  },

  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: SizeConfig.width * 5,
    paddingVertical: SizeConfig.height * 2,
    borderRadius: SizeConfig.width * 5,
    overflow: 'hidden',
  },

  bannerBg: {
    position: 'absolute',
    resizeMode: 'cover',
    tintColor: Colors.placeHolder,
  },

  bannerContent: {
    flex: 1,
    marginRight: SizeConfig.width * 3,
    gap: SizeConfig.height,
  },

  bannerText: {
    fontFamily: Fonts.semiBold,
    fontSize: SizeConfig.fontSize * 3.8,
    color: Colors.white,
  },

  bannerRow: {
    flexDirection: 'row',
    gap: SizeConfig.width * 3,
    alignItems: 'center',
  },

  bannerSubText: {
    fontFamily: Fonts.regular,
    fontSize: SizeConfig.fontSize * 3.3,
    color: Colors.white,
  },

  bannerBtn: {
    backgroundColor: Colors.white,
    paddingVertical: SizeConfig.height * 0.7,
    borderRadius: SizeConfig.width * 5,
    alignSelf: 'flex-start',
  },

  bannerBtnText: {
    color: Colors.primary,
    fontFamily: Fonts.medium,
  },

  bannerImage: {
    width: SizeConfig.width * 18,
    height: SizeConfig.width * 18,
    borderRadius: SizeConfig.width * 9,
  },

  placeholder: {
    width: SizeConfig.width * 18,
    height: SizeConfig.width * 18,
    borderRadius: SizeConfig.width * 9,
    backgroundColor: Colors.btnLightBackground,
  },

  section: {
    gap: SizeConfig.height * 2,
  },

  sectionTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: SizeConfig.fontSize * 4,
    color: Colors.textColor,
  },

  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: SizeConfig.height * 3,
    marginHorizontal: SizeConfig.width,
  },

  fab: {
    position: 'absolute',
    backgroundColor: Colors.primary,
    borderRadius: SizeConfig.width * 10,
    bottom: SizeConfig.height * 5,
    right: SizeConfig.width * 7,
  },

  fabIcon: {
    width: SizeConfig.width * 9,
    height: SizeConfig.width * 9,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  noDataComp: {
    flex: 1,
    height: SizeConfig.height * 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataCompText: {
    textAlign: 'center',
    fontFamily: Fonts.semiBold,
    fontSize: SizeConfig.fontSize * 3.5,
    color: Colors.grayText,
  },
});

export default Home;
