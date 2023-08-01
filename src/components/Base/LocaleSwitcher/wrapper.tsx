import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { useCookies } from 'react-cookie'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import { intlLocaleAtom } from 'src/state/recoil/intl'

import meAtom from '../../../state/recoil/user/me'

import { LOCALE_COOKIE_KEY } from './constants'
import messages from './messages'
import queries from './queries.gql'
import { Locale, Switcher } from './switcher'

type LocaleSwitcherWrapperProperties = {
  availableLocaleCodes?: string[]
  userID?: string
}

export const LocaleSwitcherWrapper = ({
  availableLocaleCodes,
  userID,
}: LocaleSwitcherWrapperProperties) => {
  const { push, pathname, query, asPath, locales } = useRouter()
  const [_, setCookie] = useCookies([LOCALE_COOKIE_KEY])
  const intl = useIntl()
  const myID = useRecoilValue(meAtom)
  const [intlLocale, setIntlLocale] = useRecoilState(intlLocaleAtom)

  const [updateLocale, { loading: isMutationLoading }] = useMutation(queries.UPDATE_USER_LOCALE, {
    onCompleted: (data) => {
      setIntlLocale(data.updateUserSetting.value)
    },
  })

  availableLocaleCodes ??= locales
  const isLoading = isMutationLoading

  const localeHashmap = useMemo<Record<string, Locale>>(
    () => ({
      'pt-BR': {
        code: 'pt-BR',
        label: intl.formatMessage(messages.ptBRLabel),
      },

      'en-US': {
        code: 'en-US',
        label: intl.formatMessage(messages.enUSLabel),
      },
    }),
    [intl],
  )

  const localesData = availableLocaleCodes?.map((code) => localeHashmap[code])
  const currentLocaleData = useMemo(() => localeHashmap[intlLocale], [intlLocale, localeHashmap])

  const handleSwitch = async (locale: string) => {
    await updateLocale({
      variables: {
        locale,
        userID: userID ?? myID,
      },
    })

    if (!userID || userID === myID) {
      setCookie(LOCALE_COOKIE_KEY, locale, { path: '/' })
      await push({ pathname, query }, asPath, { locale })
    }
  }

  return (
    <Switcher
      locales={localesData}
      currentLocale={currentLocaleData}
      isLoading={isLoading}
      onSwitch={handleSwitch}
    />
  )
}
