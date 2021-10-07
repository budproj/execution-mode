import { Divider, Flex } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { UserProfile } from 'src/components/User/Profile/wrapper'
import meAtom from 'src/state/recoil/user/me'

import SettingsAccountUserCardPreview from './UserCardPreview'

const SettingsAccount = () => {
  const myUserID = useRecoilValue(meAtom)

  return (
    <Flex direction="row" w="full" gridGap={14}>
      <UserProfile userID={myUserID} isRemovable={false} />
      <Divider orientation="vertical" borderColor="black.200" />

      <SettingsAccountUserCardPreview userID={myUserID} />
    </Flex>
  )
}

export default SettingsAccount
