import { hotjar } from 'react-hotjar'

import getConfig from 'src/config'

const Hotjar = () => {
  const { publicRuntimeConfig } = getConfig()
  if (publicRuntimeConfig.environment === 'production')
    hotjar.initialize(publicRuntimeConfig.hotjar.id, publicRuntimeConfig.hotjar.sv)

  // eslint-disable-next-line unicorn/no-null
  return null
}

export default Hotjar
