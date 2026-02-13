import React from 'react';
import { Text, TextProps } from 'react-native';

const AppText = ({ children, ...rest }: TextProps) => {
  return (
    <Text ellipsizeMode='tail' {...rest} allowFontScaling={false}>
      {children}
    </Text>
  );
};

export default AppText;
