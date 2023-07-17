import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface ThumbIconProperties extends IconProps, AcessibleIconProperties {}

const ThumbIcon = ({ title, desc, ...rest }: ThumbIconProperties): ReactElement => (
  <Icon
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <title>{title}</title>
    <desc>{desc}</desc>
    <g id="Iconly/Light/Thumbs - Up">
      <g id="&#240;&#159;&#166;&#134; icon &#34;thumb up&#34;">
        <path
          id="Vector"
          d="M14.5289 2.88193C14.0336 2.93406 13.5643 3.27285 13.3036 3.76802C12.9646 4.44562 10.4618 9.4755 9.96643 9.97067V9.97067C9.15841 10.7784 8.08929 11.6266 8.08929 12.7691V17.125C8.08929 19.3341 9.88015 21.125 12.0893 21.125H17.2143C17.7061 21.125 18.1349 20.8516 18.3682 20.4559C18.421 20.3662 18.4554 20.2725 18.4901 20.1743C18.8587 19.1287 21.125 12.6738 21.125 12.0035C21.125 11.2737 20.5514 10.7004 19.8214 10.7004H15.9107C15.1807 10.7004 14.6071 10.0489 14.6071 9.39731C14.6071 8.74578 15.6239 5.27959 15.8325 4.60199C16.0411 3.92439 15.7021 3.19467 15.0243 2.96012C14.8418 2.90799 14.7114 2.85587 14.5289 2.88193ZM4.17857 10.7004C3.45863 10.7004 2.875 11.284 2.875 12.004V19.8214C2.875 20.5414 3.45863 21.125 4.17857 21.125V21.125C4.89851 21.125 5.48214 20.5414 5.48214 19.8214V12.004C5.48214 11.284 4.89851 10.7004 4.17857 10.7004V10.7004Z"
          stroke="#6F6EFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  </Icon>
)

ThumbIcon.defaultProps = {
  fill: 'black',
}

export default ThumbIcon
