import { Box, CloseButton, Collapse, Flex, Text } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'

import messages from './messages'

const storageKey = 'Bud@notices'

const NoticesBanner = () => {
  const { get, register } = useLocalStorage()
  const intl = useIntl()
  const { dispatch: learnMoreClick } = useEvent(EventType.LEARN_MORE_BANNER_NOTICES_CLICK)

  const router = useRouter()

  const userID = useRecoilValue(meAtom)
  const user = useRecoilValue(selectUser(userID))

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
    router.push(`/explore/${user?.companies?.edges[0]?.node.id ?? ''}`)
  }, [learnMoreClick, router, user?.companies?.edges])

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
        bg="linear-gradient(to right,  #BF4950, #FF616A, #FF8188)"
      >
        <Flex gap={6} alignItems="center">
          <Text color="white" fontSize={14} fontWeight="medium">
            {intl.formatMessage(messages.maintenanceNoticeMessageBanner)}
          </Text>
        </Flex>
        <CloseButton
          position="absolute"
          right={4}
          fontSize={14}
          color="white"
          onClick={handleCloseBanner}
        />
      </Box>
    </Collapse>
  )
}

export default NoticesBanner
