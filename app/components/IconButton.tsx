import React, { ReactNode } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  View,
} from 'react-native';
import { SizeConfig } from '../utils/SizeConfig';
import { Colors } from '../utils/Colors';

interface ButtonType {
  onPress: () => void;
  touchableOpacityStyle?: ViewStyle;
  icon: ReactNode;
}

const IconButton = ({
  onPress,
  touchableOpacityStyle,
  icon,
}: ButtonType) => {
  return (
    <TouchableOpacity
      style={[styles.button, touchableOpacityStyle]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View>{icon}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: SizeConfig.width * 3,
    borderRadius: SizeConfig.width * 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.btnLightBackground,
  },
});

export default IconButton;
