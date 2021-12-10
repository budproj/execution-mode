import { Button } from '@chakra-ui/button'
import { Box, Stack } from '@chakra-ui/layout'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { SearchBar } from 'src/components/Base/SearchBar/wrapper'
import { GraphQLEffect } from 'src/components/types'
import { teamAtomFamily } from 'src/state/recoil/team'

import messages from './messages'

interface UpperMenuProperties {
  openModal: () => void
  setTeamFilter: (text: string) => void
  teamId?: string
}

const UpperMenu = ({ openModal, setTeamFilter, teamId }: UpperMenuProperties) => {
  const intl = useIntl()

  const team = useRecoilValue(teamAtomFamily(teamId))
  const hasCreateTeamPermission = team?.users?.policy?.create === GraphQLEffect.ALLOW

  return (
    <Stack direction="row" justifyContent="flex-end" marginTop="0.8em">
      <Box w="15rem">
        <SearchBar
          placeholder={intl.formatMessage(messages.searchPlaceholder)}
          onSearch={setTeamFilter}
        />
      </Box>
      {hasCreateTeamPermission && (
        <Button
          bg="brand.500"
          color="black.50"
          _hover={{ background: 'brand.400', color: 'black.50' }}
          onClick={openModal}
        >
          {intl.formatMessage(messages.createTeamButton)}
        </Button>
      )}
    </Stack>
  )
}

export default UpperMenu
