import React from "react";
import { Text } from 'react-native';

export type Props = {
  route: string;
  children: React.ReactNode;
  style?: {};
  external?: boolean;
};

export default ({ route, children, style, external }: Props) => {
  const anchorProps: any = {};
  if (external) {
    anchorProps.target = "_blank";
    anchorProps.rel = "noopener noreferrer";
  }

  return (
    <a href={route} {...anchorProps}>
      { typeof children === "string" ? <Text style={style}>{children}</Text> : { children } }
    </a>
  )
}