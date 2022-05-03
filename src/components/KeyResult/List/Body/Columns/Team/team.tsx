import { Tag, TagLabel } from '@chakra-ui/react'
import Link from 'next/link'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

export interface KeyResultListBodyColumnTeamProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
}

const teamSelector = buildPartialSelector<KeyResult['team']>('team')

const KeyResultListBodyColumnTeam = ({
  id,
}: KeyResultListBodyColumnTeamProperties): ReactElement => {
  const team = useRecoilValue(teamSelector(id))
  const linkTo = team?.id ? `/explore/${team?.id}` : ''

  return (
    <KeyResultListBodyColumnBase preventLineClick>
      <Link passHref href={linkTo}>
        <Tag bg="new-gray.200" borderRadius="3px" px="7px" py="5px">
          <TagLabel color="new-gray.800" fontWeight={500} fontSize="10px" textTransform="uppercase">
            {team?.name}
          </TagLabel>
        </Tag>
      </Link>
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnTeam
