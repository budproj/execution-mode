import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface PuzzleIconIconProperties extends IconProps, AcessibleIconProperties {}

const PuzzleIcon = ({ title, desc, ...rest }: PuzzleIconIconProperties): ReactElement => (
  <Icon width="49" height="48" viewBox="0 0 49 48" fill="none" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <circle cx="24.5" cy="24" r="24" fill="#6F6EFF" />
    <path
      opacity="0.4"
      d="M26.4475 21.703V19.6832C26.051 19.6832 25.7222 19.3638 25.7222 18.9786V16.5736C25.7222 16.2532 25.461 16.0005 25.1322 16.0005H18.4881C16.3991 16.0005 14.697 17.653 14.697 19.6832V22.1155C14.697 22.3043 14.7744 22.4828 14.9098 22.6143C15.0452 22.7449 15.2289 22.8201 15.4224 22.8201C16.1574 22.8201 16.7183 23.3274 16.7183 23.9944C16.7183 24.6905 16.1477 25.2448 15.432 25.2533C15.0355 25.2533 14.697 25.5257 14.697 25.9203V28.3262C14.697 30.3555 16.3991 31.9995 18.4785 31.9995H25.1322C25.461 31.9995 25.7222 31.745 25.7222 31.4265V29.3963C25.7222 29.0027 26.051 28.6917 26.4475 28.6917V26.8701C26.051 26.8701 25.7222 26.5497 25.7222 26.1655V22.4076C25.7222 22.0224 26.051 21.703 26.4475 21.703Z"
      fill="#F8F9FD"
    />
    <path
      d="M32.6757 23.9948C32.6757 24.69 33.256 25.2443 33.962 25.2537C34.3585 25.2537 34.697 25.5262 34.697 25.9113V28.3258C34.697 30.3559 33.0046 32 30.9156 32H27.7628C27.4436 32 27.1728 31.7454 27.1728 31.426V29.3967C27.1728 29.0022 26.8537 28.6921 26.4475 28.6921V26.8705C26.8537 26.8705 27.1728 26.5502 27.1728 26.1659V22.4081C27.1728 22.022 26.8537 21.7035 26.4475 21.7035V19.6827C26.8537 19.6827 27.1728 19.3633 27.1728 18.9781V16.574C27.1728 16.2537 27.4436 16 27.7628 16H30.9156C33.0046 16 34.697 17.6441 34.697 19.6733V22.0407C34.697 22.2286 34.6197 22.4081 34.4843 22.5387C34.3489 22.6702 34.1651 22.7453 33.9717 22.7453C33.256 22.7453 32.6757 23.31 32.6757 23.9948Z"
      fill="#F8F9FD"
    />
  </Icon>
)

PuzzleIcon.defaultProps = {
  fill: 'black',
}

export default PuzzleIcon
