import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface ImageIconProperties extends IconProps, AcessibleIconProperties {}

const Image = ({ title, desc, ...rest }: ImageIconProperties): ReactElement => (
  <Icon viewBox="0 0 31 31" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path d="M26.875 0.875H4.125C2.33263 0.875 0.875 2.33262 0.875 4.125V26.875C0.875 28.6674 2.33263 30.125 4.125 30.125H26.875C28.6674 30.125 30.125 28.6674 30.125 26.875V4.125C30.125 2.33262 28.6674 0.875 26.875 0.875ZM4.125 26.875V4.125H26.875L26.8783 26.875H4.125Z" />
    <path d="M12.25 18.75L10.625 17.125L5.75 23.625H25.25L17.125 12.25L12.25 18.75Z" />
    <path d="M9.8125 13.875C11.1587 13.875 12.25 12.7837 12.25 11.4375C12.25 10.0913 11.1587 9 9.8125 9C8.46631 9 7.375 10.0913 7.375 11.4375C7.375 12.7837 8.46631 13.875 9.8125 13.875Z" />
  </Icon>
)

Image.defaultProps = {
  fill: 'black',
}

export default Image
