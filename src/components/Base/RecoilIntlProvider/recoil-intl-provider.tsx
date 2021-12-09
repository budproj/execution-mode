import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { IntlConfig, IntlProvider } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { currentNextRoute, intlLocaleAtom } from 'src/state/recoil/intl'

import { LOCALE_COOKIE_KEY } from '../LocaleSwitcher/constants'

import queries from './queries.gql'

export interface RecoilIntlProviderProperties extends IntlConfig {
  children?: ReactElement
}

const RecoilIntlProvider = (properties: RecoilIntlProviderProperties): ReactElement => {
  const { push, pathname, query, asPath } = useRouter()
  const setIntl = useSetRecoilState(intlLocaleAtom)
  const setCurrentNextRoute = useSetRecoilState(currentNextRoute)
  const [locale, setCookie] = useCookies([LOCALE_COOKIE_KEY])

  useQuery(queries.GET_MY_LOCALE, {
    onCompleted: async (data) => {
      const savedLocale = data.me.settings.edges[0]?.node?.value
      if (locale !== savedLocale) setCookie(LOCALE_COOKIE_KEY, savedLocale, { path: '/' })

      await push({ pathname, query }, asPath, { locale: savedLocale })
    },
  })

  useEffect(() => {
    setIntl(properties.locale)
  }, [setIntl, properties.locale])

  useEffect(() => {
    setCurrentNextRoute(pathname)
  }, [setCurrentNextRoute, pathname])

  return <IntlProvider {...properties} />
}

export default RecoilIntlProvider
