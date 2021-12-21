import { useLazyQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

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
  const [currentLocale, setCurrentLocale] = useState()
  const { push, pathname, query, asPath, locales } = useRouter()
  const [_, setCookie] = useCookies([LOCALE_COOKIE_KEY])
  const intl = useIntl()
  const myID = useRecoilValue(meAtom)

  const [getCurrentLocale, { called, loading: isQueryLoading }] = useLazyQuery(
    queries.GET_USER_LOCALE,
    {
      variables: {
        userID,
      },
      onCompleted: (data) => {
        setCurrentLocale(data.user.settings.edges[0]?.node.value)
      },
    },
  )
  const [updateLocale, { loading: isMutationLoading }] = useMutation(queries.UPDATE_USER_LOCALE, {
    onCompleted: (data) => {
      setCurrentLocale(data.updateUserSetting.value)
    },
  })

  availableLocaleCodes ??= locales
  const isLoading = !called || isQueryLoading || isMutationLoading

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
  const currentLocaleData = localeHashmap[currentLocale ?? 'pt-BR']

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

  useEffect(() => {
    if (userID) getCurrentLocale()
  }, [userID, getCurrentLocale])

  return (
    <Switcher
      locales={localesData}
      currentLocale={currentLocaleData}
      isLoading={isLoading}
      onSwitch={handleSwitch}
    />
  )
}
