import { Flex, Text, Box, Divider } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { Button } from 'src/components/Base/Button'
import LastUpdateText from 'src/components/Base/LastUpdateText'
import KeyResultDynamicIcon from 'src/components/KeyResult/DynamicIcon'
import { UpdateIcon } from 'src/components/KeyResult/List/Body/Columns/KeyResult/update-icon'

interface NotificationKeyResultProperties {
  isKeyResultOutdated?: boolean
}

const NotificationKeyResult = ({ isKeyResultOutdated }: NotificationKeyResultProperties) => {
  const intl = useIntl()

  return (
    <>
      <Divider />
      <Flex padding="18px 0px">
        <Box marginRight="20px">
          <KeyResultDynamicIcon
            borderRadius="8px"
            boxSize="40px"
            title="Transformar o Bud em uma maquina do tempo!"
          />
        </Box>

        <Box flex="1">
          <Text fontWeight="500">Transformar o Bud em uma máquina do tempo!</Text>
          <Flex alignItems="center">
            <UpdateIcon isOutdated updateTextColor="gray.300" />
            <LastUpdateText prefix="Último check-in" date={new Date()} color="gray.300" />
          </Flex>
        </Box>
        <Box>
          {isKeyResultOutdated && (
            <Button backgroundColor="brand.50" padding="10px 15px" label="Fazer check-in" />
          )}
        </Box>
      </Flex>
    </>
  )
}

export default NotificationKeyResult
