import { SvgIcon, SvgIconProps } from '@material-ui/core'
import React, { ReactElement } from 'react'

import { AcessibleIconProps } from 'components/Icons/types'

export interface ReorderIconProps extends SvgIconProps, AcessibleIconProps {}

const Reorder = ({ title, desc, ...rest }: ReorderIconProps): ReactElement => (
  <SvgIcon viewBox="0 0 6 14" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 0H0V2H6V0ZM6 4H0V6H6V4ZM0 8H6V10H0V8ZM6 12H0V14H6V12Z"
    />
  </SvgIcon>
)

Reorder.defaultProps = {
  htmlColor: 'black',
}

export default Reorder
