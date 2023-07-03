import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { MessageDescriptor, useIntl } from 'react-intl'

interface CardGuideProperties {
  iconKey: keyof typeof iconKeys
  title: MessageDescriptor
  description: MessageDescriptor
}

const iconKeys = {
  diamond: '/images/diamond.svg',
  mountain: '/images/mountain.svg',
  circles: '/images/circles.svg',
}

export const CardGuide = ({ iconKey, title, description }: CardGuideProperties) => {
  const iconURL = iconKeys[iconKey]
  const intl = useIntl()

  return (
    <Flex
      flexDir="column"
      alignItems="flex-start"
      justifyContent="center"
      border="2px solid #EEF2FC"
      borderRadius="10px"
      padding={6}
      width="100%"
    >
      <Image mb={2} flex={1} src={iconURL} />
      <Text color="#99A4C2" fontSize="14px" fontWeight="bold">
        {intl.formatMessage(title)}
      </Text>
      <Text textAlign="left" color="#99A4C2" fontSize="12px" fontWeight="regular" mt={1}>
        {intl.formatMessage(description)}
      </Text>
    </Flex>
  )
}
