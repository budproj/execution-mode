import React from 'react'
import { Flex, Image, Text } from '@chakra-ui/react'
import { MessageDescriptor, useIntl } from 'react-intl'

interface CardGuideProps {
  iconKey: keyof typeof iconKeys
  title: MessageDescriptor
  description: MessageDescriptor
}

const iconKeys = {
  diamond: '/images/diamond.svg',
  mountain: '/images/mountain.svg',
  circles: '/images/circles.svg',
}

export const CardGuide = ({ iconKey, title, description }: CardGuideProps) => {
  const iconURL = iconKeys[iconKey]
  const intl = useIntl()

  return (
    <Flex
      flexDir="column"
      alignItems="flex-start"
      justifyContent="center"
      border="2px solid #EEF2FC"
      borderRadius="10px"
      padding="22px"
      width="100%"
    >
      <Image mb="10px" flex={1} src={iconURL} />
      <Text color="#99A4C2" fontSize="14px" fontWeight="bold" lineHeight="19.6px">
        {intl.formatMessage(title)}
      </Text>
      <Text color="#99A4C2" fontSize="12px" fontWeight="regular" lineHeight="16.8px">
        {intl.formatMessage(description)}
      </Text>
    </Flex>
  )
}
