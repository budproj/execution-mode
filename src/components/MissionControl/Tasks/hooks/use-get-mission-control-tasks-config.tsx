import { useToken } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { useIntl } from 'react-intl'

import { ChatIcon, PuzzleIcon, TextListIcon } from 'src/components/Icon'
import { AUTHZ_ROLES } from 'src/state/recoil/authz/constants'

import messages from '../messages'

export enum TASK_TEMPLATE {
  KR_CHECK_IN = 'key-result-check-in',
  OUTDATED_KEY_RESULT_COMMENT = 'outdated-key-result-comment',
  EMPTY_DESCRIPTION = 'empty-description',
  KR_COMMENT = 'comment-kr',
  LOW_CONFIDENCE_KR_COMMENT = 'comment-low-confidence-kr',
  BARRIER_KR_COMMENT = 'comment-barrier-kr',
}

export function getEnumKeyByValue<T>(enumObject: T, value: string) {
  for (const key in enumObject) {
    if (enumObject[key] === value) {
      return key
    }
  }
}

interface UseGetMissionControlTasksConfigOutput {
  content: {
    title: string
    description: string
  }
  icon: ReactNode
  actions: {
    role: AUTHZ_ROLES
    label: string
  }
}

export const useGetMissionControlTasksConfig = (
  template: TASK_TEMPLATE,
): UseGetMissionControlTasksConfigOutput => {
  const [yellow] = useToken('colors', ['yellow.600'])
  const intl = useIntl()
  const taskCardIcon = new Map([
    [
      TASK_TEMPLATE.KR_CHECK_IN,
      <PuzzleIcon
        key={TASK_TEMPLATE.KR_CHECK_IN}
        desc="ícone de um quebra cabeça apresentado em um card de task de boas práticas"
        maxW="48px"
        maxH="48px"
      />,
    ],
    [
      TASK_TEMPLATE.EMPTY_DESCRIPTION,
      <TextListIcon
        key={TASK_TEMPLATE.EMPTY_DESCRIPTION}
        desc="ícone de um quebra cabeça apresentado em um card de task de boas práticas"
        maxW="48px"
        maxH="48px"
      />,
    ],
    [
      TASK_TEMPLATE.KR_COMMENT,
      <ChatIcon
        key={TASK_TEMPLATE.KR_COMMENT}
        desc="ícone de um quebra cabeça apresentado em um card de task de boas práticas"
        maxW="48px"
        maxH="48px"
      />,
    ],
    [
      TASK_TEMPLATE.OUTDATED_KEY_RESULT_COMMENT,
      <ChatIcon
        key={TASK_TEMPLATE.OUTDATED_KEY_RESULT_COMMENT}
        desc="ícone de um quebra cabeça apresentado em um card de task de boas práticas"
        maxW="48px"
        maxH="48px"
      />,
    ],
    [
      TASK_TEMPLATE.LOW_CONFIDENCE_KR_COMMENT,
      <ChatIcon
        key={TASK_TEMPLATE.LOW_CONFIDENCE_KR_COMMENT}
        desc="ícone de um quebra cabeça apresentado em um card de task de boas práticas"
        maxW="48px"
        maxH="48px"
      />,
    ],
    [
      TASK_TEMPLATE.BARRIER_KR_COMMENT,
      <ChatIcon
        key={TASK_TEMPLATE.BARRIER_KR_COMMENT}
        desc="ícone de um quebra cabeça apresentado em um card de task de boas práticas"
        maxW="48px"
        maxH="48px"
      />,
    ],
  ])
  const taskUserRole = new Map([
    [TASK_TEMPLATE.KR_CHECK_IN, AUTHZ_ROLES.TEAM_MEMBER],
    [TASK_TEMPLATE.EMPTY_DESCRIPTION, AUTHZ_ROLES.TEAM_MEMBER],
    [TASK_TEMPLATE.KR_COMMENT, AUTHZ_ROLES.LEADER],
    [TASK_TEMPLATE.LOW_CONFIDENCE_KR_COMMENT, AUTHZ_ROLES.LEADER],
    [TASK_TEMPLATE.BARRIER_KR_COMMENT, AUTHZ_ROLES.LEADER],
    [TASK_TEMPLATE.OUTDATED_KEY_RESULT_COMMENT, AUTHZ_ROLES.LEADER],
  ])
  const taskTitleMessages = new Map([
    [TASK_TEMPLATE.KR_CHECK_IN, messages.keyResultCheckinTaskMessageTitle],
    [TASK_TEMPLATE.EMPTY_DESCRIPTION, messages.keyResultEmptyDescriptionTaskMessageTitle],
    [TASK_TEMPLATE.KR_COMMENT, messages.keyResultCommentTaskMessageTitle],
    [
      TASK_TEMPLATE.LOW_CONFIDENCE_KR_COMMENT,
      messages.lowConfidenceKeyResultCommentTaskMessageTitle,
    ],
    [TASK_TEMPLATE.BARRIER_KR_COMMENT, messages.barrierKeyResultCommentTaskMessageTitle],
    [TASK_TEMPLATE.OUTDATED_KEY_RESULT_COMMENT, messages.outdatedKeyResultCommentTaskMessageTitle],
  ])
  const taskDescriptionMessages = new Map([
    [TASK_TEMPLATE.KR_CHECK_IN, messages.keyResultCheckinTaskMessageDescription],
    [TASK_TEMPLATE.EMPTY_DESCRIPTION, messages.keyResultEmptyDescriptionTaskMessageDescription],
    [TASK_TEMPLATE.KR_COMMENT, messages.keyResultCommentTaskMessageDescription],
    [
      TASK_TEMPLATE.LOW_CONFIDENCE_KR_COMMENT,
      messages.lowConfidenceKeyResultCommentTaskMessageDescription,
    ],
    [TASK_TEMPLATE.BARRIER_KR_COMMENT, messages.barrierKeyResultCommentTaskMessageDescription],
    [
      TASK_TEMPLATE.OUTDATED_KEY_RESULT_COMMENT,
      messages.outdatedKeyResultCommentTaskMessageDescription,
    ],
  ])
  const taskCardActionLabel = new Map([
    [TASK_TEMPLATE.KR_CHECK_IN, messages.goToKeyResultActionLabelMessage],
    [TASK_TEMPLATE.EMPTY_DESCRIPTION, messages.goToTeamActionLabelMessage],
    [TASK_TEMPLATE.KR_COMMENT, messages.goToTeamActionLabelMessage],
    [TASK_TEMPLATE.LOW_CONFIDENCE_KR_COMMENT, messages.goToTeamActionLabelMessage],
    [TASK_TEMPLATE.BARRIER_KR_COMMENT, messages.goToTeamActionLabelMessage],
    [TASK_TEMPLATE.OUTDATED_KEY_RESULT_COMMENT, messages.goToTeamActionLabelMessage],
  ])

  return {
    content: {
      title: intl.formatMessage(
        taskTitleMessages.get(template) ?? messages.keyResultCheckinTaskMessageTitle,
        { leader: <span style={{ color: yellow }}>Líder: </span> },
      ) as string,
      description: intl.formatMessage(
        taskDescriptionMessages.get(template) ?? messages.keyResultCheckinTaskMessageDescription,
      ),
    },
    icon: taskCardIcon.get(template) ?? <div />,
    actions: {
      role: taskUserRole.get(template) ?? AUTHZ_ROLES.TEAM_MEMBER,
      label: intl.formatMessage(
        taskCardActionLabel.get(template) ?? messages.goToTeamActionLabelMessage,
      ),
    },
  }
}
