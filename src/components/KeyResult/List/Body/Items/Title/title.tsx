import { Flex, Box, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import DynamicIcon from 'components/KeyResult/DynamicIcon'
import BaseGridItem from 'components/KeyResult/List/Body/Items/Base'
import { BORDER_COLOR } from 'components/KeyResult/List/constants'
import { KeyResult } from 'components/KeyResult/types'
import { keyResultTeam } from 'state/recoil/key-results/single/team'
import { keyResultTitle } from 'state/recoil/key-results/single/title'

export interface TitleProperties {
  id: KeyResult['id']
}

const Title = ({ id }: TitleProperties): ReactElement => {
  const title = useRecoilValue<KeyResult['title'] | undefined>(keyResultTitle(id))
  const team = useRecoilValue<KeyResult['team'] | undefined>(keyResultTeam(id))

  return title && team ? (
    <BaseGridItem px={0} borderRight={1} borderColor={BORDER_COLOR} borderStyle="solid">
      <Flex gridGap={4} alignItems="center">
        <DynamicIcon title={title} />

        <Box>
          <Text>{title}</Text>
          <Text color="gray.200" fontSize="14px">
            {team.name}
          </Text>
        </Box>
      </Flex>
    </BaseGridItem>
  ) : (
    <>Loading</>
  )
}

export default Title
