import { Collapse, Stack, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { IntlLink } from 'src/components/Base'

import { OptionBarWrapper } from '../Checklist/OptionBar/wrapper'
import { KeyResultChecklist } from '../Checklist/checklist'
import { ToggleCollapse } from '../Checklist/toggle-collapse'
import { KeyResultSectionHeading } from '../Heading/wrapper'

import messages from './messages'
import { useLogic } from './use-logic'

interface KeyResultTasksProperties {
  keyResultID?: string
  isLoading?: boolean
}

export const KeyResultTasks = ({ keyResultID, isLoading }: KeyResultTasksProperties) => {
  const intl = useIntl()

  const {
    keyResult,
    progress,
    tasks,
    isChecklistOpen,
    isSuccess,
    refetch,
    handleClose,
    handleChecklistCreation,
    toggleChecklistCollapse,
  } = useLogic({
    keyResultID,
  })

  return (
    <Stack spacing={0}>
      <Stack
        direction="row"
        alignItems="flex-start"
        position="relative"
        justifyContent="space-between"
      >
        <IntlLink
          href={
            keyResult?.teamId && keyResultID
              ? `/explore/${keyResult?.teamId}?activeTab=tasks&key_result_id=${keyResultID}`
              : '#'
          }
          onClick={handleClose}
        >
          <span style={{ display: 'flex', alignItems: 'baseline' }}>
            <KeyResultSectionHeading mt="0.3rem" textDecoration="underline" mr="4px">
              {intl.formatMessage(messages.heading)}
            </KeyResultSectionHeading>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="7"
              viewBox="0 0 6 7"
              fill="none"
            >
              <path
                d="M6 0.881836V6.39914H4.9918V2.61911L0.724748 6.88184L0.665866 6.86992L0 6.19621L4.26518 1.89145H0.490787V0.881836H6Z"
                fill="#525F7F"
              />
            </svg>
          </span>
        </IntlLink>
        <Skeleton isLoaded={!isLoading} display="flex">
          <OptionBarWrapper
            keyResultID={keyResultID}
            progress={progress}
            canCreate={tasks.length === 0}
            onCreate={handleChecklistCreation}
          />
          {tasks.length > 0 && (
            <ToggleCollapse isOpen={isChecklistOpen} onToggle={toggleChecklistCollapse} />
          )}
        </Skeleton>
      </Stack>
      {isSuccess ? (
        <Collapse in={isChecklistOpen}>
          <KeyResultChecklist
            nodes={tasks}
            keyResultID={keyResultID}
            canCreate={tasks.length > 0}
            teamId={keyResult?.teamId}
            onUpdate={refetch}
          />
        </Collapse>
      ) : undefined}
    </Stack>
  )
}
