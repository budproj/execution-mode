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
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import Editor from 'src/components/Base/TipTapEditor/tip-tap-editor'
import CalendarOutlineIcon from 'src/components/Icon/CalendarOutline'
import { Team } from 'src/components/Team/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { taskDrawerAtom } from 'src/state/recoil/task-management/drawers/task-drawer/task-drawer'
import { teamAtomFamily } from 'src/state/recoil/team'

import { PrirityItemOption } from '../PrioritySelectMenu/wrapper'

import { TaskDrawerSectionOwnerWrapper } from './OwnerSection'
import { TaskDrawerTimeline } from './Timeline'

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`

interface TaskDrawerProperties {
  readonly teamId?: Team['id']
}

export const TaskDrawer = ({ teamId }: TaskDrawerProperties) => {
  const intl = useIntl()
  const taskDrawer = useRecoilValue(taskDrawerAtom)
  const resetTaskDrawerId = useResetRecoilState(taskDrawerAtom)

  const team = useRecoilValue(teamAtomFamily(teamId))
  const [teamMembers, setTeamMemberEdges] = useConnectionEdges(team?.users?.edges)

  useEffect(() => {
    if (team) {
      setTeamMemberEdges(team.users?.edges)
    }
  }, [team, setTeamMemberEdges])

  const supportTeam = teamMembers.filter((member) =>
    taskDrawer?.supportTeamMembers.includes(member.id),
  )

  const isOpen = Boolean(taskDrawer)

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
      <DrawerContent bg="new-gray.100" overflowY="auto" flexGrow={1}>
        <Flex flexDirection="column">
          <Flex paddingX="24px" bg="white">
            <Flex flexDirection="column">
              <Flex marginTop="15px">
                <Flex
                  bg="yellow.600"
                  borderRadius="100px"
                  fontWeight={700}
                  fontSize="12px"
                  justifyContent="center"
                  alignItems="center"
                  height="20px"
                  width="90px"
                >
                  <Text color="white">{taskDrawer?.status}</Text>
                </Flex>

                <Button bg="new-gray.300" marginLeft="auto">
                  Editar
                </Button>
              </Flex>
              <Text color="new-gray.900" fontWeight={500} fontSize="24px">
                {taskDrawer?.title}
              </Text>

              <PrirityItemOption marginTop="10px" priority={taskDrawer?.priority} />

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
                users={teamMembers}
                supportTeam={supportTeam}
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

              <Editor
                content={taskDrawer?.description}
                onUpdate={() => {
                  console.log('teste')
                }}
              />
            </Flex>
          </Flex>
          <TaskDrawerTimeline />
        </Flex>
      </DrawerContent>
    </Drawer>
  )
}
