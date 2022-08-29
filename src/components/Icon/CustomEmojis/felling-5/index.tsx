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
      d="M44.8758 67.6953C61.4222 63.6923 71.5907 47.0337 67.5877 30.4872C63.5847 13.9408 46.9261 3.77235 30.3796 7.77536C13.8332 11.7784 3.66475 28.437 7.66776 44.9834C11.6708 61.5298 28.3294 71.6983 44.8758 67.6953Z"
      fill="white"
    />
    <path
      d="M45.2285 69.1532C62.5802 64.9554 73.2434 47.4862 69.0456 30.1345C64.8478 12.7829 47.3786 2.11961 30.0269 6.31742C12.6753 10.5152 2.01201 27.9845 6.20982 45.3361C10.4076 62.6878 27.8769 73.3511 45.2285 69.1532Z"
      fill="url(#paint0_linear_1424_19014)"
      stroke="white"
      strokeWidth="3"
    />
    <path
      d="M21.4395 31.4723C21.4395 31.4723 25.1766 27.5555 29.2324 31.4723"
      stroke="#525F7F"
      strokeWidth="2.53199"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M46.0178 31.4723C46.0178 31.4723 49.755 27.5555 53.8108 31.4723"
      stroke="#525F7F"
      strokeWidth="2.53199"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M37.6221 53.1188C44.7488 53.1188 50.6471 47.8404 51.6147 40.9861C51.7653 39.9315 50.9484 38.9871 49.8823 38.9871H25.3619C24.2958 38.9871 23.4789 39.9315 23.6295 40.9861C24.6029 47.8462 30.4954 53.1188 37.6221 53.1188Z"
      fill="#525F7F"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1424_19014"
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

CustomEmojiFelling5.defaultProps = {
  fill: 'none',
  width: '75px',
  height: '75px',
}

export default CustomEmojiFelling5
