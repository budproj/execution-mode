import {
  Box,
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { ConfirmationDialog } from 'src/components/Base/Dialogs/Confirmation/Base/wrapper'
import IntlLink from 'src/components/Base/IntlLink'
import TreeDotsIcon from 'src/components/Icon/TreeDots'
import { CardHeader } from 'src/components/KeyResult/Single/Sections/Timeline/Cards/Base/header'
import { insertMentionInString } from 'src/components/Routine/RetrospectiveTab/Comments/CommentCard'
import { useDeleteTaskComment } from 'src/components/TaskManagement/hooks/new-task/use-delete-task-comments'
import UserProfileCard from 'src/components/User/ProfileCard'
import { TaskComment } from 'src/services/new-task-management/@types/task-comment.type'
import meAtom from 'src/state/recoil/user/me'

import messages from '../locale/messages'

export interface TaskTimelineCardCommentProperties {
  data: Partial<TaskComment>
}

export const MarkedUser = ({ id, name }: { id?: string; name?: string }) => (
  <Popover placement="top-end" size="sm">
    <PopoverTrigger>
      <Text as="span" color="brand.500" cursor="pointer">
        {name}
      </Text>
    </PopoverTrigger>
    <PopoverContent p={0}>
      <PopoverBody p={0}>
        <UserProfileCard userID={id} />
      </PopoverBody>
    </PopoverContent>
  </Popover>
)

const TaskTimelineCardComment = ({ data }: TaskTimelineCardCommentProperties) => {
  const intl = useIntl()

  const myID = useRecoilValue(meAtom)
  const intlCardType = intl.formatMessage(messages.cardType)

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false)

  const { mutateAsync: deleteComment } = useDeleteTaskComment()

  const handleDelete = async () => {
    deleteComment({ taskCommentId: data.id ?? '' })
    setIsDeleteConfirmationModalOpen(false)
  }

  const formattedCommentText = useMemo(() => {
    return data?.text?.split('\n').map((line) => (
      <span key={line} style={{ display: 'block' }}>
        {insertMentionInString(line)}
      </span>
    ))
  }, [data?.text])

  return (
    <Box
      p={4}
      bg="white"
      borderWidth={4}
      borderColor="new-gray.200"
      boxShadow="with-stroke.medium"
      borderRadius={6}
      borderBottomRadius={6}
      position="relative"
    >
      <Box position="absolute" right={4} top={4}>
        <Menu
          variant="action-list"
          isOpen={isMenuOpen}
          onOpen={() => setIsMenuOpen(true)}
          onClose={() => setIsMenuOpen(false)}
        >
          <MenuButton>
            <TreeDotsIcon
              desc={intl.formatMessage(messages.treeDotsIconDesc)}
              fill="new-gray.800"
              w={7}
              h="auto"
            />
          </MenuButton>
          <MenuList>
            <Button
              color="gray.400"
              p={2}
              w="100%"
              justifyContent="flex-start"
              variant="none"
              _hover={{ bg: 'black.100' }}
              onClick={() => {
                setIsDeleteConfirmationModalOpen(true)
                setIsMenuOpen(false)
              }}
            >
              {intl.formatMessage(messages.removeMenuOption)}
            </Button>
          </MenuList>
        </Menu>

        <ConfirmationDialog
          isOpen={isDeleteConfirmationModalOpen}
          headerImageURL="/images/bud-trash-bin.png"
          title={intl.formatMessage(messages.deleteDialogTitle, {
            type: intlCardType
              ? intlCardType.toLowerCase()
              : intl.formatMessage(messages.cardTypeFallback).toLowerCase(),
          })}
          onConfirm={handleDelete}
          onClose={() => setIsDeleteConfirmationModalOpen(false)}
        />
      </Box>

      <Stack spacing={3}>
        <Box>
          <IntlLink
            href={data?.user?.id === myID ? '/my-things' : `/profile/${data?.user?.id ?? ''}`}
          >
            <CardHeader userID={data?.user?.id} date={new Date(data?.createdAt ?? 0)} />
          </IntlLink>
          <Divider />
        </Box>
        <Flex gridGap={4} direction="column">
          <Text fontSize="md" color="new-gray.900">
            {formattedCommentText}
          </Text>
        </Flex>
      </Stack>
    </Box>
  )
}

export default TaskTimelineCardComment
