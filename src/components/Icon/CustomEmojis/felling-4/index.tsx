import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface CustomEmojiFelling4Properties extends IconProps, AcessibleIconProperties {}

const CustomEmojiFelling4 = ({
  title,
  desc,
  ...rest
}: CustomEmojiFelling4Properties): ReactElement => (
  <Icon viewBox="0 0 75 75" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      d="M46.2037 69.4294C63.8379 65.0131 74.5531 47.1376 70.1368 29.5034C65.7205 11.8693 47.845 1.15406 30.2108 5.57037C12.5766 9.98669 1.86145 27.8621 6.27776 45.4963C10.6941 63.1305 28.5695 73.8457 46.2037 69.4294Z"
      fill="#FFD964"
      stroke="white"
      strokeWidth="4"
    />
    <path
      d="M68.373 37.5001C68.373 54.1601 54.8674 67.6657 38.2073 67.6657C21.5473 67.6657 8.04175 54.1601 8.04175 37.5001C8.04175 20.8401 21.5473 7.33447 38.2073 7.33447C54.8674 7.33447 68.373 20.8401 68.373 37.5001Z"
      fill="url(#paint0_radial_1648_44352)"
      stroke="url(#paint1_linear_1648_44352)"
      strokeWidth="1.5"
    />
    <path
      d="M38.7056 52.3293C31.8073 52.3293 29.4983 48.6534 29.4983 48.6534C29.4983 48.6534 32.6124 52.3293 38.7056 52.3293ZM38.7056 52.3293C45.6039 52.3293 47.5886 48.6534 47.5886 48.6534C47.5886 48.6534 44.7988 52.3293 38.7056 52.3293Z"
      stroke="#6C542F"
      strokeWidth="3.58595"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M38.7056 52.3293C31.8073 52.3293 29.4983 48.6534 29.4983 48.6534C29.4983 48.6534 32.6124 52.3293 38.7056 52.3293ZM38.7056 52.3293C45.6039 52.3293 47.5886 48.6534 47.5886 48.6534C47.5886 48.6534 44.7988 52.3293 38.7056 52.3293Z"
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
      d="M48.9368 38.1122C50.7778 38.1122 52.2702 35.7617 52.2702 32.8622C52.2702 29.9627 50.7778 27.6122 48.9368 27.6122C47.0959 27.6122 45.6035 29.9627 45.6035 32.8622C45.6035 35.7617 47.0959 38.1122 48.9368 38.1122Z"
      fill="#6C542F"
    />
    <defs>
      <radialGradient
        id="paint0_radial_1648_44352"
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
        id="paint1_linear_1648_44352"
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

CustomEmojiFelling4.defaultProps = {
  fill: 'none',
  width: '75px',
  height: '75px',
}

export default CustomEmojiFelling4
