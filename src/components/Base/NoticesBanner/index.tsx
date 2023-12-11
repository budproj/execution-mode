import { Box, Button, CloseButton, Collapse, Flex, Text } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import useLocalStorage from 'src/state/hooks/useLocalStorage/hook'

import messages from './messages'

export const storageKey = 'Bud@NPSNovember'

const NoticesBanner = () => {
  const { get, register } = useLocalStorage()

  const intl = useIntl()

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const time = setTimeout(() => {
      setIsOpen(() => {
        const valueStoraged = get(storageKey)
        if (valueStoraged === false) {
          return valueStoraged
        }

        return true
      })
    }, 2300)

    return () => clearTimeout(time)
  }, [get])

  const handleCloseBanner = useCallback(() => {
    register(storageKey, false)
    setIsOpen(false)
  }, [register])

  return (
    <Collapse animateOpacity in={isOpen}>
      <Box
        width="100%"
        h={54}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="linear-gradient(to right, #F53D7A, #1E97F7)"
      >
        <Flex gap={6} alignItems="center">
          <Text color="brand.50" fontSize={14} fontWeight="medium">
            {intl.formatMessage(messages.mainText)}
          </Text>
          <a
            href="https://bit.ly/npsprodutobud"
            target="_blank"
            style={{ textDecoration: 'none' }}
            rel="noreferrer"
          >
            <Button
              p="12px 22px 12px 22px"
              height="100%"
              borderRadius={4}
              border="1px solid"
              color="brand.50"
              fontSize={12}
              lineHeight={0}
              _hover={{
                color: 'brand.200',
              }}
            >
              {intl.formatMessage(messages.buttonText)}
            </Button>
          </a>
        </Flex>
        <CloseButton position="absolute" right={4} color="brand.50" onClick={handleCloseBanner} />
      </Box>
    </Collapse>
  )
}

export default NoticesBanner
