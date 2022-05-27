import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { KeyResultInsertDrawer } from 'src/components/KeyResult/InsertDrawer/wrapper'
import { KeyResult } from 'src/components/KeyResult/types'
import { DetailedHeader } from 'src/components/User/DetailedHeader'
import { keyResultTypeAtom } from 'src/state/recoil/key-result'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'
import { KeyResultType } from 'src/state/recoil/key-result/key-result-type'
import meAtom from 'src/state/recoil/user/me'
import selectUser from 'src/state/recoil/user/selector'

import CompanyOkrPage from './company-okrs'
import IndividualOkrPage from './individual-okrs'

const ActiveCyclesPage = () => {
  const keyResultType = useRecoilValue(keyResultTypeAtom)

  const userID = useRecoilValue(meAtom)
  const user = useRecoilValue(selectUser(userID))

  const intl = useIntl()
  const setOpenDrawer = useSetRecoilState(keyResultReadDrawerOpenedKeyResultID)

  const handleLineClick = (id: KeyResult['id']) => setOpenDrawer(id)

  return (
    <>
      <KeyResultInsertDrawer isPersonalKR />

      <DetailedHeader userData={user} />

      {keyResultType === KeyResultType.COMPANY && (
        <CompanyOkrPage handleLineClick={handleLineClick} intl={intl} userID={userID} />
      )}
      {keyResultType === KeyResultType.PERSONAL && (
        <IndividualOkrPage intl={intl} userID={userID} />
      )}
    </>
  )
}

export default ActiveCyclesPage
