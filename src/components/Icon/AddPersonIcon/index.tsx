import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface StarIconProperties extends IconProps, AcessibleIconProperties {}

const StarIcon = ({ title, desc, ...rest }: StarIconProperties): ReactElement => (
  <Icon width="40" height="40" viewBox="0 0 40 40" fill="none" strokeWidth={0} {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <rect width="40" height="40" rx="20" fill="#F53D7A" />
    <path
      d="M29.101 17.5879H27.8979V16.4116C27.8979 15.9094 27.4952 15.5 26.999 15.5C26.5038 15.5 26.1 15.9094 26.1 16.4116V17.5879H24.899C24.4027 17.5879 24 17.9973 24 18.4995C24 19.0016 24.4027 19.4111 24.899 19.4111H26.1V20.5884C26.1 21.0906 26.5038 21.5 26.999 21.5C27.4952 21.5 27.8979 21.0906 27.8979 20.5884V19.4111H29.101C29.5962 19.4111 30 19.0016 30 18.4995C30 17.9973 29.5962 17.5879 29.101 17.5879Z"
      fill="white"
    />
    <path
      d="M17.5 23.0156C13.4542 23.0156 10 23.6625 10 26.2467C10 28.83 13.4332 29.5001 17.5 29.5001C21.5448 29.5001 25 28.8533 25 26.269C25 23.6848 21.5668 23.0156 17.5 23.0156Z"
      fill="white"
    />
    <path
      opacity="0.4"
      d="M17.4997 20.5542C20.2543 20.5542 22.4624 18.3177 22.4624 15.5276C22.4624 12.7375 20.2543 10.5 17.4997 10.5C14.7452 10.5 12.5371 12.7375 12.5371 15.5276C12.5371 18.3177 14.7452 20.5542 17.4997 20.5542Z"
      fill="white"
    />
  </Icon>
)

StarIcon.defaultProps = {
  fill: 'none',
}

export default StarIcon
