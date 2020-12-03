import omit from 'lodash/omit'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect } from 'react'
import { defineMessages, useIntl, MessageDescriptor } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import PageContent from 'src/components/Base/PageContent'
import { KeyResultView, KeyResult } from 'src/components/KeyResult'
import KeyResultDrawer from 'src/components/KeyResult/Single/Drawer'
import { intlRouteAtom } from 'src/state/recoil/intl'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import { pageTitleAtom } from 'src/state/recoil/page'

export const messages = defineMessages({
  pageTitle: {
    defaultMessage: 'Minhas Key Results',
    id: 'tf3MiP',
    description: 'The page title that our users should see',
  },
}) as Record<string, MessageDescriptor>

const KeyResultsIndex = (): ReactElement => {
  const intl = useIntl()
  const router = useRouter()
  const setPageTitle = useSetRecoilState(pageTitleAtom)
  const intlRoute = useRecoilValue(intlRouteAtom(router.pathname))
  const queryID = router.query.id as string
  const keyResult = useRecoilValue(keyResultAtomFamily(queryID))

  const isDrawerOpen = typeof keyResult !== 'undefined'

  const closeKeyResultDrawer = async () =>
    router.push(
      {
        pathname: router.pathname,
        query: omit(router.query, 'id'),
      },
      intlRoute,
      {
        shallow: true,
      },
    )

  const handleLineClick = async (id: KeyResult['id']) =>
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          id,
        },
      },
      `${intlRoute}?id=${id}`,
      {
        shallow: true,
      },
    )

  useEffect((): void => {
    setPageTitle(intl.formatMessage(messages.pageTitle))
  }, [intl, setPageTitle])

  return (
    <PageContent>
      <KeyResultView onLineClick={handleLineClick} />
      <KeyResultDrawer isOpen={isDrawerOpen} keyResultID={queryID} onClose={closeKeyResultDrawer} />
    </PageContent>
  )
}

export default KeyResultsIndex
