import { SvgIcon, SvgIconProps } from '@material-ui/core'
import React, { ReactElement } from 'react'

import { AcessibleIconProps } from 'components/Icons/types'

export interface DiscoveryIconProps extends SvgIconProps, AcessibleIconProps {}

const Discovery = ({ title, desc, ...rest }: DiscoveryIconProps): ReactElement => (
  <SvgIcon viewBox="0 0 24 24" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      opacity="0.4"
      d="M21.9999 11.9999C21.9999 17.5229 17.5229 21.9999 11.9999 21.9999C6.47688 21.9999 1.99988 17.5229 1.99988 11.9999C1.99988 6.47789 6.47688 1.99989 11.9999 1.99989C17.5229 1.99989 21.9999 6.47789 21.9999 11.9999"
    />
    <path d="M15.8598 8.70489L14.2398 13.8249C14.1798 14.0349 14.0098 14.2049 13.7998 14.2659L8.69978 15.8649C8.35978 15.9759 8.02978 15.6449 8.13978 15.3049L9.73978 10.1749C9.79978 9.96489 9.96978 9.80489 10.1798 9.73489L15.2998 8.13489C15.6498 8.02489 15.9698 8.35489 15.8598 8.70489" />
  </SvgIcon>
)

Discovery.defaultProps = {
  htmlColor: 'black',
}

export default Discovery
