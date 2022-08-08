import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface TimesInvertedCircleProperties extends IconProps, AcessibleIconProperties {}

const ThreeUsersIcon = ({ title, desc, ...rest }: TimesInvertedCircleProperties): ReactElement => (
  <Icon viewBox="0 0 60 61" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <svg width="60" height="61" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Iconly/Light/3 User">
        <g id="3 User">
          <path
            id="Stroke 1"
            d="M44.7192 27.7418C48.2067 27.2518 50.8917 24.2618 50.8992 20.6393C50.8992 17.0693 48.2967 14.1093 44.8842 13.5493"
            stroke="#6F6EFF"
            strokeWidth="3.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Stroke 3"
            d="M49.3213 36.1262C52.6988 36.6312 55.0563 37.8137 55.0563 40.2512C55.0563 41.9287 53.9463 43.0187 52.1513 43.7037"
            stroke="#6F6EFF"
            strokeWidth="3.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Stroke 5"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M29.7168 37.1602C21.6818 37.1602 14.8193 38.3777 14.8193 43.2402C14.8193 48.1002 21.6393 49.3527 29.7168 49.3527C37.7518 49.3527 44.6118 48.1477 44.6118 43.2827C44.6118 38.4177 37.7943 37.1602 29.7168 37.1602Z"
            stroke="#6F6EFF"
            strokeWidth="3.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Stroke 7"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M29.716 30.22C34.9885 30.22 39.2635 25.9475 39.2635 20.6725C39.2635 15.4 34.9885 11.125 29.716 11.125C24.4435 11.125 20.1685 15.4 20.1685 20.6725C20.1485 25.9275 24.391 30.2025 29.646 30.22H29.716Z"
            stroke="#6F6EFF"
            strokeWidth="3.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Stroke 9"
            d="M14.7127 27.7418C11.2227 27.2518 8.54021 24.2618 8.53271 20.6393C8.53271 17.0693 11.1352 14.1093 14.5477 13.5493"
            stroke="#6F6EFF"
            strokeWidth="3.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Stroke 11"
            d="M10.11 36.1262C6.7325 36.6312 4.375 37.8137 4.375 40.2512C4.375 41.9287 5.485 43.0187 7.28 43.7037"
            stroke="#6F6EFF"
            strokeWidth="3.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  </Icon>
)

ThreeUsersIcon.defaultProps = {
  fill: 'black',
}

export default ThreeUsersIcon
