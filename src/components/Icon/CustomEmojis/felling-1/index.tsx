import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface CustomEmojiFelling1Properties extends IconProps, AcessibleIconProperties {}

const CustomEmojiFelling1 = ({
  title,
  desc,
  ...rest
}: CustomEmojiFelling1Properties): ReactElement => (
  <Icon viewBox="0 0 76 76" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      d="M45.1161 67.8173C61.6299 63.6816 71.6642 46.9419 67.5285 30.4281C63.3928 13.9144 46.6531 3.88 30.1393 8.01571C13.6256 12.1514 3.59119 28.8911 7.7269 45.4049C11.8626 61.9187 28.6023 71.9531 45.1161 67.8173Z"
      fill="white"
    />
    <path
      d="M45.4805 69.2724C62.7979 64.9354 73.3206 47.3811 68.9836 30.0637C64.6466 12.7463 47.0923 2.22365 29.7749 6.56062C12.4576 10.8976 1.93487 28.4519 6.27184 45.7693C10.6088 63.0867 28.1631 73.6094 45.4805 69.2724Z"
      fill="url(#paint0_linear_1424_18996)"
      stroke="white"
      strokeWidth="3"
    />
    <path
      d="M46.3587 51.898C46.3587 51.898 44.3575 46.5273 37.1787 46.5273C29.9999 46.5273 28.3219 51.898 28.3219 51.898"
      stroke="#525F7F"
      strokeWidth="2.53199"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.1628 26.2859C20.1628 26.2859 21.9538 27.7761 24.774 26.4757C27.5942 25.1753 27.3713 22.962 27.3713 22.962"
      stroke="#525F7F"
      strokeWidth="2.53199"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M53.3276 26.2859C53.3276 26.2859 51.5367 27.7761 48.7165 26.4757C45.8962 25.1753 46.1192 22.962 46.1192 22.962"
      stroke="#525F7F"
      strokeWidth="2.53199"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24.9577 36.3311C26.4265 36.3311 27.6171 35.1404 27.6171 33.6716C27.6171 32.2028 26.4265 31.0121 24.9577 31.0121C23.4889 31.0121 22.2982 32.2028 22.2982 33.6716C22.2982 35.1404 23.4889 36.3311 24.9577 36.3311Z"
      fill="#525F7F"
    />
    <path
      d="M48.1188 36.3311C49.5876 36.3311 50.7783 35.1404 50.7783 33.6716C50.7783 32.2028 49.5876 31.0121 48.1188 31.0121C46.65 31.0121 45.4594 32.2028 45.4594 33.6716C45.4594 35.1404 46.65 36.3311 48.1188 36.3311Z"
      fill="#525F7F"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1424_18996"
        x1="64.2046"
        y1="22.2892"
        x2="11.0503"
        y2="53.547"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFD555" />
        <stop offset="0.36" stopColor="#FEDA6C" />
        <stop offset="0.807292" stopColor="#FFE382" />
        <stop offset="1" stopColor="#FFCF55" />
      </linearGradient>
    </defs>
  </Icon>
)

CustomEmojiFelling1.defaultProps = {
  fill: 'none',
  width: '76px',
  height: '76px',
}

export default CustomEmojiFelling1
