import React from 'react'
import { useIntl } from 'react-intl'

import { Search, SearchProperties } from 'src/components/Base/Search/wrapper'

import messages from './messages'

export const TeamSearch = ({ onSearch: onChange }: SearchProperties) => {
  const intl = useIntl()

  return <Search placeholder={intl.formatMessage(messages.placeholder)} onSearch={onChange} />
}
