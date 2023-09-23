import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface StarIconProperties extends IconProps, AcessibleIconProperties {}

const StarIconOutlined = ({ title, desc, ...rest }: StarIconProperties): ReactElement => (
  <Icon
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.7839 4.78699L15.6114 8.43774C15.7905 8.79614 16.1362 9.04466 16.537 9.10217L20.625 9.6906C21.635 9.83643 22.037 11.0605 21.306 11.7619L18.3499 14.6024C18.0594 14.8818 17.9271 15.2833 17.9958 15.6776L18.6935 19.6878C18.8653 20.6798 17.8095 21.4367 16.9067 20.9674L13.2529 19.0727C12.8947 18.8868 12.4657 18.8868 12.1065 19.0727L8.45269 20.9674C7.54992 21.4367 6.49408 20.6798 6.66693 19.6878L7.36353 15.6776C7.43226 15.2833 7.30002 14.8818 7.00951 14.6024L4.05337 11.7619C3.3224 11.0605 3.72433 9.83643 4.73435 9.6906L8.82234 9.10217C9.22322 9.04466 9.56996 8.79614 9.74906 8.43774L11.5754 4.78699C12.0273 3.88432 13.332 3.88432 13.7839 4.78699Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
)

StarIconOutlined.defaultProps = {
  fill: 'none',
}

export default StarIconOutlined
