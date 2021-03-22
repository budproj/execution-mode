import React from 'react'
import { useIntl } from 'react-intl'

import { RouteTab, RouteTabs } from 'src/components/Base'

import messages from './messages'

const MyKeyResultsPageSwitcher = () => {
  const intl = useIntl()

  return (
    <RouteTabs>
      <RouteTab href="/my-key-results">{intl.formatMessage(messages.firstTab)}</RouteTab>
      <RouteTab href="/my-key-results/previous-cycles">
        {intl.formatMessage(messages.secondTab)}
      </RouteTab>
    </RouteTabs>
  )
}

export default MyKeyResultsPageSwitcher
