import { useMutation } from '@apollo/client'
import { Box, Divider, Flex, SkeletonText, Spinner } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { EditableTextAreaValue } from 'src/components/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import { GraphQLEffect } from 'src/components/types'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

import { KeyResultSectionHeading } from '../Heading/wrapper'

import messages from './messages'
import queries from './queries.gql'

export interface KeyResultSectionDescriptionProperties {
  keyResultID?: KeyResult['id']
  isLoading?: boolean
}

interface UpdateKeyResultDescriptionMutationResult {
  updateKeyResult: KeyResult
}

const KeyResultSectionDescription = ({
  keyResultID,
  isLoading,
}: KeyResultSectionDescriptionProperties) => {
  const intl = useIntl()
  const [keyResult, setKeyResult] = useRecoilState(keyResultAtomFamily(keyResultID))
  const [updateKeyResult, { loading }] = useMutation<UpdateKeyResultDescriptionMutationResult>(
    queries.UPDATE_KEY_RESULT_DESCRIPTION,
  )

  const handleSubmit = async (description?: string) => {
    if (description === keyResult?.description) return

    await updateKeyResult({
      variables: {
        description,
        id: keyResultID,
      },
    })

    setKeyResult({
      ...keyResult,
      description,
    })
  }

  const hasData = Boolean(keyResult?.description)
  const canUpdate = keyResult?.policy?.update === GraphQLEffect.ALLOW
  isLoading ??= hasData

  return hasData || isLoading || canUpdate ? (
    <>
      <Flex gridGap={2} direction="column">
        <KeyResultSectionHeading>{intl.formatMessage(messages.label)}</KeyResultSectionHeading>
        <Flex alignItems="center" gridGap={2}>
          <SkeletonText isLoaded={!isLoading} noOfLines={5} spacing={2} w="100%">
            <EditableTextAreaValue
              isTruncated
              value={keyResult?.description}
              customFallbackValue={intl.formatMessage(messages.emptyStateMessage)}
              isLoaded={!isLoading}
              isSubmitting={loading}
              fontSize="md"
              color="black.800"
              maxCharacters={500}
              isDisabled={!canUpdate}
              onSave={handleSubmit}
            />
          </SkeletonText>
          {loading && (
            <Box pt={2}>
              <Spinner color="brand.400" />
            </Box>
          )}
        </Flex>
      </Flex>

      <Divider borderColor="gray.100" />
    </>
  ) : // eslint-disable-next-line unicorn/no-null
  null
}

export default KeyResultSectionDescription
