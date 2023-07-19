import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { IntlProvider } from 'react-intl'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { currentNextRoute, intlLocaleAtom } from 'src/state/recoil/intl'

import { LOCALE_COOKIE_KEY } from '../LocaleSwitcher/constants'

import queries from './queries.gql'

type IntlMessage = Record<string, string>

export interface RecoilIntlProviderProperties {
  children?: ReactElement
}

const getMessages = async (locale: string): Promise<IntlMessage | undefined> =>
  require(`../../../../compiled-lang/${locale}.json`)

const RecoilIntlProvider = (properties: RecoilIntlProviderProperties): ReactElement => {
  const { push, pathname, query, asPath } = useRouter()
  const [messages, setMessagees] = useState<IntlMessage | undefined>()
  const [intl, setIntl] = useRecoilState(intlLocaleAtom)
  const setCurrentNextRoute = useSetRecoilState(currentNextRoute)
  const [locale, setCookie] = useCookies([LOCALE_COOKIE_KEY])

  useQuery(queries.GET_MY_LOCALE, {
    onCompleted: async (data) => {
      const savedLocale = await data.me.settings.edges[0]?.node?.value
      const messages = await getMessages(savedLocale ?? 'pt-BR')
      setMessagees(messages)
      setIntl(savedLocale)
      if (locale !== savedLocale) setCookie(LOCALE_COOKIE_KEY, savedLocale, { path: '/' })

      await push({ pathname, query }, asPath, { locale: savedLocale })
    },
  })

  useEffect(() => {
    setCurrentNextRoute(pathname)
  }, [setCurrentNextRoute, pathname])

  return <IntlProvider {...properties} locale={intl ?? 'pt-BR'} messages={messages} />
}

export default RecoilIntlProvider
