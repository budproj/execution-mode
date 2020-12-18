import { useRouter } from 'next/router'
import React from 'react'

const TeamObjectives = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Team: {id}</p>
}

export default TeamObjectives
