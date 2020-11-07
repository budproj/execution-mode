import { SvgIcon, SvgIconProps } from '@material-ui/core'
import React, { ReactElement } from 'react'

import { AcessibleIconProps } from 'components/Icons/types'

export interface ArrowRightIconProps extends SvgIconProps, AcessibleIconProps {}

const ArrowRight = ({ title, desc, ...rest }: ArrowRightIconProps): ReactElement => (
  <SvgIcon viewBox="0 0 5 8" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.76783 3.45413C5.08226 3.77226 5.07731 4.27524 4.75299 4.58678L1.46237 7.76272C1.13384 8.07909 0.602195 8.07909 0.273659 7.76272C-0.0552181 7.44522 -0.0552181 6.93099 0.273659 6.61463L2.97033 4.01269L0.246058 1.38438C-0.0820192 1.06687 -0.0820192 0.553898 0.246058 0.237529C0.575394 -0.0791769 1.10783 -0.0791769 1.43556 0.237529L4.72779 3.41267C4.74173 3.42614 4.75508 3.43997 4.76783 3.45413Z"
    />
  </SvgIcon>
)

ArrowRight.defaultProps = {
  htmlColor: 'black',
}

export default ArrowRight
