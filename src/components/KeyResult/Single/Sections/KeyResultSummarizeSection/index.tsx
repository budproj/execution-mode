import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { WandIcon } from 'src/components/Icon'
import { KeyResult, KeyResultCheckMarkState } from 'src/components/KeyResult/types'
import { Format, SummarizeKeyResultInput } from 'src/services/llm/summarize-key-result.dto'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'

import meAtom from '../../../../../state/recoil/user/me'
import selectUser from '../../../../../state/recoil/user/selector'
import { KeyResultSectionHeading } from '../Heading/wrapper'

import messages from './messages'

export interface KeyResultSummarizeSectionProperties {
  keyResult: Partial<KeyResult>
}

const KeyResultSummarizeSection = ({ keyResult }: KeyResultSummarizeSectionProperties) => {
  const intl = useIntl()

  const userID = useRecoilValue(meAtom)
  const user = useRecoilValue(selectUser(userID))
  const companyId = user?.companies?.edges[0]?.node?.id

  const [summarizedKeyResult, setSummarizedKeyResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const KeyResult = keyResult as KeyResult

  const { servicesPromise } = useContext(ServicesContext)

  const { dispatch: dispatchEventGenerateKeyResultSummarize } = useEvent(
    EventType.GENERATE_KEY_RESULT_SUMMARIZE_CLICK,
  )

  const handleButtonClick = async () => {
    dispatchEventGenerateKeyResultSummarize({})

    const { llm } = await servicesPromise

    const checkIns = KeyResult.keyResultCheckIns?.edges?.map((edges) => {
      return {
        comment: edges.node.comment as string,
        author: edges.node.user.fullName,
        createdAt: edges.node.createdAt,
        value: edges.node.value,
      }
    })

    const comments = KeyResult.keyResultCheckIns?.edges?.map((edges) => {
      return {
        text: edges.node.comment as string,
        author: edges.node.user.fullName,
        createdAt: edges.node.createdAt,
      }
    })
    const checklist = KeyResult.checkList?.edges?.map((edges) => {
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
        KeyResult.teamId ?? KeyResult.team.id ?? KeyResult.objective.teamId ?? companyId

      try {
        const data = await llm.summarizeKeyResult({
          referenceId: KeyResult.id,
          author: {
            id: userID,
            teamId,
            companyId,
          },
          input,
        })
        setSummarizedKeyResult(data.summary)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Box>
      <KeyResultSectionHeading>
        {intl.formatMessage(messages.summarizeSectionTitle)}
      </KeyResultSectionHeading>

      {summarizedKeyResult ? (
        <Box marginTop="20px">
          <Text color="new-gray.700">{summarizedKeyResult}</Text>

          <Text fontSize="12px" marginTop="18px" fontStyle="italic" color="pink.500">
            {intl.formatMessage(messages.AIInfo)}
          </Text>
        </Box>
      ) : isLoading ? (
        <Flex flexDirection="column" alignItems="center" marginTop="20px">
          <Image width="85px" src="/icons/wand_big.gif" />
          <Text color="gray.500">{intl.formatMessage(messages.loadingMessage)}</Text>
        </Flex>
      ) : (
        <Button
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
        </Button>
      )}
    </Box>
  )
}

export default KeyResultSummarizeSection
