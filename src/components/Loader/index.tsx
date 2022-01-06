import React from 'react';
import {ActivityIndicator} from 'react-native';

type Props = {
  color?: string;
  size?: 'large' | 'small';
};

const Loader: React.FC<Props> = ({color, size = 'large'}) => (
  <ActivityIndicator color={color} size={size} />
);

export default Loader;
