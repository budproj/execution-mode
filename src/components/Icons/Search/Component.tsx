import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { SvgIcon, SvgIconProps } from '@material-ui/core'

import messages from './messages'

const Search = (props: SvgIconProps): ReactElement => {
  const intl = useIntl()

  return (
    <SvgIcon viewBox="0 0 18 18" {...props}>
      <title>{intl.formatMessage(messages.title)}</title>
      <desc>{intl.formatMessage(messages.desc)}</desc>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.9606 2.27417C4.81926 2.27417 2.27417 4.81836 2.27417 7.9606C2.27417 11.1002 4.81926 13.647 7.9606 13.647C11.101 13.647 13.6461 11.1002 13.6461 7.9606C13.6461 4.81836 11.101 2.27417 7.9606 2.27417ZM18 16.392L16.392 18L12.7326 14.3406C11.4025 15.338 9.75678 15.9342 7.96802 15.9342C3.56672 15.9342 0 12.3675 0 7.96712C0 3.56583 3.56672 0 7.96802 0C12.3675 0 15.9351 3.56583 15.9351 7.96712C15.9351 9.75678 15.3371 11.4034 14.3415 12.7336L18 16.392Z"
        fill="#546181"
      />
    </SvgIcon>
  )
}

export default Search
