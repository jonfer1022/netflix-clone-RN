import * as React from 'react';
import {Svg, Path} from 'react-native-svg';

const PlusIcon = ({size = '24'}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 6V14M14 10H6M10 18.5C5.30558 18.5 1.5 14.6944 1.5 10C1.5 5.30558 5.30558 1.5 10 1.5C14.6944 1.5 18.5 5.30558 18.5 10C18.5 14.6944 14.6944 18.5 10 18.5Z"
        stroke="#d7d2d2"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export {PlusIcon};
