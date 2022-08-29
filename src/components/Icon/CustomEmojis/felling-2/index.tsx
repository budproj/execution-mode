import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface CustomEmojiFelling2Properties extends IconProps, AcessibleIconProperties {}

const CustomEmojiFelling2 = ({
  title,
  desc,
  ...rest
}: CustomEmojiFelling2Properties): ReactElement => (
  <Icon viewBox="0 0 76 76" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      d="M45.1161 67.8173C61.6299 63.6816 71.6642 46.9419 67.5285 30.4281C63.3928 13.9144 46.6531 3.88 30.1393 8.01571C13.6256 12.1514 3.59119 28.8911 7.7269 45.4049C11.8626 61.9187 28.6023 71.9531 45.1161 67.8173Z"
      fill="white"
    />
    <path
      d="M45.4805 69.2724C62.7979 64.9354 73.3206 47.3811 68.9836 30.0637C64.6466 12.7464 47.0923 2.22368 29.7749 6.56065C12.4576 10.8976 1.93487 28.4519 6.27184 45.7693C10.6088 63.0867 28.1631 73.6094 45.4805 69.2724Z"
      fill="url(#paint0_linear_1424_19022)"
      stroke="white"
      strokeWidth="3"
    />
    <path
      d="M24.9577 36.3311C26.4265 36.3311 27.6171 35.1404 27.6171 33.6716C27.6171 32.2028 26.4265 31.0121 24.9577 31.0121C23.4889 31.0121 22.2982 32.2028 22.2982 33.6716C22.2982 35.1404 23.4889 36.3311 24.9577 36.3311Z"
      fill="#525F7F"
    />
    <path
      d="M49.1188 36.3311C50.5876 36.3311 51.7783 35.1404 51.7783 33.6716C51.7783 32.2028 50.5876 31.0121 49.1188 31.0121C47.65 31.0121 46.4594 32.2028 46.4594 33.6716C46.4594 35.1404 47.65 36.3311 49.1188 36.3311Z"
      fill="#525F7F"
    />
    <path
      d="M46.6462 51.2107C46.6462 51.2107 44.8286 47.2145 37.6498 47.2145C30.471 47.2145 28.6094 51.2107 28.6094 51.2107"
      stroke="#525F7F"
      strokeWidth="2.53199"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1424_19022"
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

CustomEmojiFelling2.defaultProps = {
  fill: 'none',
  width: '76px',
  height: '76px',
}

export default CustomEmojiFelling2
