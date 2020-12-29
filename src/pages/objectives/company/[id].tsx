import { useRouter } from 'next/router'
import React from 'react'

import TeamObjectives from 'src/components/Page/TeamObjectives'

const CompanyObjectives = () => {
  const router = useRouter()
  const { id } = router.query

  return <TeamObjectives isCompany teamId={id as string} />
}

export default CompanyObjectives
