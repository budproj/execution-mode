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
      d="M38.2073 70.4138C56.3861 70.4138 71.123 55.677 71.123 37.4982C71.123 19.3194 56.3861 4.58261 38.2073 4.58261C20.0286 4.58261 5.29175 19.3194 5.29175 37.4982C5.29175 55.677 20.0286 70.4138 38.2073 70.4138Z"
      fill="#FFD964"
      stroke="white"
      strokeWidth="4"
    />
    <path
      d="M68.373 37.5001C68.373 54.1601 54.8673 67.6657 38.2073 67.6657C21.5473 67.6657 8.04175 54.1601 8.04175 37.5001C8.04175 20.8401 21.5473 7.33447 38.2073 7.33447C54.8673 7.33447 68.373 20.8401 68.373 37.5001Z"
      fill="url(#paint0_radial_1648_44373)"
      stroke="url(#paint1_linear_1648_44373)"
      strokeWidth="1.5"
    />
    <path
      d="M47.5891 51.523C47.5891 51.523 45.2801 46.1364 38.3818 46.1364C31.4835 46.1364 29.4988 51.523 29.4988 51.523"
      stroke="#6C542F"
      strokeWidth="3.58595"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M47.5891 51.523C47.5891 51.523 45.2801 46.1364 38.3818 46.1364C31.4835 46.1364 29.4988 51.523 29.4988 51.523"
      stroke="#6C542F"
      strokeWidth="3.58595"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.3388 25.6137C22.3388 25.6137 24.1732 26.7197 27.4396 24.8338C30.706 22.948 30.5457 20.8755 30.5457 20.8755"
      stroke="#6C542F"
      strokeWidth="1.79298"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M54.7481 25.614C54.7481 25.614 52.9137 26.7199 49.6473 24.8341C46.3809 22.9482 46.5413 20.8757 46.5413 20.8757"
      stroke="#6C542F"
      strokeWidth="1.79298"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28.1496 40.1839C29.9906 40.1839 31.4829 37.8334 31.4829 34.9339C31.4829 32.0344 29.9906 29.6839 28.1496 29.6839C26.3087 29.6839 24.8163 32.0344 24.8163 34.9339C24.8163 37.8334 26.3087 40.1839 28.1496 40.1839Z"
      fill="#6C542F"
    />
    <path
      d="M48.9371 40.1839C50.778 40.1839 52.2704 37.8334 52.2704 34.9339C52.2704 32.0344 50.778 29.6839 48.9371 29.6839C47.0961 29.6839 45.6038 32.0344 45.6038 34.9339C45.6038 37.8334 47.0961 40.1839 48.9371 40.1839Z"
      fill="#6C542F"
    />
    <defs>
      <radialGradient
        id="paint0_radial_1648_44373"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(38.2076 25.6626) rotate(143.766) scale(44.1658 44.1658)"
      >
        <stop stopColor="#FFE99B" />
        <stop offset="0.443077" stopColor="#FFE455" />
        <stop offset="0.807292" stopColor="#F3C008" />
        <stop offset="1" stopColor="#E78819" />
      </radialGradient>
      <linearGradient
        id="paint1_linear_1648_44373"
        x1="38.2073"
        y1="6.58447"
        x2="38.2073"
        y2="68.4157"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFC01D" />
        <stop offset="1" stopColor="#DE9300" />
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
