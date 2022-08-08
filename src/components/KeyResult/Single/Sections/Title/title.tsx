import { useMutation } from '@apollo/client'
import { Box, Flex, Skeleton, SkeletonText, Spinner, Stack } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

import EditableInputValue from 'src/components/Base/EditableInputValue'
import LastUpdateText from 'src/components/Base/LastUpdateText'
import { KeyResultDynamicIcon } from 'src/components/KeyResult'
import { KeyResult } from 'src/components/KeyResult/types'
import { GraphQLEffect } from 'src/components/types'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import selectLatestCheckIn from 'src/state/recoil/key-result/check-in/latest'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'

import KrDrawerTitleActions from './actions'
import messages from './messages'
import queries from './queries.gql'

export interface KeyResultSectionTitleProperties {
  keyResultID?: KeyResult['id']
}

interface UpdateKeyResultTitleMutationResult {
  updateKeyResult: KeyResult
}

const KeyResultSectionTitle = ({ keyResultID }: KeyResultSectionTitleProperties) => {
  const [keyResult, setKeyResult] = useRecoilState(keyResultAtomFamily(keyResultID))
  const latestCheckIn = useRecoilValue(selectLatestCheckIn(keyResultID))
  const intl = useIntl()

  const [updateKeyResult, { loading }] = useMutation<UpdateKeyResultTitleMutationResult>(
    queries.UPDATE_KEY_RESULT_TITLE,
  )

  const resetOpenDrawer = useResetRecoilState(keyResultReadDrawerOpenedKeyResultID)

  const onDeleteKeyResult = () => resetOpenDrawer()

  const isLoaded = Boolean(keyResult)
  const lastUpdateDate = latestCheckIn?.createdAt ? new Date(latestCheckIn.createdAt) : undefined
  const isActive = keyResult?.status?.isActive
  const isOutdated = keyResult?.status?.isOutdated && isActive
  const canUpdate = keyResult?.policy?.update === GraphQLEffect.ALLOW && isActive

  const handleSubmit = async (title: string) => {
    if (title === keyResult?.title) return

    await updateKeyResult({
      variables: {
        title,
        id: keyResultID,
      },
    })

    setKeyResult({
      ...keyResult,
      title,
    })
  }

  return (
    <Stack
      display="flex"
      spacing={0}
      position="relative"
      justifyContent="space-between"
      direction="row"
    >
      <Flex gridGap={4} alignItems="flex-start" justifyContent="space-between" width="100%">
        <Skeleton borderRadius={10} isLoaded={isLoaded}>
          <KeyResultDynamicIcon
            title={keyResult?.title}
            iconSize={7}
            boxSize={12}
            borderRadius={8}
            isDisabled={!isActive}
          />
        </Skeleton>
        <Stack spacing={0} flexGrow={1}>
          <Stack direction="row">
            <Skeleton isLoaded={isLoaded} flexGrow={1}>
              <EditableInputValue
                value={keyResult?.title}
                isLoaded={isLoaded}
                isSubmitting={loading}
                isDisabled={!canUpdate}
                maxCharacters={120}
                previewProperties={{
                  fontSize: 'lg',
                  fontWeight: 700,
                  p: 0,
                  as: 'h1',
                }}
                onSubmit={handleSubmit}
              />
            </Skeleton>
            {loading && (
              <Box pt={2}>
                <Spinner color="brand.400" />
              </Box>
            )}
          </Stack>

          <SkeletonText
            noOfLines={2}
            minW="100%"
            mt={isLoaded ? 'inherit' : '4px'}
            isLoaded={isLoaded}
          >
            <LastUpdateText
              fontSize="sm"
              ml="2px"
              date={lastUpdateDate}
              color={isOutdated ? 'red.500' : 'gray.400'}
              prefix={intl.formatMessage(messages.lastUpdateTextPrefix)}
            />
          </SkeletonText>
        </Stack>
      </Flex>
      <Flex alignItems="center">
        <KrDrawerTitleActions keyResult={keyResult} onDelete={onDeleteKeyResult} />
      </Flex>
    </Stack>
  )
}

export default KeyResultSectionTitle
