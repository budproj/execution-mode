import {
  Flex,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Text,
  Button,
  Box,
  Divider,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'

import { TaskPriority } from 'src/components/Base/KanbanTaskCard/kanban-task-card-root'
import Editor from 'src/components/Base/TipTapEditor/tip-tap-editor'
import CalendarOutlineIcon from 'src/components/Icon/CalendarOutline'
import { Team } from 'src/components/Team/types'
import { isEditingTaskDrawerIdAtom } from 'src/state/recoil/task-management/drawers/insert/is-editing-task-drawer'
import { taskInsertDrawerTeamID } from 'src/state/recoil/task-management/drawers/insert/task-insert-drawer'
import { taskDrawerAtom } from 'src/state/recoil/task-management/drawers/task-drawer/task-drawer'
import { taskDrawerIdAtom } from 'src/state/recoil/task-management/drawers/task-drawer/task-drawer-id'
import { taskSupportTeamAtom } from 'src/state/recoil/task-management/drawers/task-drawer/task-support-team'
import { usersCompany } from 'src/state/recoil/team/users-company'

import { ColumnColorScheme, headerColumnMessage } from '../Board/utils/helpers'
import { PrirityItemOption } from '../PrioritySelectMenu/wrapper'
import { BOARD_DOMAIN, useTeamTasksBoardData } from '../hooks/use-team-tasks-board-data'

import { TaskDrawerSectionOwnerWrapper } from './OwnerSection'
import { TaskDrawerTimeline } from './Timeline'

interface TaskDrawerProperties {
  readonly teamId: Team['id']
}

export const TaskDrawer = ({ teamId }: TaskDrawerProperties) => {
  const router = useRouter()
  const { id: teamID } = router.query
  const intl = useIntl()
  const { data: boardData } = useTeamTasksBoardData(teamId)
  const taskDrawer = useRecoilValue(taskDrawerAtom)
  const taskDrawerId = useRecoilValue(taskDrawerIdAtom)
  const setTaskSupportTeam = useSetRecoilState(taskSupportTeamAtom)
  const resetTaskDrawerId = useResetRecoilState(taskDrawerIdAtom)
  const setTaskBoardID = useSetRecoilState(taskInsertDrawerTeamID)
  const isEditingTaskDrawerId = useSetRecoilState(isEditingTaskDrawerIdAtom)

  const translatedStatus = headerColumnMessage.get(taskDrawer?.status)

  const companyUsers = useRecoilValue(usersCompany)

  useEffect(() => {
    setTaskSupportTeam(
      companyUsers.filter((member) => taskDrawer?.supportTeamMembers.includes(member.id)),
    )
  }, [companyUsers, setTaskSupportTeam, taskDrawer])

  const isOpen = Boolean(taskDrawerId)

  const handleClickEditButton = () => {
    resetTaskDrawerId()
    setTaskBoardID({
      boardID: boardData?._id,
      domain: BOARD_DOMAIN.TEAM,
      identifier: teamID as unknown as string,
      column: taskDrawer.status,
    })
    isEditingTaskDrawerId(taskDrawer?._id)
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
              <Text color="new-gray.900" fontWeight={500} fontSize="24px">
                {taskDrawer?.title}
              </Text>

              <PrirityItemOption mt="10px" priority={taskDrawer?.priority as TaskPriority} />

              <Flex alignItems="center" gap="10px" marginY="25px">
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
              <Divider />

              <TaskDrawerSectionOwnerWrapper
                ownerId={taskDrawer?.owner}
                boardID={boardData?._id ?? ''}
                domain={BOARD_DOMAIN.TEAM}
                identifier={teamID as unknown as string}
                column={taskDrawer?.status}
                task={taskDrawer}
                teamMembers={companyUsers}
              />

              <Divider />

              {/* <Box marginY="24px">
                <Text color="gray.500" fontWeight={700} marginBottom="10px">
                  ANEXOS
                </Text>
                <Flex flexDir="column" gap="8px">
                  {taskDrawer?.attachments.map((att) => (
                    <Flex key={att} gap="5px">
                      <PDFIcon width="20px" height="20px" desc="" />
                      <Text color="gray.500" textDecoration="underline" fontWeight={450}>
                        {att}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Box>

              <Divider /> */}

              <Editor content={taskDrawer?.description} />
            </Flex>
          </Flex>
          <TaskDrawerTimeline task={taskDrawer} />
        </Flex>
      </DrawerContent>
    </Drawer>
  )
}
