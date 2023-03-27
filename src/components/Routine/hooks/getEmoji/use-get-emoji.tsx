import { BoxProps, Text } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { useIntl } from 'react-intl'

import CustomEmojiFelling1 from 'src/components/Icon/CustomEmojis/felling-1'
import CustomEmojiFelling2 from 'src/components/Icon/CustomEmojis/felling-2'
import CustomEmojiFelling3 from 'src/components/Icon/CustomEmojis/felling-3'
import CustomEmojiFelling4 from 'src/components/Icon/CustomEmojis/felling-4'
import CustomEmojiFelling5 from 'src/components/Icon/CustomEmojis/felling-5'

import messages from './messages'

type customEmojiProperties = {
  felling?: number
  size?: BoxProps['width']
}

interface useGetEmojiProperties {
  getEmoji({ felling, size }: customEmojiProperties): JSX.Element
}
export const useGetEmoji = (): useGetEmojiProperties => {
  const intl = useIntl()

  const getEmoji = useCallback(({ felling, size }: customEmojiProperties) => {
    if (felling) {
      if (felling <= 1)
        return (
          <CustomEmojiFelling1
            desc={intl.formatMessage(messages.felling1)}
            width={size}
            height={size}
          />
        )
      if (felling <= 2)
        return (
          <CustomEmojiFelling2
            desc={intl.formatMessage(messages.felling2)}
            width={size}
            height={size}
          />
        )
      if (felling <= 3)
        return (
          <CustomEmojiFelling3
            desc={intl.formatMessage(messages.felling3)}
            width={size}
            height={size}
          />
        )
      if (felling <= 4)
        return (
          <CustomEmojiFelling4
            desc={intl.formatMessage(messages.felling4)}
            width={size}
            height={size}
          />
        )
      if (felling <= 5)
        return (
          <CustomEmojiFelling5
            desc={intl.formatMessage(messages.felling5)}
            width={size}
            height={size}
          />
        )
    }

    return (
      <Text fontSize="2rem" transform="translateX(90%)" color="#b5c0db">
        -
      </Text>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { getEmoji }
}
