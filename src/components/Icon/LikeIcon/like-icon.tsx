import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface LikeIconProperties extends IconProps, AcessibleIconProperties {}

const LikeIcon = ({ title, desc, ...rest }: LikeIconProperties): ReactElement => (
  <Icon width="21" height="20" viewBox="0 0 21 20" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <circle cx="10.5" cy="10" r="10" fill="#24CB8D" />
    <path
      d="M11.7645 5.44097C11.5168 5.46703 11.2821 5.63643 11.1518 5.88401C10.9823 6.22281 9.73089 8.73775 9.48321 8.98533C9.07921 9.38919 8.54464 9.81328 8.54464 10.3845V11.9563C8.54464 13.3957 9.71146 14.5625 11.1508 14.5625H13.1071C13.3252 14.5625 13.5184 14.4551 13.6407 14.2928C13.7033 14.2097 13.7367 14.111 13.7712 14.0128C14.0172 13.3137 15.0625 10.3237 15.0625 10.0017C15.0625 9.63687 14.7757 9.35019 14.4107 9.35019H12.4554C12.0904 9.35019 11.8036 9.02443 11.8036 8.69866C11.8036 8.37289 12.312 6.6398 12.4162 6.301C12.5205 5.9622 12.3511 5.59734 12.0121 5.48006C11.9209 5.454 11.8557 5.42794 11.7645 5.44097ZM6.58929 9.35019C6.22931 9.35019 5.9375 9.64201 5.9375 10.002V13.9107C5.9375 14.2707 6.22931 14.5625 6.58929 14.5625C6.94926 14.5625 7.24107 14.2707 7.24107 13.9107V10.002C7.24107 9.64201 6.94926 9.35019 6.58929 9.35019Z"
      fill="white"
    />
  </Icon>
)

LikeIcon.defaultProps = {
  fill: 'black',
}

export default LikeIcon
