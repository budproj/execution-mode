import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

import CentralizedIcon from 'components/Icons/CentralizedIcon/Component'

const Search = (): ReactElement => {
  const intl = useIntl()

  return (
    <CentralizedIcon>
      <img
        src={'/icons/search.svg'}
        alt={intl.formatMessage(messages.alt)}
        title={intl.formatMessage(messages.title)}
      />
    </CentralizedIcon>
  )
}

export default Search
