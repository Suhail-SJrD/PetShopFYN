import { ReactNode } from 'react';
import {
  TextInput,
  View,
  ViewStyle,
  StyleSheet,
  TextInputProps,
  Pressable,
} from 'react-native';
import { SizeConfig } from '../utils/SizeConfig';
import { Colors } from '../utils/Colors';
import AppText from './AppText';
import { Fonts } from '../utils/Fonts';

interface InputBoxType {
  inputValue: string;
  placeHolder?: string;
  label?: string;
  onPress?: ()=> void;
  editable?: boolean;
  setInputValue: (data: string) => void;
  keyboardType?: TextInputProps['keyboardType'];
  pressableStyle?: ViewStyle;
  lshIcon?: ReactNode;
  rhsIcon?: ReactNode;
}

const InputBox = ({
  inputValue,
  placeHolder,
  label,
  onPress,
  setInputValue,
  pressableStyle,
  lshIcon,
  rhsIcon,
  keyboardType = 'default',
  editable = true
}: InputBoxType) => {
  return (
    <View style={styles.wrapper}>
      {label && <AppText style={styles.label}>{label}</AppText>}

      <Pressable onPress={onPress} style={[styles.container, pressableStyle]}>
        {lshIcon && <View style={styles.icon}>{lshIcon}</View>}

        <TextInput
          value={inputValue}
          placeholder={placeHolder ?? 'Enter text'}
          onChangeText={setInputValue}
          style={styles.input}
          placeholderTextColor={Colors.placeHolder}
          keyboardType={keyboardType}
          editable={editable ?? true}
        />

        {rhsIcon && <View style={styles.icon}>{rhsIcon}</View>}
      </Pressable>
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  wrapper: {
    gap: SizeConfig.height * 0.8,
  },

  label: {
    fontFamily: Fonts.semiBold,
    fontSize: SizeConfig.fontSize * 3.5,
    color: Colors.textColor,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: SizeConfig.width * 0.4,
    borderColor: Colors.btnLightBackground,
    borderRadius: SizeConfig.width * 3,
    paddingVertical: SizeConfig.height * 0.7,
    paddingHorizontal: SizeConfig.width * 3,
    backgroundColor: Colors.white,
  },

  icon: {
    marginRight: SizeConfig.width * 2,
  },

  input: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: SizeConfig.fontSize * 3.5,
    color: Colors.textColor,
  },
});
