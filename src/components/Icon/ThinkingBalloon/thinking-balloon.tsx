import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface ThinkingBalloonIconProperties extends IconProps, AcessibleIconProperties {}

const ThinkingBalloonIcon = ({
  title,
  desc,
  ...rest
}: ThinkingBalloonIconProperties): ReactElement => (
  <Icon viewBox="0 0 16 13" fill="none" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      stroke="transparent"
      d="M7.52599 0C3.16849 0 0.0109921 3.07938 0.0109921 6.49659C0.0109921 7.58802 0.11759 8.44636 0.76259 9.47282C0.88259 9.64173 0.94458 10.0174 0.762563 10.452C0.580546 10.8865 0.0993802 11.9475 0.0109591 12.2619C-0.0774619 12.5763 0.385765 13.1266 1.01454 12.9737C1.64331 12.8207 2.34432 12.3469 2.90432 12.2619C3.46432 12.1769 3.89651 12.171 4.27976 12.3724C5.37476 12.9311 6.28099 12.9737 7.51099 12.9737C11.231 12.9737 15.011 10.4855 15.011 6.4771C15.011 3.02091 11.786 0 7.52599 0Z"
      fill="#CDD6ED"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      stroke="transparent"
      d="M4.03855 7.49979C3.51355 7.49979 3.07855 7.06414 3.07855 6.53835C3.07855 6.00505 3.50605 5.5769 4.03855 5.5769C4.57105 5.5769 4.99855 6.00505 4.99855 6.53835C4.99855 7.06414 4.57105 7.49228 4.03855 7.49979ZM7.49631 7.49988C6.96381 7.49237 6.53631 7.06423 6.53631 6.53093C6.53631 6.00514 6.97131 5.56949 7.49631 5.577C8.02881 5.577 8.45631 6.00514 8.45631 6.53844C8.45631 7.06423 8.02881 7.49988 7.49631 7.49988ZM9.99369 6.53835C9.99369 7.06414 10.4212 7.49979 10.9537 7.49979C11.4862 7.49979 11.9137 7.06414 11.9137 6.53835C11.9137 6.00505 11.4862 5.5769 10.9537 5.5769C10.4212 5.5769 9.99369 6.00505 9.99369 6.53835Z"
      fill="#525F7F"
    />
  </Icon>
)

ThinkingBalloonIcon.defaultProps = {
  stroke: '#8491B0',
}

export default ThinkingBalloonIcon
