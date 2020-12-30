import { Flex, FlexProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

export type StampIconVariant = 'outlined' | 'contained'

export interface CompanyProgressOverviewBodyStampBaseProperties {
  icon: ReactElement
  children: ReactElement | ReactElement[]
  iconBorderColor?: FlexProps['borderColor']
  iconVariant?: StampIconVariant
}

const CompanyProgressOverviewBodyStampBase = ({
  icon,
  children,
  iconBorderColor,
  iconVariant,
}: CompanyProgressOverviewBodyStampBaseProperties) => (
  <Flex gridGap={4} alignItems="center">
    <Flex
      borderRadius="full"
      bg={iconVariant === 'contained' ? 'gray.50' : 'transparent'}
      w="80px"
      height="80px"
      alignItems="center"
      justifyContent="center"
      borderColor={iconBorderColor}
      borderWidth={iconVariant === 'outlined' ? 2 : 0}
    >
      {icon}
    </Flex>

    <Flex direction="column" gridGap={2}>
      {children}
    </Flex>
  </Flex>
)

CompanyProgressOverviewBodyStampBase.defaultProps = {
  iconVariant: 'contained',
}

export default CompanyProgressOverviewBodyStampBase
