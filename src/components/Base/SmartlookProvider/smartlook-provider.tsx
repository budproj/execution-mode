import smartlookClient from 'smartlook-client'

import getConfig from 'src/config'

const SmartlookProvider = () => {
  const { publicRuntimeConfig } = getConfig()
  if (publicRuntimeConfig.environment === 'production')
    smartlookClient.init(publicRuntimeConfig.smartlook.id)

  // eslint-disable-next-line unicorn/no-null
  return null
}

export default SmartlookProvider
