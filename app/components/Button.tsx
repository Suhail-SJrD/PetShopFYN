import React from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  View,
} from 'react-native';
import AppText from './AppText';
import { SizeConfig } from '../utils/SizeConfig';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';

interface ButtonType {
  buttonText: string;
  onPress: () => void;
  touchableOpacityStyle?: ViewStyle;
  textStyle?: TextStyle;
  lhsIcon?: React.ReactNode;
  rhsIcon?: React.ReactNode;
}

const Button = ({
  buttonText,
  onPress,
  touchableOpacityStyle,
  textStyle,
  lhsIcon,
  rhsIcon,
}: ButtonType) => {
  return (
    <TouchableOpacity
      style={[styles.button, touchableOpacityStyle]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.row}>
        {lhsIcon && <View>{lhsIcon}</View>}

        <AppText style={[styles.text, textStyle]}>{buttonText}</AppText>

        {rhsIcon && <View>{rhsIcon}</View>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: SizeConfig.width * 3,
    paddingHorizontal: SizeConfig.width * 5,
    borderRadius: SizeConfig.width * 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap : SizeConfig.width
  },
  text: {
    fontFamily: Fonts.medium,
    color: Colors.white,
    fontSize: SizeConfig.fontSize * 3.5,
  },
});

export default Button;
