import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface WalletIconProperties extends IconProps, AcessibleIconProperties {}

const WalletIcon = ({ title, desc, ...rest }: WalletIconProperties): ReactElement => (
  <Icon viewBox="0 0 24 24" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.9964 8.37513H17.7618C15.7911 8.37859 14.1947 9.93514 14.1911 11.8566C14.1884 13.7823 15.7867 15.3458 17.7618 15.3484H22V15.6543C22 19.0136 19.9636 21 16.5173 21H7.48356C4.03644 21 2 19.0136 2 15.6543V8.33786C2 4.97862 4.03644 3 7.48356 3H16.5138C19.96 3 21.9964 4.97862 21.9964 8.33786V8.37513ZM6.73956 8.36733H12.3796H12.3831H12.3902C12.8124 8.36559 13.1538 8.03019 13.152 7.61765C13.1502 7.20598 12.8053 6.87318 12.3831 6.87491H6.73956C6.32 6.87664 5.97956 7.20858 5.97778 7.61852C5.976 8.03019 6.31733 8.36559 6.73956 8.36733Z"
    />
    <path
      opacity="0.4"
      d="M16.0374 12.2967C16.2465 13.2479 17.0805 13.9171 18.0326 13.8997H21.2825C21.6787 13.8997 22 13.5716 22 13.166V10.6345C21.9991 10.2298 21.6787 9.90087 21.2825 9.9H17.9561C16.8731 9.90348 15.9983 10.8024 16 11.9103C16 12.0399 16.0128 12.1696 16.0374 12.2967"
    />
    <circle cx="18" cy="11.9" r="1" />
  </Icon>
)

WalletIcon.defaultProps = {
  fill: 'black',
}

export default WalletIcon
