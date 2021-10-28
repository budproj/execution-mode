import React from 'react'
import { useIntl } from 'react-intl'

import { SearchBar, SearchProperties } from 'src/components/Base/SearchBar/wrapper'

import messages from './messages'

export const TeamSearch = ({ onSearch: onChange }: SearchProperties) => {
  const intl = useIntl()

  return <SearchBar placeholder={intl.formatMessage(messages.placeholder)} onSearch={onChange} />
}
