import React, { useEffect } from 'react'

import { Company } from 'src/components/Company/types'
import { companyAtomFamily } from 'src/state/recoil/company'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'

import TeamCard from './Card'

export interface CompanyCardsProperties {
  companies?: Array<Partial<Company>>
  isLoading?: boolean
}

const CompanyCards = ({ companies, isLoading }: CompanyCardsProperties) => {
  const loadCompaniesOnRecoil = useRecoilFamilyLoader<Company>(companyAtomFamily)

  useEffect(() => {
    if (companies) loadCompaniesOnRecoil(companies)
  }, [companies, loadCompaniesOnRecoil])

  return isLoading || !companies ? (
    <TeamCard isCompany />
  ) : (
    <>
      {companies.map(({ id }) => (
        <TeamCard key={id} isCompany id={id} />
      ))}
    </>
  )
}

export default CompanyCards
