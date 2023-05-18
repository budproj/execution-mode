import { Stack, Text, useToken } from '@chakra-ui/react'
import React from 'react'

import { DangerActionIcon } from 'src/components/Icon'

export enum DANGERS_ACTIONS_HEADER_COLORS_SCHEME {
  RED = 'red',
  GREEN = 'green',
}

type HeaderProperties = {
  title?: string | React.ReactNode
  colorScheme?: DANGERS_ACTIONS_HEADER_COLORS_SCHEME
}

export const Header = ({
  title,
  colorScheme = DANGERS_ACTIONS_HEADER_COLORS_SCHEME.RED,
}: HeaderProperties) => {
  const [green] = useToken('colors', ['green.500'])
  const [red] = useToken('colors', ['red.500'])

  const colors = new Map([
    [DANGERS_ACTIONS_HEADER_COLORS_SCHEME.GREEN, green],
    [DANGERS_ACTIONS_HEADER_COLORS_SCHEME.RED, red],
  ])

  console.log({ colorScheme })

  return (
    <Stack alignItems="center" spacing={8} px={4}>
      <DangerActionIcon desc="ds" color={colors.get(colorScheme)} />
      <Text color="gray.500" fontSize="3xl" fontWeight={500} lineHeight={10} textAlign="center">
        {title}
      </Text>
    </Stack>
  )
}
