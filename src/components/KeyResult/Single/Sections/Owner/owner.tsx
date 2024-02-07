import React from 'react'
import { useRecoilValue } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { NamedAvatar } from 'src/components/User'
import { GraphQLEffect } from 'src/components/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

export interface KeyResultSectionOwnerProperties {
  readonly keyResultID?: KeyResult['id']
  readonly isEditing?: boolean
  readonly isIndividualKeyResult?: boolean
  readonly ownerId?: string
}

const ownerSelector = buildPartialSelector<KeyResult['owner']>('owner')
const policySelector = buildPartialSelector<KeyResult['policy']>('policy')
const statusSelector = buildPartialSelector<KeyResult['status']>('status')

const KeyResultSectionOwner = ({
  keyResultID,
  isEditing,
  isIndividualKeyResult,
  ownerId,
}: KeyResultSectionOwnerProperties) => {
  const owner = useRecoilValue(ownerSelector(keyResultID))
  const policy = useRecoilValue(policySelector(keyResultID))
  const status = useRecoilValue(statusSelector(keyResultID))

  const isOwnerLoaded = Boolean(owner)
  const allowUpdate =
    policy?.update === GraphQLEffect.ALLOW && status?.isActive && !isIndividualKeyResult

  return (
    <NamedAvatar
      subtitleType="role"
      userID={ownerId ? ownerId : owner?.id}
      isLoading={ownerId ? false : !isOwnerLoaded}
      isEditting={isEditing}
      canEdit={ownerId ? true : allowUpdate}
      canHover={allowUpdate}
    />
  )
}

export default KeyResultSectionOwner
