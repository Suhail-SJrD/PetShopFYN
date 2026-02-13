import { FlatList, Image, StatusBar, StyleSheet, View } from 'react-native';
import { Colors } from '../../utils/Colors';
import { Fonts } from '../../utils/Fonts';
import { SizeConfig } from '../../utils/SizeConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '../../components/AppText';
import InputBox from '../../components/InputBox';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useState, useMemo } from 'react';
import IconButton from '../../components/IconButton';
import { useNavigation } from '@react-navigation/native';
import Card from './components/Card';
import usePetStore from '../../store/PetsStore';

const SearchScreen = () => {
  const navigation = useNavigation<any>();
  const pets = usePetStore(state => state.pets);
  const [searchByName, setSearchByName] = useState('');

  const filteredPets = useMemo(() => {
    if (!searchByName) return pets;
    return pets.filter(pet =>
      pet.petName.toLowerCase().includes(searchByName.toLowerCase()),
    );
  }, [searchByName, pets]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <IconButton
            icon={
              <MaterialIcons
                name="keyboard-arrow-left"
                size={SizeConfig.width * 6}
                color={Colors.textColor}
              />
            }
            onPress={() => navigation.goBack()}
            touchableOpacityStyle={{ borderRadius: SizeConfig.width * 10 }}
          />
          <View style={{ width: '85%' }}>
            <InputBox
              inputValue={searchByName}
              setInputValue={setSearchByName}
              pressableStyle={styles.searchBox}
              lshIcon={
                <MaterialIcons
                  name="search"
                  size={SizeConfig.width * 5}
                  color={Colors.textColor}
                />
              }
            />
          </View>
        </View>

        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Recommended :</AppText>

          <FlatList
            data={filteredPets}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => <Card pet={item} />}
            ListEmptyComponent={() => (
              <View style={styles.noDataComp}>
                <AppText style={styles.noDataCompText}>
                  No pets found 🐶
                </AppText>
              </View>
            )}
          />
        </View>
      </View>

      <IconButton
        icon={
          <Image
            source={require('../../assets/images/home/addPets.png')}
            style={styles.fabIcon}
          />
        }
        onPress={() => navigation.navigate('NewPetForm')}
        touchableOpacityStyle={styles.fab}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.white },
  container: {
    paddingHorizontal: SizeConfig.width * 5,
    paddingVertical: SizeConfig.height * 2,
  },
  searchBox: { backgroundColor: Colors.btnLightBackground },
  section: { gap: SizeConfig.height * 2, marginTop: SizeConfig.height * 2 },
  sectionTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: SizeConfig.fontSize * 4,
    color: Colors.textColor,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: SizeConfig.height * 25,
    paddingHorizontal : SizeConfig.width * 0.5
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

export default SearchScreen;
