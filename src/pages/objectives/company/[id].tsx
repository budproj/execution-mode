import { useRouter } from 'next/router'
import React from 'react'

const CompanyObjectives = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Company: {id}</p>
}

export default CompanyObjectives
