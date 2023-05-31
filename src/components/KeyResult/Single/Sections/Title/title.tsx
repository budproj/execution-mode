import { Button, Flex, HStack, Skeleton, SkeletonText, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'

import LastUpdateText from 'src/components/Base/LastUpdateText'
import { KeyResultDynamicIcon } from 'src/components/KeyResult'
import { KeyResult } from 'src/components/KeyResult/types'
import { Objective } from 'src/components/Objective/types'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import selectLatestCheckIn from 'src/state/recoil/key-result/check-in/latest'
import { isEditingKeyResultIDAtom } from 'src/state/recoil/key-result/drawers/editing/is-editing-key-result-id'
import { keyResultInsertDrawerObjectiveID } from 'src/state/recoil/key-result/drawers/insert/objective-id'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'

import KrDrawerTitleActions from './actions'
import messages from './messages'

export interface KeyResultSectionTitleProperties {
  keyResultID?: KeyResult['id']
  isDraft?: boolean
  objective?: Objective
}

const KeyResultSectionTitle = ({
  keyResultID,
  isDraft,
  objective,
}: KeyResultSectionTitleProperties) => {
  const keyResult = useRecoilValue(keyResultAtomFamily(keyResultID))
  const latestCheckIn = useRecoilValue(selectLatestCheckIn(keyResultID))
  const intl = useIntl()
  const setKeyResultInsertDrawerObjectiveID = useSetRecoilState(keyResultInsertDrawerObjectiveID)
  const isEditingKeyResultId = useSetRecoilState(isEditingKeyResultIDAtom)

  const [teste, aaaa] = useRecoilState(keyResultInsertDrawerObjectiveID)

  console.log({ teste, aaaa })

  const resetOpenDrawer = useResetRecoilState(keyResultReadDrawerOpenedKeyResultID)

  const onDeleteKeyResult = () => resetOpenDrawer()

  const handleEditClick = () => {
    setKeyResultInsertDrawerObjectiveID(objective?.id)
    isEditingKeyResultId(keyResult?.id)
    resetOpenDrawer()
  }

  const isLoaded = Boolean(keyResult)
  const lastUpdateDate = latestCheckIn?.createdAt ? new Date(latestCheckIn.createdAt) : undefined
  const isActive = keyResult?.status?.isActive
  const isOutdated = keyResult?.status?.isOutdated && isActive

  return (
    <Stack
      display="flex"
      spacing={0}
      position="relative"
      justifyContent="space-between"
      direction="row"
    >
      <Flex gridGap={4} alignItems="center" justifyContent="space-between" width="100%">
        <Skeleton borderRadius={10} isLoaded={isLoaded}>
          <KeyResultDynamicIcon
            title={keyResult?.title}
            iconSize={7}
            boxSize={12}
            borderRadius={8}
            isDisabled={Boolean(!isActive || isDraft)}
          />
        </Skeleton>
        <Stack spacing={0} flexGrow={1}>
          <HStack>
            <Stack direction="row">
              <Skeleton isLoaded={isLoaded} flexGrow={1}>
                <Text fontSize="lg" fontWeight={700} p={0} as="h1" maxW={260}>
                  {keyResult?.title}
                </Text>
              </Skeleton>
            </Stack>
          </HStack>

          <SkeletonText
            noOfLines={2}
            minW="100%"
            mt={isLoaded ? 'inherit' : '4px'}
            isLoaded={isLoaded}
          >
            {!isDraft && (
              <LastUpdateText
                fontSize="sm"
                ml="2px"
                date={lastUpdateDate}
                color={isOutdated ? 'red.500' : 'gray.400'}
                prefix={intl.formatMessage(messages.lastUpdateTextPrefix)}
              />
            )}
          </SkeletonText>
        </Stack>
      </Flex>
      <Flex alignItems="center" gap={4}>
        <Button
          bg="new-gray.300"
          borderRadius={4}
          p="10px"
          color="new-gray.800"
          fontSize={14}
          fontWeight="medium"
          onClick={handleEditClick}
        >
          Editar
        </Button>
        <KrDrawerTitleActions keyResult={keyResult} onDelete={onDeleteKeyResult} />
      </Flex>
    </Stack>
  )
}

export default KeyResultSectionTitle
