import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { PageMetaHead } from 'src/components/Base'
import { KeyResultInsertDrawer } from 'src/components/KeyResult/InsertDrawer/wrapper'
import { IndividualOkrPage } from 'src/components/Objective/IndividualPlan'
import { DetailedHeader } from 'src/components/User/DetailedHeader'
import { useGetUserDetails } from 'src/components/User/hooks'
import { useGetUserAuthzRole } from 'src/components/User/hooks/getUserAuthzRole/get-user-authz-role'
import { AUTHZ_ROLES } from 'src/state/recoil/authz/constants'
import { keyResultTypeAtom } from 'src/state/recoil/key-result'
import { KeyResultType } from 'src/state/recoil/key-result/key-result-type'
import meAtom from 'src/state/recoil/user/me'

import CompanyOkrPage from './company-okrs'
import messages from './messages'

interface ProfilePageProperties {
  userId: string
}

const ProfilePage = ({ userId }: ProfilePageProperties) => {
  const intl = useIntl()
  const { data: userData, loading: isUserLoading } = useGetUserDetails(userId)
  const keyResultType = useRecoilValue(keyResultTypeAtom)

  const myID = useRecoilValue(meAtom)
  const { data: userAuthzRole, loading: loadingAuthzRole } = useGetUserAuthzRole(myID)

  const isPersonalOKRsVisible =
    [AUTHZ_ROLES.ADMIN, AUTHZ_ROLES.LEADER].includes(userAuthzRole?.name as AUTHZ_ROLES) &&
    !loadingAuthzRole &&
    keyResultType === KeyResultType.PERSONAL

  return (
    <>
      <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />

      <KeyResultInsertDrawer isPersonalKR />

      <DetailedHeader userData={userData} isUserLoading={isUserLoading} />

      {keyResultType === KeyResultType.COMPANY &&
        (userData ? (
          <CompanyOkrPage intl={intl} userData={userData} isUserLoading={isUserLoading} />
        ) : undefined)}
      {isPersonalOKRsVisible &&
        (userData ? <IndividualOkrPage intl={intl} userID={userData.id} /> : undefined)}
    </>
  )
}

export default ProfilePage
