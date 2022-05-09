import { useRouter } from 'next/router'
import React from 'react'

import ProfilePage from 'src/components/Page/Profile'

const MyThingsIndex = () => {
  const router = useRouter()
  const { id } = router.query

  return <ProfilePage userId={id as string} />
}

export default MyThingsIndex
