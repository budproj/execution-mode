import { Flex } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

export interface CompanyProgressOverviewBodyStampBaseProperties {
  icon: ReactElement
  children: ReactElement | ReactElement[]
}

const CompanyProgressOverviewBodyStampBase = ({
  icon,
  children,
}: CompanyProgressOverviewBodyStampBaseProperties) => (
  <Flex gridGap={4} alignItems="center">
    <Flex
      borderRadius="full"
      bg="gray.50"
      w="80px"
      height="80px"
      alignItems="center"
      justifyContent="center"
    >
      {icon}
    </Flex>

    <Flex direction="column" gridGap={2}>
      {children}
    </Flex>
  </Flex>
)

export default CompanyProgressOverviewBodyStampBase
