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
      d="M46.2037 69.4285C63.8379 65.0122 74.5531 47.1367 70.1368 29.5026C65.7205 11.8684 47.845 1.15317 30.2108 5.56949C12.5766 9.9858 1.86145 27.8613 6.27776 45.4954C10.6941 63.1296 28.5695 73.8448 46.2037 69.4285Z"
      fill="white"
      stroke="white"
      strokeWidth="4"
    />
    <path
      d="M68.3728 37.501C68.3728 54.161 54.8672 67.6666 38.2072 67.6666C21.5472 67.6666 8.04163 54.161 8.04163 37.501C8.04163 20.841 21.5472 7.33536 38.2072 7.33536C54.8672 7.33536 68.3728 20.841 68.3728 37.501Z"
      fill="url(#paint0_radial_1648_44366)"
      stroke="url(#paint1_linear_1648_44366)"
      strokeWidth="1.5"
    />
    <path
      d="M38.3818 47.4811C45.2801 47.4811 47.5891 51.1569 47.5891 51.1569C47.5891 51.1569 44.475 47.4811 38.3818 47.4811ZM38.3818 47.4811C31.4835 47.4811 29.4988 51.1569 29.4988 51.1569C29.4988 51.1569 32.2886 47.4811 38.3818 47.4811Z"
      stroke="#6C542F"
      strokeWidth="3.58595"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M38.3818 47.4811C45.2801 47.4811 47.5891 51.1569 47.5891 51.1569C47.5891 51.1569 44.475 47.4811 38.3818 47.4811ZM38.3818 47.4811C31.4835 47.4811 29.4988 51.1569 29.4988 51.1569C29.4988 51.1569 32.2886 47.4811 38.3818 47.4811Z"
      stroke="#6C542F"
      strokeWidth="3.58595"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28.1492 38.1123C29.9902 38.1123 31.4826 35.7618 31.4826 32.8623C31.4826 29.9628 29.9902 27.6123 28.1492 27.6123C26.3083 27.6123 24.8159 29.9628 24.8159 32.8623C24.8159 35.7618 26.3083 38.1123 28.1492 38.1123Z"
      fill="#6C542F"
    />
    <path
      d="M48.9367 38.1122C50.7777 38.1122 52.2701 35.7617 52.2701 32.8622C52.2701 29.9627 50.7777 27.6122 48.9367 27.6122C47.0958 27.6122 45.6034 29.9627 45.6034 32.8622C45.6034 35.7617 47.0958 38.1122 48.9367 38.1122Z"
      fill="#6C542F"
    />
    <defs>
      <radialGradient
        id="paint0_radial_1648_44366"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(38.2075 25.6635) rotate(143.766) scale(44.1658 44.1658)"
      >
        <stop stopColor="#FFE99B" />
        <stop offset="0.443077" stopColor="#FFE455" />
        <stop offset="0.807292" stopColor="#F3C008" />
        <stop offset="1" stopColor="#E78819" />
      </radialGradient>
      <linearGradient
        id="paint1_linear_1648_44366"
        x1="38.2072"
        y1="6.58536"
        x2="38.2072"
        y2="68.4166"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFC01D" />
        <stop offset="1" stopColor="#DE9300" />
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
