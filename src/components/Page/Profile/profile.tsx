import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { DetailedHeader } from 'src/components/User/DetailedHeader'
import { useGetMyTasks } from 'src/components/User/hooks'
import { keyResultTypeAtom } from 'src/state/recoil/key-result'
import { KeyResultType } from 'src/state/recoil/key-result/key-result-type'

import CompanyOkrPage from './company-okrs'
import IndividualOkrPage from './individual-okrs'

interface ProfilePageProperties {
  userId: string
}

const ProfilePage = ({ userId }: ProfilePageProperties) => {
  const intl = useIntl()
  const { data: userData, loading: isUserLoading } = useGetMyTasks(userId)
  const keyResultType = useRecoilValue(keyResultTypeAtom)

  return (
    <>
      <DetailedHeader userData={userData} isUserLoading={isUserLoading} />

      {keyResultType === KeyResultType.COMPANY &&
        (userData ? (
          <CompanyOkrPage intl={intl} userData={userData} isUserLoading={isUserLoading} />
        ) : undefined)}
      {keyResultType === KeyResultType.PERSONAL &&
        (userData ? <IndividualOkrPage intl={intl} userData={userData} /> : undefined)}
    </>
  )
}

export default ProfilePage
