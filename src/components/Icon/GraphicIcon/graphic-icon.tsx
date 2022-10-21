import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface GraphicIconProperties extends IconProps, AcessibleIconProperties {}

const GraphicIcon = ({ title, desc, ...rest }: GraphicIconProperties): ReactElement => (
  <Icon viewBox="0 0 39 39" width="39" height="39" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      d="M19.4473 0.0732422C8.95452 0.0732422 0.447266 8.58049 0.447266 19.0732C0.447266 29.566 8.95452 38.0732 19.4473 38.0732C29.94 38.0732 38.4473 29.566 38.4473 19.0732C38.4473 8.58049 29.94 0.0732422 19.4473 0.0732422Z"
      fill="#F2F6FE"
    />
    <path
      d="M19.4473 0.0732422C8.95452 0.0732422 0.447266 8.58049 0.447266 19.0732C0.447266 29.566 8.95452 38.0732 19.4473 38.0732C29.94 38.0732 38.4473 29.566 38.4473 19.0732C38.4473 8.58049 29.94 0.0732422 19.4473 0.0732422Z"
      stroke="#E8EEFC"
    />
    <path
      d="M24.1228 9H14.7806C11.3762 9 9.44727 10.9289 9.44727 14.3333V23.6667C9.44727 27.0711 11.3762 29 14.7806 29H24.1228C27.5273 29 29.4473 27.0711 29.4473 23.6667V14.3333C29.4473 10.9289 27.5273 9 24.1228 9Z"
      fill="#8491B0"
    />
    <path
      d="M14.4473 22.9885L17.4404 19.0984L20.8546 21.7803L23.9473 15.0001"
      stroke="#F2F6FE"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
)

GraphicIcon.defaultProps = {
  fill: 'none',
}

export default GraphicIcon
