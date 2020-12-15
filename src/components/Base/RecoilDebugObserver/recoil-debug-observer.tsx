import { useEffect } from 'react'
import { useRecoilSnapshot } from 'recoil'

import logger from 'lib/logger'
import getConfig from 'src/config'

const RecoilDebugObserver = () => {
  const snapshot = useRecoilSnapshot()
  const { publicRuntimeConfig } = getConfig()

  useEffect(() => {
    if (publicRuntimeConfig.environment !== 'production') {
      logger.debug('The following atoms were modified:', { component })
      for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
        logger.debug(node.key, { data: snapshot.getLoadable(node), component })
      }
    }
  }, [snapshot, publicRuntimeConfig.environment])

  return null // eslint-disable-line unicorn/no-null
}

const component = RecoilDebugObserver.name

export default RecoilDebugObserver
