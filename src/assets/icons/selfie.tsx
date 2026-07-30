import * as React from 'react';
import Svg, { Path, Rect, SvgProps } from 'react-native-svg';

export const Selfie = (props: SvgProps) => (
  <Svg width={190} height={136} viewBox="0 0 190 136" fill="none" {...props}>
    <Path
      d="M3 40V14C3 7.373 8.373 2 15 2h25m0 132H14c-6.627 0-12-5.373-12-12V97m185-57V14c0-6.627-5.373-12-12-12h-25m0 132h26c6.627 0 12-5.373 12-12V97"
      stroke="#a777f3"
      strokeWidth={4}
      strokeLinecap="round"
    />
    <Path
      d="M62 49c7.733 0 14-6.268 14-14s-6.267-14-14-14c-7.731 0-14 6.268-14 14s6.269 14 14 14Z"
      stroke="#a777f3"
      strokeWidth={6}
    />
    <Path
      d="M89.993 77q.007-.86.007-1.75c0-8.698-12.537-15.75-28-15.75s-28 7.052-28 15.75S34 91 62 91c7.809 0 13.44-.55 17.5-1.53"
      stroke="#a777f3"
      strokeWidth={6}
      strokeLinecap="round"
    />
    <Rect
      x={76}
      y={61.285}
      width={88}
      height={50.286}
      rx={7.184}
      fill="#9860f0"
      fillOpacity={0.52}
    />
    <Rect
      x={90.626}
      y={70.265}
      width={14.851}
      height={14.851}
      rx={7.425}
      fill="#a777f3"
      fillOpacity={0.24}
    />
    <Rect
      x={85.428}
      y={91.799}
      width={25.247}
      height={10.396}
      rx={5.198}
      fill="#a777f3"
      fillOpacity={0.24}
    />
    <Rect
      x={124.041}
      y={75.652}
      width={29.633}
      height={7.425}
      rx={3.713}
      fill="#a777f3"
      fillOpacity={0.24}
    />
    <Rect
      x={124.041}
      y={89.018}
      width={29.633}
      height={7.425}
      rx={3.713}
      fill="#a777f3"
      fillOpacity={0.24}
    />
  </Svg>
);
