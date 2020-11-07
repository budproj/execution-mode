import React, { ReactElement } from 'react'
import { IntlProvider } from 'react-intl'
import { OptionalIntlConfig } from 'react-intl/src/components/provider'
import { useSetRecoilState } from 'recoil'

import { locale as localeAtom } from 'state/recoil/intl/locale'

const RecoilIntlProvider = (props: OptionalIntlConfig): ReactElement => {
  const setRecoilIntl = useSetRecoilState(localeAtom)
  setRecoilIntl(props.locale)

  return <IntlProvider {...props} />
}

export default RecoilIntlProvider
