import { Box, Button, CloseButton, Collapse, Flex, Text } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import useLocalStorage from 'src/state/hooks/useLocalStorage/hook'
import meAtom from 'src/state/recoil/user/me'
import selectUser from 'src/state/recoil/user/selector'

import messages from './messages'

export const storageKey = 'bud-platform-speed-survey'
export const storageValue = '15-01-25'

const NoticesBanner = () => {
  const { get, register } = useLocalStorage()
  const userID = useRecoilValue(meAtom)
  const user = useRecoilValue(selectUser(userID))

  const intl = useIntl()

  const [isOpen, setIsOpen] = useState(false)
  const [formUrl, setFormUrl] = useState('')

  useEffect(() => {
    const time = setTimeout(() => {
      setIsOpen(() => get(storageKey) !== storageValue)
    }, 2300)

    return () => clearTimeout(time)
  }, [get])

  useEffect(() => {
    if (user?.companies) {
      setFormUrl(
        `https://asm6am1qamy.typeform.com/to/ws7KOlJ6?utm_term=${user.companies.edges[0].node?.name}&utm_source=getbud&utm_medium=app&utm_campaign=nps25q1`,
      )
    }
  }, [user])

  const handleCloseBanner = useCallback(() => {
    register(storageKey, storageValue)
    setIsOpen(false)
  }, [register])

  return (
    <Collapse animateOpacity in={isOpen && user?.companies !== undefined}>
      <Box
        width="100%"
        h={54}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="linear-gradient(to right, #67092b, #67092b)"
      >
        <Flex gap={6} alignItems="center">
          <Text color="#fff" fontSize={14} fontWeight="medium">
            {intl.formatMessage(messages.mainText)}
          </Text>
          <a href={formUrl} target="_blank" style={{ textDecoration: 'none' }} rel="noreferrer">
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
