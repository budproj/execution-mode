import { useRouter } from 'next/router'
import React from 'react'

import TeamObjectives from 'src/components/Page/TeamObjectives'

const TeamObjectivesPage = () => {
  const router = useRouter()
  const { id } = router.query

  return <TeamObjectives teamId={id as string} />
}

export default TeamObjectivesPage
