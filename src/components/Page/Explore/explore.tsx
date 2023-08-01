import { Box, Stack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import PageContent from 'src/components/Base/PageContent'
import TeamCardList from 'src/components/Team/CardList'
import SaveTeamModal from 'src/components/Team/SaveTeamModal'

import { myselfAtom } from '../../../state/recoil/shared/atoms'
import { PageMetaHead, PageTitle } from '../../Base'
import { PageHeader } from '../../Base/PageHeader/wrapper'

import messages from './messages'
import UpperMenu from './upper-menu'

const ExplorePage = () => {
  const intl = useIntl()
  const reference = useRef<HTMLDivElement>(null)
  const [teamFilter, setTeamFilter] = useState('')
  const [parentWidth, setParentWidht] = useState<number>(1080)

  useEffect(() => {
    if (reference.current) {
      const observer = new ResizeObserver((entries) => {
        const { width } = entries[0].contentRect
        setParentWidht(width)
      })

      observer.observe(reference.current)

      return () => observer.disconnect()
    }
  }, [])

  const myself = useRecoilValue(myselfAtom)
  const teamId = myself?.companies?.edges[0]?.node.id

  return (
    <PageContent bg="new-gray.50">
      <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />

      <div ref={reference}>
        <PageHeader>
          <Stack direction="row">
            <PageTitle>{intl.formatMessage(messages.pageTitle)}</PageTitle>
            <Box>
              <UpperMenu setTeamFilter={setTeamFilter} teamId={teamId} />
            </Box>
          </Stack>
        </PageHeader>
      </div>

      <SaveTeamModal teamId={teamId} />
      <TeamCardList parentWidth={parentWidth} teamFilter={teamFilter} />
    </PageContent>
  )
}

export default ExplorePage
