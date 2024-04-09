import * as React from 'react';
import {Svg, Path} from 'react-native-svg';

const HomeIcon = ({size = '24'}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 1.94531L11.4609 2.46094L1.71094 12.2109L2.78906 13.2891L3.75 12.3281V21H10.5V13.5H13.5V21H20.25V12.3281L21.2109 13.2891L22.2891 12.2109L12.5391 2.46094L12 1.94531ZM12 4.07812L18.75 10.8281V19.5H15V12H9V19.5H5.25V10.8281L12 4.07812Z"
        fill="#D7D2D2"
      />
    </Svg>
  );
};

export {HomeIcon};
