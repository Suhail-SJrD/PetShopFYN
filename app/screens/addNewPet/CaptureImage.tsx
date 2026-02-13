import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  type PhotoFile,
} from 'react-native-vision-camera';
import { NavigationTypes } from '../../navigation/NavigationTypes';
import { Colors } from '../../utils/Colors';
import Button from '../../components/Button';
import { SizeConfig } from '../../utils/SizeConfig';

type CaptureImageType = NativeStackScreenProps<NavigationTypes, 'CaptureImage'>;

const CaptureImage = ({ navigation, route }: CaptureImageType) => {
  const { getPhoto } = route.params;

  const device = useCameraDevice('back');

  const cameraRef = useRef<Camera>(null);

  const { hasPermission, requestPermission } = useCameraPermission();

  const [photo, setPhoto] = useState<PhotoFile | null>(null);

  useEffect(() => {
    requestPermission();
  }, []);

  const takePicture = async () => {
    if (!cameraRef.current) return;

    const capturedPhoto = await cameraRef.current.takePhoto();
    setPhoto(capturedPhoto);
  };

  const handleProceed = () => {
    if (!photo) return;

    getPhoto(photo.path);

    navigation.goBack();
  };

  if (photo) {
    return (
      <View style={styles.previewContainer}>
        <Image
          source={{ uri: 'file://' + photo.path }}
          style={styles.preview}
        />

        <View style={styles.actionContainer}>
          <Button
            buttonText="Retake"
            onPress={() => setPhoto(null)}
            touchableOpacityStyle={{ backgroundColor: Colors.danger , width : '40%' }}
          />

          <Button
            buttonText="Use Photo"
            onPress={handleProceed}
            touchableOpacityStyle={{ backgroundColor: Colors.green , width : '40%' }}
          />
        </View>
      </View>
    );
  }

  if (!hasPermission || device == null) return null;

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive
        photo
      />

      <TouchableOpacity style={styles.captureBtn} onPress={takePicture} />
    </View>
  );
};

const styles = StyleSheet.create({
  captureBtn: {
    position: 'absolute',
    bottom: SizeConfig.height * 5,
    alignSelf: 'center',
    width: SizeConfig.width * 20,
    height: SizeConfig.width * 20,
    borderRadius: SizeConfig.width * 10,
    backgroundColor: 'white',
    borderWidth: SizeConfig.width * 1.5,
    borderColor: Colors.btnLightBackground,
  },

  previewContainer: {
    flex: 1,
    backgroundColor: Colors.textColor,
  },

  preview: {
    width: '100%',
    height: '100%',
  },

  actionContainer: {
    position: 'absolute',
    bottom: SizeConfig.height * 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default CaptureImage;
