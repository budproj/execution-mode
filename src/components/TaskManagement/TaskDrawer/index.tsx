import {
  Flex,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Text,
  Button,
  Box,
  Divider,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'

import { TaskPriority } from 'src/components/Base/KanbanTaskCard/kanban-task-card-root'
import CalendarOutlineIcon from 'src/components/Icon/CalendarOutline'
import { Team } from 'src/components/Team/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'
import { isEditingTaskDrawerIdAtom } from 'src/state/recoil/task-management/drawers/insert/is-editing-task-drawer'
import { taskInsertDrawerTeamID } from 'src/state/recoil/task-management/drawers/insert/task-insert-drawer'
import { taskDrawerAtom } from 'src/state/recoil/task-management/drawers/task-drawer/task-drawer'
import { taskDrawerIdAtom } from 'src/state/recoil/task-management/drawers/task-drawer/task-drawer-id'
import { taskSupportTeamAtom } from 'src/state/recoil/task-management/drawers/task-drawer/task-support-team'
import { usersCompany } from 'src/state/recoil/team/users-company'

import useColumnTasks from '../Board/hooks/use-column-tasks'
import { ColumnColorScheme, headerColumnMessage } from '../Board/utils/helpers'
import { PrirityItemOption } from '../PrioritySelectMenu/wrapper'

import { TaskDrawerSectionOwnerWrapper } from './OwnerSection'
import { TaskDrawerTimeline } from './Timeline'
import { TaskDescriptionSection } from './description-section'
import { TaskTitleSection } from './title-section'

interface TaskDrawerProperties {
  readonly teamId: Team['id']
}

export const TaskDrawer = ({ teamId }: TaskDrawerProperties) => {
  const router = useRouter()
  const intl = useIntl()

  const { id: teamID } = router.query
  const [confidenceConfig, setConfidenceConfig] = useConfidenceTag()

  const taskDrawer = useRecoilValue(taskDrawerAtom)
  const taskDrawerId = useRecoilValue(taskDrawerIdAtom)
  const setTaskSupportTeam = useSetRecoilState(taskSupportTeamAtom)
  const resetTaskDrawerId = useResetRecoilState(taskDrawerIdAtom)
  const setTaskBoardID = useSetRecoilState(taskInsertDrawerTeamID)
  const isEditingTaskDrawerId = useSetRecoilState(isEditingTaskDrawerIdAtom)

  const { updateTask } = useColumnTasks(taskDrawer?.status, teamID as unknown as string)

  const translatedStatus = headerColumnMessage.get(taskDrawer?.status)

  const companyUsers = useRecoilValue(usersCompany)

  useEffect(() => {
    setTaskSupportTeam(companyUsers.filter((member) => taskDrawer?.usersRelated.includes(member)))
  }, [companyUsers, setTaskSupportTeam, taskDrawer])

  useEffect(() => {
    if (taskDrawer?.keyResult?.lastCheckin?.confidence) {
      setConfidenceConfig(taskDrawer?.keyResult?.lastCheckin?.confidence)
    }
  }, [taskDrawer, setConfidenceConfig])

  const isOpen = Boolean(taskDrawerId)

  const handleClickEditButton = () => {
    resetTaskDrawerId()
    setTaskBoardID({
      teamId: taskDrawer?.id,
      column: taskDrawer.status,
    })
    isEditingTaskDrawerId(taskDrawer?.id)
  }

  return (
    <Drawer
      isOpen={isOpen}
      size="xl"
      placement="right"
      onClose={() => {
        resetTaskDrawerId()
      }}
    >
      <DrawerOverlay />
      <DrawerContent
        bg="new-gray.100"
        overflowY="scroll"
        flexGrow={1}
        position="fixed"
        height="100%"
      >
        <Flex flexDirection="column" height="100%">
          <Flex paddingX="24px" bg="white">
            <Flex flexDirection="column" width="100%">
              <Flex marginTop="15px">
                <Flex
                  bg={ColumnColorScheme[taskDrawer?.status]}
                  borderRadius="100px"
                  fontWeight={700}
                  fontSize="12px"
                  justifyContent="center"
                  alignItems="center"
                  height="20px"
                  paddingX="15px"
                >
                  <Text color="white" textTransform="uppercase">
                    {translatedStatus && intl.formatMessage(translatedStatus)}
                  </Text>
                </Flex>

                <Button bg="new-gray.300" marginLeft="auto" onClick={handleClickEditButton}>
                  Editar
                </Button>
              </Flex>

              <TaskTitleSection
                updateTask={updateTask}
                teamId={teamID as string}
                task={taskDrawer}
              />

              <PrirityItemOption mt="10px" priority={taskDrawer?.priority as TaskPriority} />

              <Flex direction="row" justifyContent="space-between" marginY="25px">
                <Flex alignItems="center" gap="10px" flexGrow={1}>
                  <Flex
                    width="40px"
                    height="40px"
                    bg="gray.100"
                    borderRadius="50%"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <CalendarOutlineIcon fill="gray.500" width="20px" height="20px" desc="" />
                  </Flex>
                  <Box>
                    <Text color="gray.500" fontWeight={700} lineHeight={1}>
                      PRAZO
                    </Text>
                    <Text>{intl.formatDate(taskDrawer?.dueDate)}</Text>
                  </Box>
                </Flex>
                {taskDrawer?.keyResult && confidenceConfig && (
                  <Flex gridGap={2} alignItems="center" flexGrow={1}>
                    <CircularProgress
                      capIsRound
                      thickness={6}
                      trackColor={confidenceConfig.color ? confidenceConfig.color.light : 'gray.50'}
                      value={taskDrawer?.keyResult.lastCheckin?.progress}
                      color={confidenceConfig.color ? confidenceConfig.color.primary : 'gray.300'}
                    >
                      <CircularProgressLabel
                        fontWeight={800}
                        color={confidenceConfig.color ? confidenceConfig.color.primary : 'gray.300'}
                      >
                        {Math.round(taskDrawer?.keyResult.lastCheckin?.progress ?? 0)}%
                      </CircularProgressLabel>
                    </CircularProgress>
                    <Box color="new-gray.900">
                      <Text fontSize={14} fontWeight={500}>
                        {taskDrawer.keyResult.title}
                      </Text>
                    </Box>
                  </Flex>
                )}
              </Flex>

              <Divider />

              <TaskDrawerSectionOwnerWrapper
                ownerId={taskDrawer?.owner}
                teamId={teamId}
                column={taskDrawer?.status}
                task={taskDrawer}
                teamMembers={companyUsers}
              />

              <Divider />

              <TaskDescriptionSection
                task={taskDrawer}
                teamId={teamID as string}
                updateTask={updateTask}
              />
            </Flex>
          </Flex>
          <TaskDrawerTimeline task={taskDrawer} />
        </Flex>
      </DrawerContent>
    </Drawer>
  )
}
