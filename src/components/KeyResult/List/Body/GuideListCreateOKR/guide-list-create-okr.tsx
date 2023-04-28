import { Flex, Text, Button, Heading, Link, Circle } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { CardGuide } from 'src/components/Base/CardGuide/card-guide'
import { ArrowRightLong } from 'src/components/Icon'

import messages from './messages'

const GuideListCreateOkr = () => {
  const intl = useIntl()

  return (
    <Flex gap={15} flexDir="column" cursor="auto" width="100%">
      <Heading display="flex" alignItems="center" justifyContent="space-between">
        <Text fontSize={14} fontWeight="medium" color="#8491B0">
          {intl.formatMessage(messages.guideListCreateOkrHeadTitle)}
        </Text>
        <Link href="https://www.exemplosdeokr.com.br/" target="_blank" rel="noreferrer noopener">
          <Button
            color="brand.500"
            display="flex"
            p={1}
            _hover={{
              color: 'brand.400',
            }}
            rightIcon={
              <Circle border="1.5px solid" borderColor="currentColor" size={4}>
                <ArrowRightLong
                  title={intl.formatMessage(messages.guideListCreateOkrHeadTitle)}
                  desc={intl.formatMessage(messages.guideListCreateOkrHeadTitle)}
                  stroke="currentColor"
                  fill="currentColor"
                  fontSize="medium"
                  transform="scale(0.5)"
                />
              </Circle>
            }
          >
            {intl.formatMessage(messages.linkButtonMessage)}
          </Button>
        </Link>
      </Heading>
      <Flex gap={5}>
        <CardGuide
          title={messages.guideTitleToCreateObjectives}
          iconKey="diamond"
          description={messages.guideDescriptionToCreateObjectives}
        />
        <CardGuide
          title={messages.guideTitleToCreateObjectives2}
          iconKey="mountain"
          description={messages.guideDescriptionToCreateObjectives2}
        />
        <CardGuide
          title={messages.guideTitleToCreateObjectives3}
          iconKey="circles"
          description={messages.guideDescriptionToCreateObjectives3}
        />
      </Flex>
    </Flex>
  )
}

export default GuideListCreateOkr
