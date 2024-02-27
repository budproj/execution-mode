import { Avatar, Flex, SkeletonCircle } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import React, { useEffect } from 'react'

import KeyResultSectionAddCommentInput from 'src/components/KeyResult/Single/Sections/AddComment/input'
import { useGetCommentsByEntity } from 'src/components/Routine/hooks/getCommentsByEntity'
import { useCreateComment } from 'src/components/Routine/hooks/setComment'
import { User } from 'src/components/User/types'
import { Task } from 'src/services/task-management/task-management.service'

import { useGetTaskUpdates } from '../../hooks/use-get-task-updates'
import { TASK_DOMAIN } from '../../types'

import { TimelineWrapper } from './timeline-wrapper'

const initialValues = {
  text: '',
}

interface TaskDrawerTimelineProperties {
  readonly owner?: Partial<User>
  readonly task?: Partial<Task>
}

export interface TaskCommentsInputInitialValues {
  text: string
}

export const TaskDrawerTimeline = ({ owner, task }: TaskDrawerTimelineProperties) => {
  const entity = `${TASK_DOMAIN.task}:${task?._id ?? ''}`

  const taskUpdatesRequest = useGetTaskUpdates(task?._id)

  const handleSubmit = async (
    values: TaskCommentsInputInitialValues,
    actions: FormikHelpers<TaskCommentsInputInitialValues>,
  ) => {
    if (task) {
      handleCreateComment({ entity, content: values.text })
    }

    actions.setSubmitting(false)
    actions.resetForm()
  }

  const { getCommentsByEntity, comments } = useGetCommentsByEntity()
  const { handleCreateComment } = useCreateComment()

  useEffect(() => {
    if (task) {
      getCommentsByEntity({ entity })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task, entity])

  return (
    <Flex direction="column" paddingTop="2rem" position="relative">
      <Flex direction="column" marginX="28px" marginBottom="2rem" gridGap={4}>
        <TimelineWrapper
          comments={comments}
          updates={taskUpdatesRequest.data ? taskUpdatesRequest.data : []}
        />
      </Flex>
      <Flex
        direction="column"
        bg="white"
        paddingY="1rem"
        paddingX="1rem"
        width="100%"
        // Position="fixed"
        bottom="0"
      >
        <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Flex gridGap={3} alignItems="flex-start">
                <SkeletonCircle isLoaded w={10} h={10}>
                  <Avatar name={owner?.fullName} src={owner?.picture} w={10} h={10} />
                </SkeletonCircle>
                <KeyResultSectionAddCommentInput isLoading={false} />
              </Flex>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  )
}
