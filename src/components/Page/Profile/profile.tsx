import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { PageMetaHead } from 'src/components/Base'
import { KeyResultInsertDrawer } from 'src/components/KeyResult/InsertDrawer/wrapper'
import { IndividualOkrPage } from 'src/components/Objective/IndividualPlan'
import { DetailedHeader } from 'src/components/User/DetailedHeader'
import { useGetMyTasks } from 'src/components/User/hooks'
import { keyResultTypeAtom } from 'src/state/recoil/key-result'
import { KeyResultType } from 'src/state/recoil/key-result/key-result-type'

import CompanyOkrPage from './company-okrs'
import messages from './messages'

interface ProfilePageProperties {
  userId: string
}

const ProfilePage = ({ userId }: ProfilePageProperties) => {
  const intl = useIntl()
  const { data: userData, loading: isUserLoading } = useGetMyTasks(userId)
  const keyResultType = useRecoilValue(keyResultTypeAtom)

  return (
    <>
      <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />

      <KeyResultInsertDrawer isPersonalKR />

      <DetailedHeader userData={userData} isUserLoading={isUserLoading} />

      {keyResultType === KeyResultType.COMPANY &&
        (userData ? (
          <CompanyOkrPage intl={intl} userData={userData} isUserLoading={isUserLoading} />
        ) : undefined)}
      {keyResultType === KeyResultType.PERSONAL &&
        (userData ? <IndividualOkrPage intl={intl} userID={userData.id} /> : undefined)}
    </>
  )
}

export default ProfilePage
