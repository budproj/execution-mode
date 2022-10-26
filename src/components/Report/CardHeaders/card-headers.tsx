import { Box, Flex, Heading, Skeleton } from '@chakra-ui/react'
import React from 'react'

interface CardHeaderProperties {
  title: string
  subtitle: string
  loading: boolean
  children?: React.ReactNode
}

export const CardHeader = ({ loading, title, subtitle, children }: CardHeaderProperties) => {
  return (
    <Flex mb="14px" justifyContent="space-between">
      <Box flex="1">
        <Skeleton isLoaded={!loading} width={title.length * 10}>
          <Heading as="h3" fontWeight="500" fontSize="18px" color="new-gray.900">
            {title}
          </Heading>
        </Skeleton>
        <Skeleton isLoaded={!loading} width={subtitle.length * 7}>
          <Heading as="h4" fontWeight="400" fontSize="14px" color="new-gray.700" mt={2}>
            {subtitle}
          </Heading>
        </Skeleton>
      </Box>
      {children}
    </Flex>
  )
}
