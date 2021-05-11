import { useRecoilValue } from 'recoil'
import smartlookClient from 'smartlook-client'

import getConfig from 'src/config'

import { userAtomFamily } from '../../../state/recoil/user'
import meAtom from '../../../state/recoil/user/me'

export const SmartlookProvider = () => {
  const myID = useRecoilValue(meAtom)
  const user = useRecoilValue(userAtomFamily(myID))
  const { publicRuntimeConfig } = getConfig()

  const isInitialized = smartlookClient.initialized()
  if (publicRuntimeConfig.environment === 'production' && !isInitialized)
    smartlookClient.init(publicRuntimeConfig.smartlook.id)

  if (isInitialized && user && user.id) {
    smartlookClient.identify(user.id, {
      name: user.fullName ?? '',
      company: user.companies?.edges[0]?.node.name ?? '',
    })
  }

  // eslint-disable-next-line unicorn/no-null
  return null
}
