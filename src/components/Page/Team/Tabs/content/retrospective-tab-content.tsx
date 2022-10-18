import { Box, Button, Flex, Link, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { CircleArrowRight } from 'src/components/Icon'
import { routineDrawerOpened } from 'src/state/recoil/routine/opened-routine-drawer'

import messages from './messages'

const RetrospectiveTabContent = () => {
  const intl = useIntl()
  const setIsRoutineDrawerOpen = useSetRecoilState(routineDrawerOpened)

  return (
    <Stack spacing={10}>
      <Flex alignItems="center" justifyContent="space-between">
        <Stack direction="column" spacing={1}>
          <Text fontSize={28} fontWeight="medium" color="new-gray.800">
            {intl.formatMessage(messages.tabRetrospectivePageTitle)}
          </Text>
          <Text
            fontSize={14}
            color="new-gray.600"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {intl.formatMessage(messages.tabRetrospectivePageDescription, {
              link: (
                <Link
                  isExternal
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  ml={1}
                  gap={1}
                  href="#"
                  verticalAlign="middle"
                >
                  {intl.formatMessage(messages.learnMoreRetrospectiveMessage)}
                  <CircleArrowRight
                    alignContent="center"
                    desc={intl.formatMessage(messages.learnMoreRetrospectiveIcon)}
                  />
                </Link>
              ),
            })}
          </Text>
        </Stack>
        <Button
          bg="brand.500"
          color="black.50"
          _hover={{ background: 'brand.400', color: 'black.50' }}
          onClick={() => {
            setIsRoutineDrawerOpen(() => true)
          }}
        >
          {intl.formatMessage(messages.tabRetrospectiveAnswerButton)}
        </Button>
      </Flex>
      <Box w="100%" height="50vh" bg="white" borderRadius={15} />
    </Stack>
  )
}

export default RetrospectiveTabContent
