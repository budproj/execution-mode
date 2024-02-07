import { Avatar, Flex, SkeletonCircle } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'

import KeyResultSectionAddCommentInput from 'src/components/KeyResult/Single/Sections/AddComment/input'
import { KeyResultSectionTimelineCardComment } from 'src/components/KeyResult/Single/Sections/Timeline/Cards'
import { User } from 'src/components/User/types'

const initialValues = {
  text: '',
}

interface TaskDrawerTimelineProperties {
  readonly owner?: Partial<User>
}

export const TaskDrawerTimeline = ({ owner }: TaskDrawerTimelineProperties) => {
  const handleSubmit = async (values, actions) => {}

  return (
    <Flex direction="column" gridGap={4} paddingX="28px" paddingTop="40px">
      <KeyResultSectionTimelineCardComment />
      <KeyResultSectionTimelineCardComment />
      <KeyResultSectionTimelineCardComment />
      <KeyResultSectionTimelineCardComment />
      <Flex direction="column" marginBottom="10px">
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
