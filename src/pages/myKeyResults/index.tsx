import React, { ReactElement } from 'react'

import withIntlProxy from 'hocs/withIntlProxy'
import { IntlRouteGroup } from 'hocs/withIntlProxy/types'

const intlRouteGroup: IntlRouteGroup = {
  'pt-BR': '/resultados-chave',
  'en-US': '/key-results',
}

const MyKeyResultsIndex = (): ReactElement => <p>You are at: "My Key Results"</p>

export default withIntlProxy(MyKeyResultsIndex, intlRouteGroup, intlRouteGroup['pt-BR'])
