import styled from '@emotion/styled'
import React, { ReactElement, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { DynamicAvatarGroup } from 'src/components/Base'
import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'
import meAtom from 'src/state/recoil/user/me'
import selectUser from 'src/state/recoil/user/selector'

export interface KeyResultListBodyColumnOwnerProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
}

interface StyledAvatarGroupWrapperProperties {
  currentUserIsOwner?: boolean
  theme?: any
}

const StyledAvatarGroupWrapper = styled.div<StyledAvatarGroupWrapperProperties>`
  & .chakra-avatar__excess {
    background-color: ${({ theme }) => theme?.colors?.brand?.[500]};
    color: #fff;
    ${({ currentUserIsOwner }) => !currentUserIsOwner && `display: none;`}
  }
`

const ownerSelector = buildPartialSelector<KeyResult['owner']>('owner')
const supportTeamMembersSelector =
  buildPartialSelector<KeyResult['supportTeamMembers']>('supportTeamMembers')

const KeyResultListBodyColumnOwner = ({
  id,
  justifyContent,
}: KeyResultListBodyColumnOwnerProperties): ReactElement => {
  const owner = useRecoilValue(ownerSelector(id))
  const supportTeamMembersAtoms = useRecoilValue(supportTeamMembersSelector(id))
  const userID = useRecoilValue(meAtom)

  const setUser = useSetRecoilState(selectUser(owner?.id))

  const isOwnerLoaded = Boolean(owner)
  const supportTeamMembers = supportTeamMembersAtoms?.edges?.map(({ node }) => node) ?? []
  const currentUserIsOwner = owner?.id === userID
  const usersToLoad = currentUserIsOwner
    ? [...supportTeamMembers]
    : [...supportTeamMembers.filter(({ id }) => id === userID)]

  if (owner) {
    usersToLoad.unshift(owner)
  }

  useEffect(() => {
    if (owner) setUser(owner)
  }, [owner, setUser])

  return (
    <KeyResultListBodyColumnBase
      preventLineClick
      pr={0}
      display="flex"
      cursor="auto"
      justifyContent={justifyContent}
    >
      <StyledAvatarGroupWrapper currentUserIsOwner={currentUserIsOwner}>
        <DynamicAvatarGroup
          isLoaded={isOwnerLoaded}
          size="md"
          users={usersToLoad}
          max={currentUserIsOwner ? 1 : 2}
        />
      </StyledAvatarGroupWrapper>
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnOwner
