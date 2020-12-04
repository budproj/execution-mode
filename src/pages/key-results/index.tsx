import React, { ReactElement, useEffect } from 'react'
import { defineMessages, useIntl, MessageDescriptor } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import PageContent from 'src/components/Base/PageContent'
import { KeyResultView } from 'src/components/KeyResult'
import { KeyResultSingleDrawer } from 'src/components/KeyResult/Single'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultOpenDrawer } from 'src/state/recoil/key-result/drawer'
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
  const setPageTitle = useSetRecoilState(pageTitleAtom)
  const setOpenDrawer = useSetRecoilState(keyResultOpenDrawer)

  const handleLineClick = (id: KeyResult['id']) => setOpenDrawer(id)

  useEffect((): void => {
    setPageTitle(intl.formatMessage(messages.pageTitle))
  }, [intl, setPageTitle])

  return (
    <PageContent>
      <KeyResultView onLineClick={handleLineClick} />
      <KeyResultSingleDrawer />
    </PageContent>
  )
}

export default KeyResultsIndex
