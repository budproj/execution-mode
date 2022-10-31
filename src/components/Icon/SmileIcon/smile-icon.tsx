import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface SmileIconProperties extends IconProps, AcessibleIconProperties {}

const SmileIcon = ({ title, desc, ...rest }: SmileIconProperties): ReactElement => (
  <Icon viewBox="0 0 39 39" width="39" height="39" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      d="M19.4473 0C8.95452 0 0.447266 8.50725 0.447266 19C0.447266 29.4928 8.95452 38 19.4473 38C29.94 38 38.4473 29.4928 38.4473 19C38.4473 8.50725 29.94 0 19.4473 0Z"
      fill="#F2F6FE"
    />
    <path
      d="M19.4473 0C8.95452 0 0.447266 8.50725 0.447266 19C0.447266 29.4928 8.95452 38 19.4473 38C29.94 38 38.4473 29.4928 38.4473 19C38.4473 8.50725 29.94 0 19.4473 0Z"
      stroke="#E8EEFC"
    />
    <rect x="9.44727" y="8.75488" width="20" height="20" rx="10" fill="#D9E2F7" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.6153 21.7501C13.309 21.2906 13.4331 20.6697 13.8927 20.3634C14.3522 20.057 14.9731 20.1812 15.2794 20.6407C16.4365 22.3763 17.8017 23.1954 19.4474 23.1954C21.093 23.1954 22.4583 22.3763 23.6153 20.6407C23.9217 20.1812 24.5425 20.057 25.0021 20.3634C25.4616 20.6697 25.5858 21.2906 25.2794 21.7501C23.7698 24.0146 21.8017 25.1954 19.4474 25.1954C17.093 25.1954 15.125 24.0146 13.6153 21.7501Z"
      fill="#8491B0"
    />
    <ellipse cx="17.0469" cy="15.8755" rx="0.96" ry="2.4" fill="#8491B0" />
    <ellipse cx="21.8467" cy="15.8755" rx="0.96" ry="2.4" fill="#8491B0" />
  </Icon>
)

SmileIcon.defaultProps = {
  fill: 'none',
}

export default SmileIcon
