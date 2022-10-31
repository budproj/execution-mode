import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface CustomEmojiFelling5Properties extends IconProps, AcessibleIconProperties {}

const CustomEmojiFelling5 = ({
  title,
  desc,
  ...rest
}: CustomEmojiFelling5Properties): ReactElement => (
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
      d="M68.373 37.5001C68.373 54.1601 54.8673 67.6657 38.2073 67.6657C21.5473 67.6657 8.04175 54.1601 8.04175 37.5001C8.04175 20.8401 21.5473 7.33447 38.2073 7.33447C54.8673 7.33447 68.373 20.8401 68.373 37.5001Z"
      fill="url(#paint0_radial_1648_44345)"
      stroke="url(#paint1_linear_1648_44345)"
      strokeWidth="1.5"
    />
    <path
      d="M27.6064 41.573C27.6064 41.573 27.9865 52.5646 38.398 52.5646C48.8096 52.5646 48.8096 41.573 48.8096 41.573"
      fill="#6C542F"
    />
    <path
      d="M27.6064 41.573C27.6064 41.573 27.9865 52.5646 38.398 52.5646C48.8096 52.5646 48.8096 41.573 48.8096 41.573C48.8096 41.573 45.5397 42.6383 38.398 42.6383C31.2564 42.6383 27.6064 41.573 27.6064 41.573Z"
      stroke="#6C542F"
      strokeWidth="3.58595"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M27.8138 34.0739C29.6547 34.0739 31.1471 31.7233 31.1471 28.8238C31.1471 25.9244 29.6547 23.5739 27.8138 23.5739C25.9729 23.5739 24.4805 25.9244 24.4805 28.8238C24.4805 31.7233 25.9729 34.0739 27.8138 34.0739Z"
      fill="#6C542F"
    />
    <path
      d="M48.6014 34.0738C50.4423 34.0738 51.9347 31.7233 51.9347 28.8238C51.9347 25.9243 50.4423 23.5738 48.6014 23.5738C46.7605 23.5738 45.2681 25.9243 45.2681 28.8238C45.2681 31.7233 46.7605 34.0738 48.6014 34.0738Z"
      fill="#6C542F"
    />
    <defs>
      <radialGradient
        id="paint0_radial_1648_44345"
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
        id="paint1_linear_1648_44345"
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

CustomEmojiFelling5.defaultProps = {
  fill: 'none',
  width: '75px',
  height: '75px',
}

export default CustomEmojiFelling5
