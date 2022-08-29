import { BoxProps } from '@chakra-ui/react'
import React, { useCallback } from 'react'

import CustomEmojiFelling1 from 'src/components/Icon/CustomEmojis/felling-1'
import CustomEmojiFelling2 from 'src/components/Icon/CustomEmojis/felling-2'
import CustomEmojiFelling3 from 'src/components/Icon/CustomEmojis/felling-3'
import CustomEmojiFelling4 from 'src/components/Icon/CustomEmojis/felling-4'
import CustomEmojiFelling5 from 'src/components/Icon/CustomEmojis/felling-5'

type customEmojiProperties = {
  felling: number
  size?: BoxProps['width']
}

const range = new Set([1, 2, 3, 4, 5])

interface useGetEmojiProperties {
  getEmoji({ felling, size }: customEmojiProperties): JSX.Element | undefined
}
export const useGetEmoji = (): useGetEmojiProperties => {
  const getEmoji = useCallback(({ felling, size }: customEmojiProperties) => {
    if (range.has(felling)) {
      if (felling === 1) return <CustomEmojiFelling1 desc="alterar" width={size} height={size} />
      if (felling === 2) return <CustomEmojiFelling2 desc="alterar" width={size} height={size} />
      if (felling === 3) return <CustomEmojiFelling3 desc="alterar" width={size} height={size} />
      if (felling === 4) return <CustomEmojiFelling4 desc="alterar" width={size} height={size} />
      if (felling === 5) return <CustomEmojiFelling5 desc="alterar" width={size} height={size} />
    } else {
      throw new Error('The emoji scale goes from 1 to 5')
    }
  }, [])

  return { getEmoji }
}
