import { useRouter } from 'next/router'
import React from 'react'
import { useCookies } from 'react-cookie'
import { useIntl } from 'react-intl'

import { LOCALE_COOKIE_KEY } from './constants'
import messages from './messages'
import { Locale, Switcher } from './switcher'

type LocaleSwitcherWrapperProperties = {
  availableLocaleCodes?: string[]
}

export const LocaleSwitcherWrapper = ({
  availableLocaleCodes,
}: LocaleSwitcherWrapperProperties) => {
  const { locale, push, pathname, query, asPath, locales } = useRouter()
  const [_, setCookie] = useCookies([LOCALE_COOKIE_KEY])
  const intl = useIntl()

  availableLocaleCodes ??= locales

  const localeHashmap: Record<string, Locale> = {
    'pt-BR': {
      code: 'pt-BR',
      label: intl.formatMessage(messages.ptBRLabel),
    },

    'en-US': {
      code: 'en-US',
      label: intl.formatMessage(messages.enUSLabel),
    },
  }

  const localesData = availableLocaleCodes?.map((code) => localeHashmap[code])
  const currentLocaleData = localeHashmap[locale as string]

  const handleSwitch = async (locale: string) => {
    setCookie(LOCALE_COOKIE_KEY, locale, { path: '/' })
    await push({ pathname, query }, asPath, { locale })
  }

  return (
    <Switcher locales={localesData} currentLocale={currentLocaleData} onSwitch={handleSwitch} />
  )
}
