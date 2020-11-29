import React, { ReactElement, useEffect } from 'react'
import { IntlProvider } from 'react-intl'
import { OptionalIntlConfig } from 'react-intl/src/components/provider'
import { useSetRecoilState } from 'recoil'

import { intlLocaleAtom } from 'src/state/recoil/intl'

export interface RecoilIntlProviderProperties extends OptionalIntlConfig {
  children: ReactElement
}

const RecoilIntlProvider = (properties: RecoilIntlProviderProperties): ReactElement => {
  const setRecoilIntl = useSetRecoilState(intlLocaleAtom)

  useEffect(() => {
    setRecoilIntl(properties.locale)
  }, [setRecoilIntl, properties.locale])

  return <IntlProvider {...properties} />
}

export default RecoilIntlProvider
