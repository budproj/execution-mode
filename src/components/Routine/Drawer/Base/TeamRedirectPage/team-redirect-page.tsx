import { Box, Button, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import { ArrowRight } from 'src/components/Icon'

import RoutineDrawer from '../drawer'

import messages from './messages'

const TeamRedirectPage = () => {
  const [isOpen, setIsOpen] = useState(true)
  const intl = useIntl()

  return (
    <RoutineDrawer isOpen={isOpen} formSize={1} onClose={() => setIsOpen(false)}>
      <Box>
        <Text color="new-gray.700" fontSize={18} whiteSpace="pre-line">
          {intl.formatMessage(messages.callToActionPageDescription, {
            title: (
              <strong style={{ color: '#364059', fontSize: '21px' }}>
                {intl.formatMessage(messages.title)}
              </strong>
            ),
          })}
        </Text>
        <Button
          mt={12}
          fontSize={18}
          fontWeight="medium"
          color="#525F7F"
          p={3}
          outline="2px solid #B5C0DB"
          rightIcon={<ArrowRight ml={2} fill="current" fontSize="12px" desc="da" />}
        >
          Produto
        </Button>
      </Box>
    </RoutineDrawer>
  )
}

export default TeamRedirectPage
