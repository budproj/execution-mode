import { Grid, GridItem, HStack, Tag, Text, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import React from 'react'
import { useIntl } from 'react-intl'

import newTagMessages from 'src/components/Base/MainAppBar/messages'
import tokens from 'src/themes/tokens'

import { Objective } from '../../types'
import CreateObjectiveWorkflow from '../Footer/create-objective-workflow'

import messages from './messages'

const CustomGridItem = styled(GridItem)`
  width: 260px;

  > h4 {
    text-transform: uppercase;
    color: ${tokens.colors.brand500};
    font-weight: 700;
    padding-bottom: 4px;
  }
  font-size: 12px;
  background-color: #ffffff;
  padding: 12px;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 40px -8px rgba(132, 145, 176, 0.45);
  -moz-box-shadow: 0px 0px 40px -8px rgba(132, 145, 176, 0.45);
  box-shadow: 0px 0px 40px -8px rgba(132, 145, 176, 0.45);

  > p {
    color: ${tokens.colors['new-gray700']};
  }
`

interface IntroductionSpotlightProperties {
  objectiveID?: Objective['id']
}

const IntroductionSpotlight = ({ objectiveID }: IntroductionSpotlightProperties) => {
  const intl = useIntl()

  return (
    <VStack gap={12} py={2} alignItems="flex-start">
      <HStack alignItems="center" justifyContent="center">
        <Text fontSize={14} fontWeight="bold" color="gray.500" lineHeight={0}>
          {intl.formatMessage(messages.featureTitle)}
        </Text>
        <Tag variant="solid" colorScheme="brand" ml={2} borderRadius={4}>
          {intl.formatMessage(newTagMessages.newItem)}
        </Tag>
      </HStack>
      <VStack alignItems="center" w="100%">
        <HStack
          maxWidth="805px"
          w="100%"
          alignItems="center"
          justifyContent="right"
          position="relative"
        >
          <Image
            src="/images/introduction-to-spotlight.svg"
            alt="mudar"
            width={320}
            height={320}
            style={{ position: 'absolute', left: -10, top: 5 }}
          />
          <Grid
            zIndex={2}
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(2, 1fr)"
            gap={6}
            position="relative"
          >
            <CustomGridItem>
              <h4>{intl.formatMessage(messages.firstCardTitle)}</h4>
              <p>{intl.formatMessage(messages.firstCardDescription)}</p>
            </CustomGridItem>
            <CustomGridItem h={100}>
              <h4>{intl.formatMessage(messages.secondCardTitle)}</h4>
              <p>{intl.formatMessage(messages.secondCardDescription)}</p>
            </CustomGridItem>
            <CustomGridItem>
              <h4>{intl.formatMessage(messages.thirdCardTitle)}</h4>
              <p>{intl.formatMessage(messages.thidCardDescription)}</p>
            </CustomGridItem>
            <CustomGridItem position="absolute" right={0} bottom={4}>
              <h4>{intl.formatMessage(messages.fourthCardTitle)}</h4>
              <p>{intl.formatMessage(messages.fourthCardDescription)}</p>
            </CustomGridItem>
          </Grid>
        </HStack>
      </VStack>
      <CreateObjectiveWorkflow objectiveId={objectiveID} />
    </VStack>
  )
}

export default IntroductionSpotlight
