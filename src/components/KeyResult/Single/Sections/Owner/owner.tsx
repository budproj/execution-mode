import React from 'react'
import { useRecoilValue } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { NamedAvatar } from 'src/components/User'
import { GraphQLEffect } from 'src/components/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

export interface KeyResultSectionOwnerProperties {
  keyResultID?: KeyResult['id']
  isEditing?: boolean
  isIndividualKeyResult?: boolean
}

const ownerSelector = buildPartialSelector<KeyResult['owner']>('owner')
const policySelector = buildPartialSelector<KeyResult['policy']>('policy')
const statusSelector = buildPartialSelector<KeyResult['status']>('status')

const KeyResultSectionOwner = ({
  keyResultID,
  isEditing,
  isIndividualKeyResult,
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
      userID={owner?.id}
      isLoading={!isOwnerLoaded}
      isEditting={isEditing}
      canEdit={allowUpdate}
      canHover={allowUpdate}
    />
  )
}

export default KeyResultSectionOwner
