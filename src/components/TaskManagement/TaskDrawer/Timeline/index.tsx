import { Avatar, Flex, SkeletonCircle, Spinner } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { useRecoilValue } from 'recoil'

import KeyResultSectionAddCommentInput from 'src/components/KeyResult/Single/Sections/AddComment/input'
import { Task } from 'src/services/new-task-management/@types/task.type'
import { userAtomFamily } from 'src/state/recoil/user'
import meAtom from 'src/state/recoil/user/me'

import { useAddTaskComment } from '../../hooks/new-task/use-add-task-comments'
import { useGetTaskComments } from '../../hooks/new-task/use-get-task-comments'

import { TimelineWrapper } from './timeline-wrapper'

const initialValues = {
  text: '',
}

interface TaskDrawerTimelineProperties {
  readonly task?: Partial<Task>
}

export interface TaskCommentsInputInitialValues {
  text: string
}

export const TaskDrawerTimeline = ({ task }: TaskDrawerTimelineProperties) => {
  const myID = useRecoilValue(meAtom)
  const user = useRecoilValue(userAtomFamily(myID))

  const handleSubmit = async (
    values: TaskCommentsInputInitialValues,
    actions: FormikHelpers<TaskCommentsInputInitialValues>,
  ) => {
    if (task) {
      const data = {
        text: values.text,
        taskId: task.id ?? '',
        userId: myID,
      }
      addTaskCommentMutate({ data })
    }

    actions.setSubmitting(false)
    actions.resetForm()
  }

  const { data: comments, isLoading } = useGetTaskComments(task?.id ?? '')
  const { mutateAsync: addTaskCommentMutate } = useAddTaskComment()

  return (
    <Flex direction="column" paddingTop="2rem" position="relative" height="100%">
      <Flex direction="column" marginX="28px" marginBottom="2rem" gridGap={4}>
        {comments ? (
          <TimelineWrapper comments={comments} updates={task?.history ?? []} />
        ) : (
          <Spinner size="sm" color="black.100" />
        )}
      </Flex>
      <Flex
        direction="column"
        bg="white"
        boxShadow="with-stroke.light"
        borderColor="new-gray.200"
        paddingY="1rem"
        paddingX="1rem"
        width="100%"
        position="relative"
        bottom="0"
        marginTop="auto"
      >
        <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Flex gridGap={3} alignItems="flex-start">
                <SkeletonCircle isLoaded={!isLoading} w={10} h={10}>
                  <Avatar name={user?.fullName} src={user?.picture} w={10} h={10} />
                </SkeletonCircle>
                <KeyResultSectionAddCommentInput isLoading={isLoading} />
              </Flex>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  )
}
