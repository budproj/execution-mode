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
}

const TeamsOverviewBodyTableBodyPositionBadge = ({
  order,
}: TeamsOverviewBodyTableBodyPositionBadgeProperties) => {
  const coloredRanking = new Map([
    [1, 'yellow.600'],
    [2, 'new-gray.500'],
    [3, '#E3AE7C'],
  ])
  const ribbonPosition = order > 3
  const badgeBackgroundColor = coloredRanking.get(order) ?? 'white'
  const badgeTextColor = ribbonPosition ? 'brand.500' : 'white'
  const BadgeElement = ribbonPosition ? Flex : BadgeWithRibbon
  const [ribbonColor] = useToken('colors', ['new-gray.800'])

  return (
    <GridItem zIndex={1}>
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
