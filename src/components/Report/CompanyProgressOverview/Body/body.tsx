import { Flex, Skeleton } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import SliderWithDetails from 'src/components/Base/SliderWithDetails'
import OverviewBodyBox from 'src/components/Report/Overview/OverviewBodyBox'
import { Team } from 'src/components/Team/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'
import { teamAtomFamily } from 'src/state/recoil/team'

import CompanyProgressOverviewBodyStampCompany from './Stamps/Company'
import CompanyProgressOverviewBodyStampProgressIncrease from './Stamps/ProgressIncrease'

export interface CompanyProgressOverviewBodyProperties {
  companyID?: Team['id']
  isLoading?: boolean
}

const CompanyProgressOverviewBody = ({
  companyID,
  isLoading,
}: CompanyProgressOverviewBodyProperties) => {
  const company = useRecoilValue(teamAtomFamily(companyID))
  const [confidenceTag, setConfidence] = useConfidenceTag(company?.confidence)

  useEffect(() => {
    if (typeof company?.confidence !== 'undefined') setConfidence(company?.confidence)
  }, [company, setConfidence])

  return (
    <OverviewBodyBox>
      <Flex pb={8} direction="column" gridGap={10}>
        <Flex gridGap={20}>
          <CompanyProgressOverviewBodyStampCompany companyID={companyID} isLoading={isLoading} />
          <CompanyProgressOverviewBodyStampProgressIncrease
            companyID={companyID}
            isLoading={isLoading}
          />
        </Flex>

        <Skeleton isLoaded={!isLoading}>
          <SliderWithDetails
            value={company?.progress}
            trackThickness={4}
            thumbHeight={7}
            trackColor={confidenceTag.color.primary}
          />
        </Skeleton>
      </Flex>
    </OverviewBodyBox>
  )
}

export default CompanyProgressOverviewBody
