import { SvgIcon, SvgIconProps } from '@material-ui/core'
import React, { ReactElement } from 'react'

import { AcessibleIconProps } from 'components/Icons/types'

export interface TimesSquareIconProperties extends SvgIconProps, AcessibleIconProps {}

const TimesSquare = ({ title, desc, ...rest }: TimesSquareIconProperties): ReactElement => (
  <SvgIcon viewBox="0 0 24 24" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      opacity="0.4"
      d="M16.34 1.9998H7.67C4.28 1.9998 2 4.3798 2 7.9198V16.0898C2 19.6198 4.28 21.9998 7.67 21.9998H16.34C19.73 21.9998 22 19.6198 22 16.0898V7.9198C22 4.3798 19.73 1.9998 16.34 1.9998"
    />
    <path d="M15.5734 15.8143C15.4424 15.8143 15.3104 15.7803 15.1894 15.7093L11.2634 13.3673C11.0374 13.2313 10.8984 12.9863 10.8984 12.7223V7.67531C10.8984 7.26131 11.2344 6.92531 11.6484 6.92531C12.0624 6.92531 12.3984 7.26131 12.3984 7.67531V12.2963L15.9584 14.4193C16.3134 14.6323 16.4304 15.0923 16.2184 15.4483C16.0774 15.6833 15.8284 15.8143 15.5734 15.8143" />
  </SvgIcon>
)

TimesSquare.defaultProps = {
  htmlColor: 'black',
}

export default TimesSquare
