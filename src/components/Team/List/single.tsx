import { Stack, Text } from '@chakra-ui/layout'
import { Heading } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { IntlLink, SliderWithFilledTrack } from '../../Base'
import { ArrowRight } from '../../Icon'
import { Team } from '../types'

import messages from './messages'

interface TeamListSingleProperties {
  team?: Team
}

export const TeamListSingle = ({ team }: TeamListSingleProperties) => {
  const intl = useIntl()
  const progress = team?.status?.progress ?? 0

  return (
    <IntlLink href={`/explore/${team?.id ?? ''}`}>
      <Stack
        direction="row"
        spacing={6}
        borderBottomWidth={1}
        borderColor="black.100"
        py={8}
        alignItems="center"
        _hover={{ svg: { fill: 'brand.400' } }}
        _last={{ borderColor: 'transparent' }}
      >
        <Stack spacing={4} flexGrow={1}>
          <Stack direction="row">
            <Heading as="h3" color="gray.500" fontWeight={500} fontSize="lg" flexGrow={1}>
              {team?.name}
            </Heading>

            <Text color="gray.400" fontWeight={300} fontSize="md">
              {intl.formatNumber(progress / 100, { style: 'percent' })}
            </Text>
          </Stack>

          <SliderWithFilledTrack value={progress} />
        </Stack>

        <ArrowRight
          desc={intl.formatMessage(messages.anchorArrowRightDesc)}
          fill="black.300"
          transition=".2s fill ease-out"
        />
      </Stack>
    </IntlLink>
  )
}
