import { Icon, IconProps } from '@chakra-ui/react'
import React from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface MountainIconProperties extends IconProps, AcessibleIconProperties {}

const MountainIcon = ({ title, desc, ...rest }: MountainIconProperties) => (
  <Icon
    width="21"
    height="16"
    viewBox="0 0 21 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      d="M10.5 0.000488281C10.0154 0.000488281 9.85385 0.278133 9.53077 0.555777L0.161538 13.7439C4.01185e-08 13.8827 0 14.1603 0 14.2992C0 14.9933 0.646154 15.2709 1.13077 15.2709H19.8692C20.5154 15.2709 21 14.9933 21 14.2992C21 14.0215 21 14.0215 20.8385 13.7439L11.6308 0.555777C11.3077 0.278133 10.9846 0.000488281 10.5 0.000488281ZM10.5 2.08282L15.8308 9.71804H14.5385L12.1154 7.6357L10.5 9.71804L8.88462 7.6357L6.46154 9.71804H5.00769L10.5 2.08282Z"
      fill="white"
    />
  </Icon>
)

MountainIcon.defaultProps = {
  fill: 'black',
}

export default MountainIcon
