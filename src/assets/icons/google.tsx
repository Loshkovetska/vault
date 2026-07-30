import * as React from 'react';
import Svg, {
  G,
  Mask,
  Path,
  Defs,
  RadialGradient,
  Stop,
  LinearGradient,
  ClipPath,
  SvgProps,
} from 'react-native-svg';
export const Google = (props: SvgProps) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Mask
        id="b"
        style={{
          maskType: 'luminance',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={20}
        height={20}
      >
        <Path
          d="M19.808 8.145h-9.595v3.844h5.513a4.5 4.5 0 0 1-.579 1.568 4.6 4.6 0 0 1-1.17 1.309c-1.267.971-2.745 1.17-3.77 1.17-2.593 0-4.808-1.676-5.665-3.952-.035-.083-.058-.168-.086-.252a5.87 5.87 0 0 1 .024-3.73c.806-2.367 3.07-4.135 5.728-4.135a6 6 0 0 1 1.537.19 5.54 5.54 0 0 1 2.389 1.313l2.917-2.857C15.276.986 12.963 0 10.203 0a10.3 10.3 0 0 0-5.912 1.849 10.1 10.1 0 0 0-3.213 3.668A9.7 9.7 0 0 0 0 10a9.7 9.7 0 0 0 1.079 4.485v.01a10.2 10.2 0 0 0 3.12 3.596 10.3 10.3 0 0 0 6.004 1.91c1.617 0 3.05-.291 4.314-.838a8.8 8.8 0 0 0 2.45-1.569 8.85 8.85 0 0 0 2.24-3.194c.517-1.242.793-2.647.793-4.17 0-.71-.071-1.43-.192-2.084"
          fill="#fff"
        />
      </Mask>
      <G mask="url(#b)">
        <G filter="url(#c)">
          <Path
            d="M-.147 10.067c.01 1.593.464 3.236 1.151 4.563v.009c.497.963 1.175 1.725 1.948 2.479l4.667-1.703c-.883-.449-1.018-.724-1.65-1.225a5.9 5.9 0 0 1-1.43-2.28h-.012l.012-.008c-.197-.58-.217-1.196-.224-1.835z"
            fill="url(#d)"
          />
        </G>
        <G filter="url(#e)">
          <Path
            d="M10.213-.073c-.461 1.62-.285 3.196 0 4.113q.801 0 1.533.19a5.54 5.54 0 0 1 2.388 1.313l2.992-2.93C15.353.988 13.22-.07 10.213-.073"
            fill="url(#f)"
          />
        </G>
        <G filter="url(#g)">
          <Path
            d="M10.203-.086a10.6 10.6 0 0 0-6.064 1.897A10.4 10.4 0 0 0 2.4 3.332C2.264 4.61 3.42 6.178 5.706 6.165c1.11-1.29 2.75-2.126 4.576-2.126h.005l-.074-4.125z"
            fill="url(#h)"
          />
        </G>
        <G filter="url(#i)">
          <Path
            d="m17.671 10.529-2.02 1.387a4.5 4.5 0 0 1-.578 1.568 4.6 4.6 0 0 1-1.17 1.309c-1.265.969-2.739 1.168-3.765 1.17-1.06 1.805-1.246 2.71.075 4.168 1.634-.002 3.083-.297 4.361-.85a9 9 0 0 0 2.484-1.589 9 9 0 0 0 2.27-3.238c.523-1.259.803-2.682.803-4.225z"
            fill="url(#j)"
          />
        </G>
        <G filter="url(#k)">
          <Path
            d="M10.064 7.998v4.137h9.717c.085-.566.368-1.3.368-1.906 0-.71-.072-1.576-.192-2.23z"
            fill="#3086ff"
          />
        </G>
        <G filter="url(#l)">
          <Path
            d="M2.447 3.186A10 10 0 0 0 .93 5.371C.232 6.729-.149 8.38-.149 9.999l.002.068c.308.591 4.263.478 4.462 0L4.312 10c0-.664.112-1.153.317-1.753a6.1 6.1 0 0 1 1.152-2.01c.114-.145.42-.46.508-.648.034-.072-.061-.112-.067-.137-.006-.028-.134-.006-.162-.027-.091-.066-.272-.101-.381-.132-.235-.067-.623-.213-.838-.364-.681-.48-1.745-1.052-2.394-1.743"
            fill="url(#m)"
          />
        </G>
        <G filter="url(#n)">
          <Path
            d="M4.856 5.455c1.58.957 2.034-.483 3.084-.934L6.113.732a10.3 10.3 0 0 0-1.896 1.044c-.88.612-1.657 1.36-2.299 2.21z"
            fill="url(#o)"
          />
        </G>
        <G filter="url(#p)">
          <Path
            d="M5.499 15.122c-2.121.766-2.453.793-2.648 2.107q.56.547 1.2 1.006c1.142.82 3.34 1.91 6.152 1.91h.01V15.89h-.007c-1.053 0-1.894-.276-2.757-.757-.212-.118-.598.2-.794.058-.27-.197-.922.169-1.156-.068"
            fill="url(#q)"
          />
        </G>
        <G opacity={0.5} filter="url(#r)">
          <Path
            d="M8.97 15.755v4.317c.394.046.803.074 1.233.074q.645 0 1.252-.063v-4.299a7.4 7.4 0 0 1-1.249.105c-.424 0-.836-.049-1.235-.134"
            fill="url(#s)"
          />
        </G>
      </G>
    </G>
    <Defs>
      <RadialGradient
        id="d"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-.4156 -9.95993 14.9426 -.59769 7.526 16.968)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.142} stopColor="#1abd4d" />
        <Stop offset={0.248} stopColor="#6ec30d" />
        <Stop offset={0.312} stopColor="#8ac502" />
        <Stop offset={0.366} stopColor="#a2c600" />
        <Stop offset={0.446} stopColor="#c8c903" />
        <Stop offset={0.54} stopColor="#ebcb03" />
        <Stop offset={0.616} stopColor="#f7cd07" />
        <Stop offset={0.699} stopColor="#fdcd04" />
        <Stop offset={0.771} stopColor="#fdce05" />
        <Stop offset={0.861} stopColor="#ffce0a" />
      </RadialGradient>
      <RadialGradient
        id="f"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(7.05806 0 0 8.92439 16.846 5.331)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.408} stopColor="#fb4e5a" />
        <Stop offset={1} stopColor="#ff4540" />
      </RadialGradient>
      <RadialGradient
        id="h"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-9.88885 5.36243 7.4323 13.1383 12.99 -1.378)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.231} stopColor="#ff4541" />
        <Stop offset={0.312} stopColor="#ff4540" />
        <Stop offset={0.458} stopColor="#ff4640" />
        <Stop offset={0.54} stopColor="#ff473f" />
        <Stop offset={0.699} stopColor="#ff5138" />
        <Stop offset={0.771} stopColor="#ff5b33" />
        <Stop offset={0.861} stopColor="#ff6c29" />
        <Stop offset={1} stopColor="#ff8c18" />
      </RadialGradient>
      <RadialGradient
        id="j"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-17.9337 -22.9206 -8.64137 6.48127 10.36 18.836)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.132} stopColor="#0cba65" />
        <Stop offset={0.21} stopColor="#0bb86d" />
        <Stop offset={0.297} stopColor="#09b479" />
        <Stop offset={0.396} stopColor="#08ad93" />
        <Stop offset={0.477} stopColor="#0aa6a9" />
        <Stop offset={0.568} stopColor="#0d9cc6" />
        <Stop offset={0.667} stopColor="#1893dd" />
        <Stop offset={0.769} stopColor="#258bf1" />
        <Stop offset={0.859} stopColor="#3086ff" />
      </RadialGradient>
      <RadialGradient
        id="m"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-1.26913 10.7101 15.1251 1.71807 9.336 1.803)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.366} stopColor="#ff4e3a" />
        <Stop offset={0.458} stopColor="#ff8a1b" />
        <Stop offset={0.54} stopColor="#ffa312" />
        <Stop offset={0.616} stopColor="#ffb60c" />
        <Stop offset={0.771} stopColor="#ffcd0a" />
        <Stop offset={0.861} stopColor="#fecf0a" />
        <Stop offset={0.915} stopColor="#fecf08" />
        <Stop offset={1} stopColor="#fdcd01" />
      </RadialGradient>
      <RadialGradient
        id="o"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-3.66844 3.97231 -11.4435 -10.1305 7.552 1.692)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.316} stopColor="#ff4c3c" />
        <Stop offset={0.604} stopColor="#ff692c" />
        <Stop offset={0.727} stopColor="#ff7825" />
        <Stop offset={0.885} stopColor="#ff8d1b" />
        <Stop offset={1} stopColor="#ff9f13" />
      </RadialGradient>
      <RadialGradient
        id="q"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-9.88885 -5.36243 7.4323 -13.1383 12.991 21.377)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.231} stopColor="#0fbc5f" />
        <Stop offset={0.312} stopColor="#0fbc5f" />
        <Stop offset={0.366} stopColor="#0fbc5e" />
        <Stop offset={0.458} stopColor="#0fbc5d" />
        <Stop offset={0.54} stopColor="#12bc58" />
        <Stop offset={0.699} stopColor="#28bf3c" />
        <Stop offset={0.771} stopColor="#38c02b" />
        <Stop offset={0.861} stopColor="#52c218" />
        <Stop offset={0.915} stopColor="#67c30f" />
        <Stop offset={1} stopColor="#86c504" />
      </RadialGradient>
      <LinearGradient
        id="s"
        x1={8.971}
        y1={17.951}
        x2={11.455}
        y2={17.951}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#0fbc5c" />
        <Stop offset={1} stopColor="#0cba65" />
      </LinearGradient>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
