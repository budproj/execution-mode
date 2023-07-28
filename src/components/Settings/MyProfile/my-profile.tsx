import { Divider, Flex } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { CompanyMenuProperties } from 'src/components/Settings/SidebarMenu/Section/Company/company'
import { UserProfile } from 'src/components/User/Profile/wrapper'

import { myselfAtom } from '../../../state/recoil/shared/atoms'

import SettingsAccountUserCardPreview from './UserCardPreview'

const SettingsMyProfile = (_: { permissions?: CompanyMenuProperties['permissions'] }) => {
  const myself = useRecoilValue(myselfAtom)

  return (
    <Flex direction="row" w="full" gridGap={14}>
      <UserProfile userID={myself?.id} isRemovable={false} />
      <Divider orientation="vertical" borderColor="black.200" />

      <SettingsAccountUserCardPreview userID={myself?.id} />
    </Flex>
  )
}

export default SettingsMyProfile
