import { Box, Button, CloseButton, Collapse, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import useLocalStorage from 'src/state/hooks/useLocalStorage/hook'

import { myselfAtom } from '../../../state/recoil/shared/atoms'

import messages from './messages'

const storageKey = 'Bud@new-feature.spotlight'

const NoticesBanner = () => {
  const { get, register } = useLocalStorage()
  const intl = useIntl()
  const { dispatch: learnMoreClick } = useEvent(EventType.LEARN_MORE_BANNER_NOTICES_CLICK)

  const router = useRouter()

  const myself = useRecoilValue(myselfAtom)

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

  const handleRedirect = useCallback(() => {
    learnMoreClick({})
    router.push(`/explore/${myself?.companies?.edges[0]?.node.id ?? ''}`)
  }, [learnMoreClick, router, myself?.companies?.edges])

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
            {intl.formatMessage(messages.learMoreAboutRetrospectiveMessageBanner)}
          </Text>
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
            onClick={handleRedirect}
          >
            {intl.formatMessage(messages.learMoreActionButton)}
          </Button>
        </Flex>
        <CloseButton position="absolute" right={4} color="brand.50" onClick={handleCloseBanner} />
      </Box>
    </Collapse>
  )
}

export default NoticesBanner
