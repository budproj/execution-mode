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
      d="M46.2038 69.4294C63.838 65.0131 74.5532 47.1376 70.1369 29.5034C65.7206 11.8693 47.8451 1.15406 30.2109 5.57037C12.5768 9.98669 1.86157 27.8621 6.27788 45.4963C10.6942 63.1305 28.5697 73.8457 46.2038 69.4294Z"
      fill="#FFD964"
      stroke="white"
      strokeWidth="4"
    />
    <path
      d="M68.3731 37.5001C68.3731 54.1601 54.8675 67.6657 38.2075 67.6657C21.5475 67.6657 8.04187 54.1601 8.04187 37.5001C8.04187 20.8401 21.5475 7.33447 38.2075 7.33447C54.8675 7.33447 68.3731 20.8401 68.3731 37.5001Z"
      fill="url(#paint0_radial_1648_44359)"
      stroke="url(#paint1_linear_1648_44359)"
      strokeWidth="1.5"
    />
    <path
      d="M28.1492 38.1123C29.9902 38.1123 31.4826 35.7618 31.4826 32.8623C31.4826 29.9628 29.9902 27.6123 28.1492 27.6123C26.3083 27.6123 24.8159 29.9628 24.8159 32.8623C24.8159 35.7618 26.3083 38.1123 28.1492 38.1123Z"
      fill="#6C542F"
    />
    <path
      d="M48.9368 38.1122C50.7778 38.1122 52.2702 35.7617 52.2702 32.8622C52.2702 29.9627 50.7778 27.6122 48.9368 27.6122C47.0959 27.6122 45.6035 29.9627 45.6035 32.8622C45.6035 35.7617 47.0959 38.1122 48.9368 38.1122Z"
      fill="#6C542F"
    />
    <defs>
      <radialGradient
        id="paint0_radial_1648_44359"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(38.2077 25.6626) rotate(143.766) scale(44.1658 44.1658)"
      >
        <stop stopColor="#FFE99B" />
        <stop offset="0.443077" stopColor="#FFE455" />
        <stop offset="0.807292" stopColor="#F3C008" />
        <stop offset="1" stopColor="#E78819" />
      </radialGradient>
      <linearGradient
        id="paint1_linear_1648_44359"
        x1="38.2075"
        y1="6.58447"
        x2="38.2075"
        y2="68.4157"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFC01D" />
        <stop offset="1" stopColor="#DE9300" />
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
