import { themeConfig } from '@/lib/theme';
import Svg, { Circle, SvgProps } from 'react-native-svg';

export function Progress({
  progress,
  style,
}: {
  progress: number;
  style?: SvgProps['style'];
}) {
  const circumference = 56.5487;
  return (
    <Svg height="100%" viewBox="0 0 19 15" width="100%" style={style}>
      <Circle
        cx="50%"
        cy="50%"
        fill="none"
        strokeWidth="1.5"
        r="9"
        stroke={themeConfig.colors['brand-600']}
        strokeLinecap="round"
        strokeDasharray="56.5487"
        strokeDashoffset={circumference - (progress / 100) * circumference}
      />
    </Svg>
  );
}
