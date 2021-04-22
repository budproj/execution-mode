import { useRouter } from 'next/router'
import React, { ReactElement, useEffect } from 'react'
import { IntlConfig, IntlProvider } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { intlLocaleAtom, currentNextRoute } from 'src/state/recoil/intl'

export interface RecoilIntlProviderProperties extends IntlConfig {
  children?: ReactElement
}

const RecoilIntlProvider = (properties: RecoilIntlProviderProperties): ReactElement => {
  const router = useRouter()
  const setIntl = useSetRecoilState(intlLocaleAtom)
  const setCurrentNextRoute = useSetRecoilState(currentNextRoute)

  useEffect(() => {
    setIntl(properties.locale)
  }, [setIntl, properties.locale])

  useEffect(() => {
    setCurrentNextRoute(router.pathname)
  }, [setCurrentNextRoute, router.pathname])

  return <IntlProvider {...properties} />
}

export default RecoilIntlProvider
