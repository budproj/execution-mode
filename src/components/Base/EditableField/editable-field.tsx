import { Stack, FormLabel, Text, StackProps, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'

import messages from './messages'

export interface EditableFieldProperties extends StackProps {
  label: string
  isLoaded: boolean
  skeletonWidth: number
  skeletonHeight: number
  customFallbackValue?: string
  children?: ReactElement
  value?: string
}

const EditableField = ({
  label,
  value,
  customFallbackValue,
  children,
  isLoaded,
  skeletonWidth,
  skeletonHeight,
  ...rest
}: EditableFieldProperties) => {
  const intl = useIntl()
  const fallbackValue = customFallbackValue ?? intl.formatMessage(messages.fallbackValue)

  return (
    <Stack direciton="column" spacing={2} {...rest}>
      <FormLabel fontSize="sm" m={0}>
        {label}
      </FormLabel>
      <Skeleton
        isLoaded={isLoaded}
        {...buildSkeletonMinSize(isLoaded, skeletonWidth, skeletonHeight)}
      >
        {children ? (
          children
        ) : (
          <Text fontSize="md" color={value ? 'black.900' : 'gray.400'} fontWeight={400}>
            {value ?? fallbackValue}
          </Text>
        )}
      </Skeleton>
    </Stack>
  )
}

EditableField.defaultProps = {
  isLoaded: true,
  skeletonWidth: 200,
  skeletonHeight: 19,
}

export default EditableField
