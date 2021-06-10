import { Button } from '@chakra-ui/button'
import { Stack, Text } from '@chakra-ui/layout'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  Heading,
  Image,
} from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

interface ConfirmationDialogProperties {
  isOpen: boolean
  onClose: () => void
  type: string
  keyword?: string
  dangerousAction?: boolean
  description?: string
}

export const ConfirmationDialog = ({
  isOpen,
  onClose,
  type,
  keyword,
  dangerousAction,
  description,
}: ConfirmationDialogProperties) => {
  const [isDangerousDialogOpen, setIsDangerousDialogOpen] = useState(false)
  const intl = useIntl()
  const cancelReference = useRef<any>()
  const dangerousDialogCancelReference = useRef<any>()

  keyword ??= intl.formatMessage(messages.defaultKeyword)

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelReference} size="2xl" onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent px={8} py={16}>
          <Stack alignItems="center" spacing={8}>
            <Image src="/images/bud-trash-bin.png" />

            <Heading
              as="h2"
              color="gray.500"
              fontWeight={500}
              fontSize="2xl"
              textAlign="center"
              px={8}
            >
              {intl.formatMessage(messages.firstDialogTitle, {
                type,
              })}
            </Heading>
            {description && (
              <Text textAlign="center" fontWeight={400} color="gray.400" fontSize="lg" px={16}>
                {description}
              </Text>
            )}

            <Stack spacing={2} w="full">
              <Button
                variant="solid"
                colorScheme="red"
                bg="red.500"
                color="white"
                _hover={{
                  bg: 'red.400',
                }}
              >
                {intl.formatMessage(messages.dialogConfirmationButton, {
                  type,
                })}
              </Button>
              <Button variant="text" colorScheme="brand" onClick={onClose}>
                {intl.formatMessage(messages.dialogCancelButton)}
              </Button>
            </Stack>
          </Stack>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
