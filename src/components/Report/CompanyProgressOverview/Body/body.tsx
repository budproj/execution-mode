import { Flex, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import SliderWithGoal from 'src/components/Base/SliderWithGoal'
import OverviewBodyBox from 'src/components/Report/Overview/OverviewBodyBox'
import { Team } from 'src/components/Team/types'
import confidenceTagSelector from 'src/state/recoil/key-result/selectors/confidence-tag'
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
  const { color } = useRecoilValue(confidenceTagSelector(company?.currentConfidence))

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
          <SliderWithGoal
            value={company?.currentProgress}
            trackThickness="16px"
            thumbHeight="29px"
            trackColor={color}
          />
        </Skeleton>
      </Flex>
    </OverviewBodyBox>
  )
}

export default CompanyProgressOverviewBody
