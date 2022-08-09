import { IconButton, Flex } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import SettingslIcon from 'src/components/Icon/Settings'

import TooltipWithDelay from '../TooltipWithDelay'

import messages from './messages'

const EditTeamButton = ({ ...rest }) => {
  const intl = useIntl()

  return (
    <TooltipWithDelay label={intl.formatMessage(messages.editTeamButtonTooltip)}>
      <Flex
        background="new-gray.300"
        alignItems="center"
        justifyContent="center"
        _hover={{ background: 'new-gray.400', color: 'new-gray.800' }}
        borderRadius="4px"
        {...rest}
      >
        <IconButton
          aria-label="tas"
          icon={
            <SettingslIcon
              fill="gray.500"
              w={5}
              h="auto"
              desc={intl.formatMessage(messages.editTeamButtonIconDesc)}
            />
          }
          borderRadius="full"
        />
      </Flex>
    </TooltipWithDelay>
  )
}

export default EditTeamButton
