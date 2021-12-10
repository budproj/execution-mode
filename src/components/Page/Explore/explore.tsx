import { Box, Button, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import PageContent from 'src/components/Base/PageContent'
import { SearchBar } from 'src/components/Base/SearchBar/wrapper'
import TeamCardList from 'src/components/Team/CardList'
import SaveTeamModal from 'src/components/Team/SaveTeamModal'
import { userAtomFamily } from 'src/state/recoil/user'
import meAtom from 'src/state/recoil/user/me'

import { PageMetaHead, PageTitle } from '../../Base'
import { PageHeader } from '../../Base/PageHeader/wrapper'

import messages from './messages'

const ExplorePage = () => {
  const intl = useIntl()
  const [teamFilter, setTeamFilter] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)

  const myID = useRecoilValue(meAtom)
  const user = useRecoilValue(userAtomFamily(myID))
  const teamId = user?.companies?.edges[0]?.node.id

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <PageContent>
      <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />

      <PageHeader>
        <Stack direction="row">
          <PageTitle>{intl.formatMessage(messages.pageTitle)}</PageTitle>
          <Box>
            <Stack direction="row" justifyContent="flex-end" marginTop="0.8em">
              <Box w="15rem">
                <SearchBar
                  placeholder={intl.formatMessage(messages.searchPlaceholder)}
                  onSearch={setTeamFilter}
                />
              </Box>
              <Button
                bg="brand.500"
                color="black.50"
                _hover={{ background: 'brand.400', color: 'black.50' }}
                onClick={openModal}
              >
                {intl.formatMessage(messages.createTeamButton)}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </PageHeader>

      <TeamCardList teamFilter={teamFilter} />
      <SaveTeamModal teamId={teamId} isOpen={isModalOpen} onClose={closeModal} />
    </PageContent>
  )
}

export default ExplorePage
