import { Box, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import PageContent from 'src/components/Base/PageContent'
import TeamCardList from 'src/components/Team/CardList'
import SaveTeamModal from 'src/components/Team/SaveTeamModal'
import { isEditTeamModalOpenAtom } from 'src/state/recoil/team'
import { userAtomFamily } from 'src/state/recoil/user'
import meAtom from 'src/state/recoil/user/me'

import { PageMetaHead, PageTitle } from '../../Base'
import { PageHeader } from '../../Base/PageHeader/wrapper'

import messages from './messages'
import UpperMenu from './upper-menu'

const ExplorePage = () => {
  const intl = useIntl()
  const [teamFilter, setTeamFilter] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)

  const myID = useRecoilValue(meAtom)
  const user = useRecoilValue(userAtomFamily(myID))
  const teamId = user?.companies?.edges[0]?.node.id
  const [isEditTeamModalOpen, setIsEditTeamModalOpen] = useRecoilState(isEditTeamModalOpenAtom)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => {
    setIsModalOpen(false)
    // eslint-disable-next-line unicorn/no-useless-undefined
    setIsEditTeamModalOpen(undefined)
  }

  return (
    <PageContent bg="new-gray.50">
      <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />

      <PageHeader>
        <Stack direction="row">
          <PageTitle>{intl.formatMessage(messages.pageTitle)}</PageTitle>
          <Box>
            <UpperMenu openModal={openModal} setTeamFilter={setTeamFilter} teamId={teamId} />
          </Box>
        </Stack>
      </PageHeader>

      <TeamCardList teamFilter={teamFilter} openModal={openModal} />
      <SaveTeamModal
        teamId={isEditTeamModalOpen ?? teamId}
        isEditing={Boolean(isEditTeamModalOpen)}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </PageContent>
  )
}

export default ExplorePage
