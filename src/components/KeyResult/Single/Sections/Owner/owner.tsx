import React from 'react'
import { useRecoilValue } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { NamedAvatar } from 'src/components/User'
import { GraphQLEffect } from 'src/components/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

export interface KeyResultSectionOwnerProperties {
  keyResultID?: KeyResult['id']
  isEditting?: boolean
}

const ownerSelector = buildPartialSelector<KeyResult['owner']>('owner')
const policySelector = buildPartialSelector<KeyResult['policy']>('policy')

const KeyResultSectionOwner = ({ keyResultID, isEditting }: KeyResultSectionOwnerProperties) => {
  const owner = useRecoilValue(ownerSelector(keyResultID))
  const policy = useRecoilValue(policySelector(keyResultID))

  const isOwnerLoaded = Boolean(owner)
  const canUpdate = policy?.update === GraphQLEffect.ALLOW

  return (
    <NamedAvatar
      subtitleType="role"
      userID={owner?.id}
      isLoading={!isOwnerLoaded}
      isEditting={isEditting}
      canEdit={canUpdate}
      canHover={canUpdate}
    />
  )
}

export default KeyResultSectionOwner
