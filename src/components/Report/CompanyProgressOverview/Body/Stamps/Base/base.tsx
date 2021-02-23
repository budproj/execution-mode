import { Flex, FlexProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

export interface CompanyProgressOverviewBodyStampBaseProperties {
  icon: ReactElement
  children: ReactElement | ReactElement[]
  iconBorderColor?: FlexProps['borderColor']
  iconBgColor?: FlexProps['bg']
}

const CompanyProgressOverviewBodyStampBase = ({
  icon,
  children,
  iconBorderColor,
  iconBgColor,
}: CompanyProgressOverviewBodyStampBaseProperties) => (
  <Flex gridGap={4} alignItems="center">
    <Flex
      borderRadius="full"
      w={20}
      h={20}
      alignItems="center"
      justifyContent="center"
      bg={iconBgColor}
      borderColor={iconBorderColor}
      borderWidth={2}
    >
      {icon}
    </Flex>

    <Flex direction="column" gridGap={2} color="gray.900">
      {children}
    </Flex>
  </Flex>
)

CompanyProgressOverviewBodyStampBase.defaultProps = {
  iconBgColor: 'transparent',
  iconBorderColor: 'transparent',
}

export default CompanyProgressOverviewBodyStampBase
