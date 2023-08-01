import { Box, Button, Flex, Image, Tag, Text, IconButton } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useContext, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { ThumbIcon, WandIcon } from 'src/components/Icon'
import {
  KeyResult,
  KeyResultCheckIn,
  KeyResultChecklist,
  KeyResultCheckMarkState,
  KeyResultComment,
} from 'src/components/KeyResult/types'
import { Format, SummarizeKeyResultInput } from 'src/services/llm/summarize-key-result.dto'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'

import meAtom from '../../../../../state/recoil/user/me'
import selectUser from '../../../../../state/recoil/user/selector'
import { GraphQLEdge } from '../../../../types'
import { KeyResultSectionHeading } from '../Heading/wrapper'

import messages from './messages'

export interface KeyResultSummarizeSectionProperties {
  keyResult: Partial<KeyResult>
  keyResultChecklist?: Partial<KeyResultChecklist>
}

const StyledButton = styled(Button)`
  &:hover {
    svg {
      transition: 0.3s;
      fill: white;
    }
  }
`

const KeyResultSummarizeSection = ({
  keyResult,
  keyResultChecklist,
}: KeyResultSummarizeSectionProperties) => {
  const intl = useIntl()

  const userID = useRecoilValue(meAtom)
  const user = useRecoilValue(selectUser(userID))
  const companyId = user?.companies?.edges[0]?.node?.id

  const [summarizedKeyResult, setSummarizedKeyResult] = useState('')
  const [feedback, setFeedback] = useState(0)
  const [completionId, setCompletionId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const KeyResult = keyResult as KeyResult

  const { servicesPromise } = useContext(ServicesContext)

  const { dispatch: dispatchEventGenerateKeyResultSummarize } = useEvent(
    EventType.GENERATE_KEY_RESULT_SUMMARIZE_CLICK,
  )

  const handleButtonClick = async () => {
    dispatchEventGenerateKeyResultSummarize({})

    const { llm } = await servicesPromise

    const checkIns = (KeyResult.timeline?.edges ?? [])
      .filter((edge): edge is GraphQLEdge<KeyResultCheckIn> => 'comment' in edge.node)
      .map((edges) => {
        return {
          comment: edges.node.comment as string,
          author: edges.node.user.fullName,
          createdAt: edges.node.createdAt,
          value: edges.node.value,
        }
      })

    const comments = (KeyResult.timeline?.edges ?? [])
      .filter((edge): edge is GraphQLEdge<KeyResultComment> => 'text' in edge.node)
      .map((edges) => {
        return {
          text: edges.node.text,
          author: edges.node.user.fullName,
          createdAt: edges.node.createdAt,
        }
      })
    const checklist = (keyResultChecklist?.edges ?? []).map((edges) => {
      return {
        description: edges.node.description,
        owner: edges.node.assignedUser.fullName,
        done: edges.node.state === KeyResultCheckMarkState.CHECKED,
      }
    })

    if (keyResult && companyId) {
      const input: SummarizeKeyResultInput = {
        objective: { title: KeyResult.objective.title },
        title: KeyResult.title,
        format: KeyResult.format as unknown as Format,
        description: KeyResult.description ?? '',
        goal: KeyResult.goal,
        owner: { name: KeyResult.owner.fullName },
        cycle: {
          cadence: KeyResult.objective.cycle.cadence,
          dateEnd: KeyResult.objective.cycle.dateEnd,
          dateStart: KeyResult.objective.cycle.dateStart,
        },
        checkIns,
        comments,
        checklist,
      }

      setIsLoading(true)

      const teamId =
        KeyResult.teamId ?? KeyResult.team?.id ?? KeyResult.objective.teamId ?? companyId

      try {
        const requestDate = Date.now()
        const data = await llm.summarizeKeyResult({
          referenceId: KeyResult.id,
          author: {
            id: userID,
            teamId,
            companyId,
          },
          input,
        })

        if (new Date(data.respondedAt).getTime() <= requestDate) {
          await delay(1800)
        }

        setFeedback(0)
        setSummarizedKeyResult(data.summary)
        setCompletionId(data.id)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleFeedback = async (value: number) => {
    const { llm } = await servicesPromise

    if (feedback === value) {
      const data = await llm.sendFeedback({ completionId, userId: myself.id, value: 0 })
      setFeedback(data.value)
      return
    }

    const data = await llm.sendFeedback({ completionId, userId: myself.id, value })

    setFeedback(data.value)
  }

  return (
    <Box>
      <Flex alignItems="center">
        <KeyResultSectionHeading marginRight="5px">
          {intl.formatMessage(messages.summarizeSectionTitle)}
        </KeyResultSectionHeading>
        <Tag size="sm" variant="solid" colorScheme="brand" ml={1}>
          {intl.formatMessage(messages.newBetaTag)}
        </Tag>
      </Flex>

      {summarizedKeyResult ? (
        <Box marginTop="20px">
          <Text color="new-gray.700">{summarizedKeyResult}</Text>

          <Text fontSize="12px" marginTop="18px" fontStyle="italic" color="pink.500">
            {intl.formatMessage(messages.AIInfo)}
          </Text>
          <Flex width="fit-content" marginLeft="auto" alignItems="center">
            <Text color="new-gray.600">{intl.formatMessage(messages.feedbackTitle)}</Text>
            <IconButton
              aria-label="aa"
              icon={
                <ThumbIcon
                  width="24px"
                  desc={intl.formatMessage(messages.thumbsUpIconButtonDescription)}
                  fill="transparent"
                  opacity={feedback === -1 ? 0.5 : 1}
                />
              }
              onClick={async () => handleFeedback(1)}
            />
            <IconButton
              aria-label="aa"
              icon={
                <ThumbIcon
                  width="24px"
                  transform="rotate(180deg)"
                  desc={intl.formatMessage(messages.thumbsDownIconButtonDescription)}
                  fill="transparent"
                  opacity={feedback === 1 ? 0.5 : 1}
                />
              }
              onClick={async () => handleFeedback(-1)}
            />
          </Flex>
        </Box>
      ) : isLoading ? (
        <Flex flexDirection="column" alignItems="center" marginTop="20px">
          <Image width="85px" src="/icons/wand_big.gif" />
          <Text color="gray.500">{intl.formatMessage(messages.loadingMessage)}</Text>
        </Flex>
      ) : (
        <StyledButton
          border="1px solid #F53D7A"
          borderRadius="5px"
          width="100%"
          marginTop="20px"
          color="pink.500"
          _hover={{ background: 'pink.500', color: 'white' }}
          onClick={handleButtonClick}
        >
          <WandIcon
            fill="pink.500"
            color="inherit"
            width="24px"
            height="24px"
            marginRight="10px"
            desc="ícone de varinha"
          />

          <Text>{intl.formatMessage(messages.summarizeButtonMessage)}</Text>
        </StyledButton>
      )}
    </Box>
  )
}

export default KeyResultSummarizeSection
// eslint-disable-next-line no-promise-executor-return
const delay = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
