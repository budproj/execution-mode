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
      d="M44.8758 67.6953C61.4222 63.6923 71.5907 47.0337 67.5877 30.4873C63.5847 13.9408 46.9261 3.77235 30.3796 7.77536C13.8332 11.7784 3.66475 28.437 7.66776 44.9834C11.6708 61.5298 28.3294 71.6983 44.8758 67.6953Z"
      fill="white"
    />
    <path
      d="M45.2285 69.1532C62.5802 64.9554 73.2434 47.4862 69.0456 30.1345C64.8478 12.7829 47.3786 2.11961 30.0269 6.31742C12.6753 10.5152 2.01201 27.9845 6.20982 45.3361C10.4076 62.6878 27.8769 73.351 45.2285 69.1532Z"
      fill="url(#paint0_linear_1424_18991)"
      stroke="white"
      strokeWidth="3"
    />
    <path
      d="M25.5472 36.3311C27.0159 36.3311 28.2066 35.1404 28.2066 33.6716C28.2066 32.2029 27.0159 31.0122 25.5472 31.0122C24.0784 31.0122 22.8877 32.2029 22.8877 33.6716C22.8877 35.1404 24.0784 36.3311 25.5472 36.3311Z"
      fill="#525F7F"
    />
    <path
      d="M49.7083 36.3311C51.1771 36.3311 52.3678 35.1404 52.3678 33.6716C52.3678 32.2029 51.1771 31.0122 49.7083 31.0122C48.2395 31.0122 47.0488 32.2029 47.0488 33.6716C47.0488 35.1404 48.2395 36.3311 49.7083 36.3311Z"
      fill="#525F7F"
    />
    <path
      d="M28.4077 46.0529C28.4077 46.0529 30.3255 50.7461 37.5043 50.7461C44.6831 50.7461 46.4445 46.0529 46.4445 46.0529"
      stroke="#525F7F"
      strokeWidth="2.53199"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1424_18991"
        x1="64.3292"
        y1="22.3219"
        x2="10.9256"
        y2="53.152"
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

CustomEmojiFelling4.defaultProps = {
  fill: 'none',
  width: '75px',
  height: '75px',
}

export default CustomEmojiFelling4
