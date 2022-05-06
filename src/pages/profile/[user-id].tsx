import { useRouter } from 'next/router'
import React from 'react'

import ProfilePage from 'src/components/Page/Profile'

const MyThingsIndex = () => {
  const router = useRouter()
  const userId = router.query?.['user-id']

  return <ProfilePage userId={userId as string} />
}

export default MyThingsIndex
