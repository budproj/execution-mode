import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icons/types'

export interface VideoIconProperties extends IconProps, AcessibleIconProperties {}

const Video = ({ title, desc, ...rest }: VideoIconProperties): ReactElement => (
  <Icon viewBox="0 0 24 24" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      opacity="0.4"
      d="M21.331 7.44254C20.912 7.17858 20.397 7.15523 19.958 7.37858L18.476 8.1268C17.928 8.40294 17.588 8.96132 17.588 9.58264V15.4161C17.588 16.0375 17.928 16.5948 18.476 16.873L19.957 17.6202C20.158 17.7238 20.373 17.7735 20.588 17.7735C20.846 17.7735 21.102 17.7004 21.331 17.5573C21.75 17.2943 22 16.8385 22 16.339V8.66183C22 8.16233 21.75 7.7065 21.331 7.44254"
    />
    <path d="M11.9051 20H6.11304C3.69102 20 2 18.3299 2 15.9391V9.06091C2 6.66904 3.69102 5 6.11304 5H11.9051C14.3271 5 16.0181 6.66904 16.0181 9.06091V15.9391C16.0181 18.3299 14.3271 20 11.9051 20" />
  </Icon>
)

Video.defaultProps = {
  fill: 'black',
}

export default Video
