import { FlexProps } from '@chakra-ui/layout'
import { MessageDescriptor } from '@formatjs/intl'
import React from 'react'

import { EmptyState } from 'src/components/Base'

import messages from './messages'

type UserEmptyStateProperties = {
  title?: MessageDescriptor
  py?: FlexProps['py']
}

export const UserEmptyState = ({ title, py }: UserEmptyStateProperties) => {
  py ??= 8

  return (
    <EmptyState labelMessage={title ?? messages.title} imageKey="empty-bench" gridGap={4} py={py} />
  )
}
