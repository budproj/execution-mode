import { useRouter } from 'next/router'
import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { IntlProvider } from 'react-intl'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { currentNextRoute, intlLocaleAtom } from 'src/state/recoil/intl'

import { myselfAtom } from '../../../state/recoil/shared/atoms'
import { LOCALE_COOKIE_KEY } from '../LocaleSwitcher/constants'

type IntlMessage = Record<string, string>

export interface RecoilIntlProviderProperties {
  children?: ReactElement
}

const getMessages = async (locale: string): Promise<IntlMessage | undefined> =>
  require(`../../../../compiled-lang/${locale}.json`)

const RecoilIntlProvider = (properties: RecoilIntlProviderProperties): ReactElement => {
  const router = useRouter()
  const [myself] = useRecoilState(myselfAtom)
  const [messages, setMessages] = useState<IntlMessage | undefined>()
  const [intl, setIntl] = useRecoilState<string>(intlLocaleAtom)
  const setCurrentNextRoute = useSetRecoilState(currentNextRoute)
  const [, setCookie] = useCookies([LOCALE_COOKIE_KEY])

  useEffect(() => {
    setCookie(LOCALE_COOKIE_KEY, intl, { path: '/' })
    router.push(router, router.asPath, { locale: intl })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intl])

  useEffect(() => {
    const savedLocale = myself?.settings?.edges?.[0]?.node?.value
    if (savedLocale) {
      setIntl(savedLocale)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myself?.id])

  const handleConfigMessages = useCallback(async () => {
    const messages = await getMessages(intl)
    setMessages(messages)
  }, [intl])

  useEffect(() => {
    handleConfigMessages()
  }, [handleConfigMessages])

  useEffect(() => {
    setCurrentNextRoute(router.pathname)
  }, [setCurrentNextRoute, router.pathname])

  return <IntlProvider {...properties} locale={intl} messages={messages} />
}

export default RecoilIntlProvider
