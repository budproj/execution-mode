import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface TimesIconProperties extends IconProps, AcessibleIconProperties {}

const TimesIcon = ({ title, desc, ...rest }: TimesIconProperties): ReactElement => (
  <Icon viewBox="0 0 16 16" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path d="M8 7.05733L4.47133 3.52866C4.3456 3.40722 4.17719 3.34002 4.0024 3.34154C3.8276 3.34306 3.66039 3.41318 3.53678 3.53678C3.41318 3.66039 3.34307 3.82759 3.34155 4.00239C3.34003 4.17719 3.40723 4.34559 3.52866 4.47133L7.05733 7.99999L3.52866 11.5287C3.40723 11.6544 3.34003 11.8228 3.34155 11.9976C3.34307 12.1724 3.41318 12.3396 3.53678 12.4632C3.66039 12.5868 3.8276 12.6569 4.0024 12.6584C4.17719 12.66 4.3456 12.5928 4.47133 12.4713L8 8.94266L11.5287 12.4713C11.6544 12.5928 11.8228 12.66 11.9976 12.6584C12.1724 12.6569 12.3396 12.5868 12.4632 12.4632C12.5868 12.3396 12.6569 12.1724 12.6584 11.9976C12.66 11.8228 12.5928 11.6544 12.4713 11.5287L8.94266 7.99999L12.4713 4.47133C12.535 4.40983 12.5858 4.33627 12.6207 4.25493C12.6557 4.17359 12.6741 4.08611 12.6748 3.99759C12.6756 3.90907 12.6587 3.82129 12.6252 3.73936C12.5917 3.65743 12.5422 3.58299 12.4796 3.5204C12.417 3.4578 12.3426 3.4083 12.2606 3.37478C12.1787 3.34126 12.0909 3.32439 12.0024 3.32516C11.9139 3.32593 11.8264 3.34432 11.7451 3.37926C11.6637 3.4142 11.5902 3.46499 11.5287 3.52866L8 7.05733Z" />
  </Icon>
)

TimesIcon.defaultProps = {
  fill: 'black',
}

export default TimesIcon
