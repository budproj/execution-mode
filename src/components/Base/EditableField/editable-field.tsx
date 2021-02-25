import { Stack, FormLabel, Text, StackProps, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'

export interface EditableFieldProperties extends StackProps {
  label: string
  isLoaded: boolean
  skeletonWidth: number
  skeletonHeight: number
  fallbackValue: string
  children?: ReactElement
  value?: string
}

const EditableField = ({
  label,
  value,
  fallbackValue,
  children,
  isLoaded,
  skeletonWidth,
  skeletonHeight,
  ...rest
}: EditableFieldProperties) => (
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
        <Text fontSize="md" color="black.900" fontWeight={400}>
          {value ?? fallbackValue}
        </Text>
      )}
    </Skeleton>
  </Stack>
)

EditableField.defaultProps = {
  fallbackValue: '-',
  isLoaded: true,
  skeletonWidth: 200,
  skeletonHeight: 19,
}

export default EditableField
