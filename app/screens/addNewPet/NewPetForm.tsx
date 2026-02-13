import {
  ScrollView,
  StatusBar,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../utils/Colors';
import IconButton from '../../components/IconButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SizeConfig } from '../../utils/SizeConfig';
import AppText from '../../components/AppText';
import { Fonts } from '../../utils/Fonts';
import InputBox from '../../components/InputBox';
import { useState } from 'react';
import Button from '../../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationTypes } from '../../navigation/NavigationTypes';
import ImageOptionsSheet from './components/ImageOptionsSheet';
import Header from '../../components/Header';
import usePetStore from '../../store/PetsStore';
import { z } from 'zod';
import CustomToast from '../../components/CustomToast';
import uuid from 'react-native-uuid';
import { useNetwork } from '../../context/NetworkProvider';
import axios from 'axios';
import { petType } from '../../store/StoreTypes';

type NewPetFormType = NativeStackScreenProps<NavigationTypes, 'NewPetForm'>;

const NewPetForm = ({ navigation }: NewPetFormType) => {
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [price, setPrice] = useState('');

  const [petImage, setPetImage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const { isConnected } = useNetwork();

  const addPets = usePetStore(state => state.addPets);

  const userSchema = z.object({
    id: z.string().min(3, 'No UUID generated'),
    petName: z.string().min(3, 'Enter the pet name greater then 3'),
    breed: z.string().min(3, 'Enter the breed name greater then 3 '),
    petImage: z.string().min(3, 'Pick an image'),
    price: z.number().min(1, 'Enter valid price'),
    age: z.number().min(1, 'Enter valid age'),
  });

  const postPetListing = async (newPet: petType) => {
    try {
      if (!isConnected) return null;

      // const response = await axios.post(
      //   'https://reqres.in/api/users',
      //   newPet, 
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   },
      // );

      // if (response.status) {
        CustomToast({
          type: 'success',
          title: 'Success',
          description: 'Pet added successfully',
        });

        addPets(newPet);

        setPetName('');
        setAge('');
        setBreed('');
        setPrice('');

        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      // } else {
      //   console.log(response);

      //   CustomToast({
      //     type: 'error',
      //     title: 'Somthing went wrong',
      //     description: 'Pet Listing is not updated!',
      //   });
      // }
    } catch (error) {
      console.log(error);

      CustomToast({
        type: 'error',
        title: 'Somthing went wrong',
        description: 'Pet Listing is not updated!',
      });
    }
  };

  const handleSubmit = () => {
    try {
      const newPet = {
        id: String(uuid.v4()),
        petName,
        breed,
        age: Number(age),
        price: Number(price),
        petImage,
      };

      const result = userSchema.safeParse(newPet);

      if (result.success) {
        postPetListing(newPet);
      } else {
        CustomToast({
          type: 'error',
          title: 'Validation Error',
          description: result.error.errors[0].message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />

      <Header headerTitle="Add Your Pet" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.formContainer}
      >
        <View style={styles.imageContainer}>
          {petImage ? (
            <TouchableOpacity
              style={styles.imageWrapper}
              onPress={() => setModalVisible(true)}
            >
              <Image source={{ uri: petImage }} style={styles.petImage} />
              <View style={styles.editOverlay}>
                <MaterialIcons
                  name="edit"
                  size={SizeConfig.width * 7}
                  color={Colors.textColor}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <IconButton
              icon={
                <MaterialIcons
                  name="camera-enhance"
                  size={SizeConfig.width * 10}
                  color={Colors.textColor}
                />
              }
              onPress={() => setModalVisible(true)}
              touchableOpacityStyle={styles.cameraBtn}
            />
          )}
        </View>

        <InputBox
          label="Pet Name *"
          placeHolder="Enter pet name"
          inputValue={petName}
          setInputValue={setPetName}
        />

        <InputBox
          label="Breed *"
          placeHolder="Enter breed"
          inputValue={breed}
          setInputValue={setBreed}
        />

        <InputBox
          label="Age *"
          placeHolder="Enter age"
          inputValue={age}
          setInputValue={setAge}
          keyboardType="numeric"
        />

        <InputBox
          label="Price *"
          placeHolder="Enter price"
          inputValue={price}
          setInputValue={setPrice}
          keyboardType="numeric"
        />

        <Button
          buttonText="List Pet"
          onPress={() => {
            if (!isConnected) {
              CustomToast({
                type: 'error',
                title: 'No Internet Found',
                description: 'Check you internet conection!',
              });
            } else {
              handleSubmit();
            }
          }}
          touchableOpacityStyle={styles.submitBtn}
        />
      </ScrollView>

      <ImageOptionsSheet
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setPetImage={setPetImage}
      />
    </SafeAreaView>
  );
};

export default NewPetForm;

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
    fontSize: SizeConfig.fontSize * 4,
    color: Colors.primary,
  },

  headerSpacer: {
    width: SizeConfig.width * 10,
  },

  formContainer: {
    paddingHorizontal: SizeConfig.width * 5,
    paddingBottom: SizeConfig.height * 5,
    gap: SizeConfig.height * 2,
  },

  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SizeConfig.height * 2,
  },

  imageWrapper: {
    width: SizeConfig.width * 20,
    height: SizeConfig.width * 20,
    overflow: 'hidden',
    borderRadius: SizeConfig.width * 10,
  },

  petImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: SizeConfig.width * 10,
  },

  editOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.21)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SizeConfig.width * 10,
  },

  cameraBtn: {
    borderRadius: SizeConfig.width * 10,
    padding: SizeConfig.width * 3,
    borderWidth: 1,
    borderColor: Colors.btnLightBackground,
    width: SizeConfig.width * 20,
    height: SizeConfig.width * 20,
  },

  submitBtn: {
    marginTop: SizeConfig.height * 2,
  },
});
