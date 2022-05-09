import { useRecoilValue } from 'recoil'

import { Team } from 'src/components/Team/types'
import getConfig from 'src/config'
import meAtom from 'src/state/recoil/user/me'
import selectUser from 'src/state/recoil/user/selector'

interface useGetGamificationDetailsReturns {
  isGameficationDisabled: boolean
}

export const useGetGamificationDetails = (companies?: Team[]): useGetGamificationDetailsReturns => {
  const userID = useRecoilValue(meAtom)
  const currentUserData = useRecoilValue(selectUser(userID))
  const { publicRuntimeConfig } = getConfig()
  const { noGamificationCompaniesIds } = publicRuntimeConfig

  const companiesToConsider =
    companies ?? currentUserData?.companies?.edges?.map(({ node }) => node) ?? []

  const isGameficationDisabled = companiesToConsider.some((company) =>
    noGamificationCompaniesIds.includes(company.id),
  )

  return { isGameficationDisabled }
}
