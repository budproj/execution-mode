import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface CustomEmojiFelling3Properties extends IconProps, AcessibleIconProperties {}

const CustomEmojiFelling3 = ({
  title,
  desc,
  ...rest
}: CustomEmojiFelling3Properties): ReactElement => (
  <Icon viewBox="0 0 76 76" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      d="M45.1161 67.8173C61.6299 63.6816 71.6642 46.9419 67.5285 30.4281C63.3928 13.9144 46.6531 3.88 30.1393 8.01571C13.6256 12.1514 3.59119 28.8911 7.7269 45.4049C11.8626 61.9187 28.6023 71.9531 45.1161 67.8173Z"
      fill="white"
    />
    <path
      d="M37.6277 70.2408C55.4799 70.2408 69.952 55.7687 69.952 37.9165C69.952 20.0643 55.4799 5.59229 37.6277 5.59229C19.7755 5.59229 5.30347 20.0643 5.30347 37.9165C5.30347 55.7687 19.7755 70.2408 37.6277 70.2408Z"
      fill="url(#paint0_linear_1424_19005)"
      stroke="white"
      strokeWidth="3"
    />
    <path
      d="M24.9577 36.3311C26.4265 36.3311 27.6171 35.1404 27.6171 33.6716C27.6171 32.2029 26.4265 31.0122 24.9577 31.0122C23.4889 31.0122 22.2982 32.2029 22.2982 33.6716C22.2982 35.1404 23.4889 36.3311 24.9577 36.3311Z"
      fill="#525F7F"
    />
    <path
      d="M49.1189 36.3311C50.5877 36.3311 51.7784 35.1404 51.7784 33.6716C51.7784 32.2029 50.5877 31.0122 49.1189 31.0122C47.6502 31.0122 46.4595 32.2029 46.4595 33.6716C46.4595 35.1404 47.6502 36.3311 49.1189 36.3311Z"
      fill="#525F7F"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1424_19005"
        x1="67.2049"
        y1="29.214"
        x2="8.04923"
        y2="46.6221"
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

CustomEmojiFelling3.defaultProps = {
  fill: 'none',
  width: '76px',
  height: '76px',
}

export default CustomEmojiFelling3
