import React, { ReactElement, useEffect } from 'react'
import { IntlProvider } from 'react-intl'
import { OptionalIntlConfig } from 'react-intl/src/components/provider'
import { useSetRecoilState } from 'recoil'

import { locale as localeAtom } from 'state/recoil/intl/locale'

export interface RecoilIntlProviderProperties extends OptionalIntlConfig {
  children: ReactElement
}

const RecoilIntlProvider = (properties: RecoilIntlProviderProperties): ReactElement => {
  const setRecoilIntl = useSetRecoilState(localeAtom)

  useEffect(() => {
    setRecoilIntl(properties.locale)
  }, [setRecoilIntl, properties.locale])

  return <IntlProvider {...properties} />
}

export default RecoilIntlProvider
