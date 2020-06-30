import React from "react";
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback, Text, Linking } from 'react-native';
import { Props } from "./";

export default ({ route, children, style, external }: Props) => {
  const navigation =  useNavigation();

  return (
    <TouchableWithoutFeedback onPress={() => {
      if (external) {
        Linking.openURL(route);
        return;
      }
      navigation.navigate(route);
    }}>
      { typeof children === "string" ? <Text style={style}>{children}</Text> : children }
    </TouchableWithoutFeedback>
  )
}