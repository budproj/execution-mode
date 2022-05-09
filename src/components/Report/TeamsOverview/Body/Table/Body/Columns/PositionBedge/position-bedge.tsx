import { Flex, GridItem, Text, useToken } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

const BadgeWithRibbon = styled(Flex)`
  position: relative;

  &::before,
  &::after {
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
    border-radius: 4px;
    position: absolute;
    bottom: -13px;
    z-index: -1;
  }

  &::before {
    border-width: 40px 10px 6px 13px;
    border-color: transparent transparent transparent ${({ ribbonColor }) => ribbonColor};
  }

  &::after {
    border-width: 40px 13px 6px 10px;
    border-color: transparent ${({ ribbonColor }) => ribbonColor} transparent transparent;
  }
`

export interface TeamsOverviewBodyTableBodyPositionBadgeProperties {
  order: number
  isGameficationDisabled?: boolean
}

const TeamsOverviewBodyTableBodyPositionBadge = ({
  order,
  isGameficationDisabled,
}: TeamsOverviewBodyTableBodyPositionBadgeProperties) => {
  const ribbonPosition = order <= 3
  const coloredRanking = new Map([
    [1, 'yellow.600'],
    [2, 'new-gray.500'],
    [3, '#E3AE7C'],
  ])

  const colorSchemaOptions = new Map([
    [
      'gamificationOn',
      {
        badgeBackgroundColor: coloredRanking.get(order) ?? 'white',
        badgeTextColor: ribbonPosition ? 'white' : 'brand.500',
        badgeElement: ribbonPosition ? BadgeWithRibbon : Flex,
      },
    ],
    [
      'gamificationOff',
      {
        badgeBackgroundColor: 'white',
        badgeTextColor: 'brand.500',
        badgeElement: Flex,
      },
    ],
  ])

  const colorSchemaOption = isGameficationDisabled ? 'gamificationOff' : 'gamificationOn'
  const colorSchema = colorSchemaOptions.get(colorSchemaOption)
  const badgeBackgroundColor = colorSchema?.badgeBackgroundColor
  const badgeTextColor = colorSchema?.badgeTextColor
  const BadgeElement = colorSchema?.badgeElement ?? Flex
  const [ribbonColor] = useToken('colors', ['new-gray.800'])

  return (
    <GridItem
      zIndex={1}
      transform={!isGameficationDisabled && ribbonPosition ? 'translateY(-10px)' : undefined}
    >
      <BadgeElement
        borderRadius="full"
        bg={badgeBackgroundColor}
        w="40px"
        h="40px"
        alignItems="center"
        justifyContent="center"
        border="2px"
        borderColor="new-gray.200"
        ribbonColor={ribbonColor}
      >
        <Text color={badgeTextColor} fontSize="2xl" fontWeight={700} lineHeight={0.8}>
          {order}
        </Text>
      </BadgeElement>
    </GridItem>
  )
}

export default TeamsOverviewBodyTableBodyPositionBadge
