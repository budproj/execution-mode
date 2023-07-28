import { useRouter } from 'next/router'
import React from 'react'
import { useRecoilValue } from 'recoil'

import ProfilePage from 'src/components/Page/Profile'
import { myselfAtom } from 'src/state/recoil/shared/atoms'

const MyThingsIndex = () => {
  const myself = useRecoilValue(myselfAtom)
  const router = useRouter()
  const userId = router.query?.['user-id'] ?? myself.id

  return <ProfilePage userId={userId as string} />
}

export default MyThingsIndex
