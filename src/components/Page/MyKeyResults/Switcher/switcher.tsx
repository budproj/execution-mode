import React from 'react'

import { RouteTab, RouteTabs } from 'src/components/Base'

const MyKeyResultsPageSwitcher = () => {
  return (
    <RouteTabs>
      <RouteTab href="/my-key-results">Teste</RouteTab>
      <RouteTab href="/my-key-results/previous-cycles">Teste 2</RouteTab>
    </RouteTabs>
  )
}

export default MyKeyResultsPageSwitcher
