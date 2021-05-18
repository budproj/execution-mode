import { useRouter } from 'next/router'
import React from 'react'

import ExploreTeamPage from 'src/components/Page/Team'

const ExploreTeamIndex = () => {
  const router = useRouter()
  const { id } = router.query

  return <ExploreTeamPage teamId={id as string} />
}

export default ExploreTeamIndex
