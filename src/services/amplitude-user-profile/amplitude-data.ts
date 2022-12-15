import axios from 'axios'

import getConfig from 'src/config'

export const getDataFromAmplitude = () => {
  const config = getConfig()

  return axios.create({
    baseURL:
      config.publicRuntimeConfig.amplitude.userProfileUrl &&
      `${config.publicRuntimeConfig.amplitude.userProfileUrl}`,
    headers: {
      authorization: `Api-Key ${
        config.publicRuntimeConfig.nodeEnv === 'development'
          ? config.publicRuntimeConfig.amplitude.devSecretKey
          : config.publicRuntimeConfig.amplitude.prodSecretKey
      }`,
    },
  })
}
