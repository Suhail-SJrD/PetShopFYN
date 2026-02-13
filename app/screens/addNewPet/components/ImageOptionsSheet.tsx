import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AppText from '../../../components/AppText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Fonts } from '../../../utils/Fonts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationTypes } from '../../../navigation/NavigationTypes';
import { SizeConfig } from '../../../utils/SizeConfig';

type NavigationProp = NativeStackNavigationProp<NavigationTypes>;

type ImageOptionsModalTypes = {
  modalVisible: boolean;
  setModalVisible: (data : boolean) => void;
  setPetImage: (data : string) => void;
};

const ImageOptionsModal = ({
  modalVisible,
  setModalVisible,
  setPetImage,
}: ImageOptionsModalTypes) => {
  const navigation = useNavigation<NavigationProp>();

  const pickImage = async () => {
    setModalVisible(false);

    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.assets && result.assets[0]?.uri) {
      setPetImage(result.assets[0].uri);
    }
  };

  const openCamera = () => {
    setModalVisible(false);

    navigation.navigate('CaptureImage', {
      getPhoto: (path: string) => setPetImage('file://' + path),
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <Pressable
        style={styles.modalOverlay}
        onPress={() => setModalVisible(false)}
      />

      <View style={styles.modalContent}>
        <AppText style={styles.sheetTitle}>Select Option</AppText>

        <TouchableOpacity style={styles.optionBtn} onPress={pickImage}>
          <MaterialIcons name="photo-library" size={SizeConfig.width * 5} />
          <AppText style={styles.optionText}>Choose from Gallery</AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBtn} onPress={openCamera}>
          <MaterialIcons name="camera-alt" size={SizeConfig.width * 5} />
          <AppText style={styles.optionText}>Open Camera</AppText>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000066',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingHorizontal: SizeConfig.width * 5,
    borderTopLeftRadius: SizeConfig.width * 5,
    borderTopRightRadius: SizeConfig.width * 5,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical : SizeConfig.height * 4
  },

  sheetTitle: {
    fontSize: SizeConfig.fontSize * 4.5,
    fontFamily: Fonts.semiBold,
    marginBottom: SizeConfig.height ,
  },

  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SizeConfig.height * 2,
    gap: SizeConfig.width * 4,
  },

  optionText: {
    fontSize: SizeConfig.fontSize * 4,
  },
});

export default ImageOptionsModal;
