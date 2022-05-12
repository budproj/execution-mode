import { Box, Flex, Heading, Text, Skeleton, Divider } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { Button } from 'src/components/Base/Button'
import PageContent from 'src/components/Base/PageContent'
import { RadioProgress } from 'src/components/Base/RadioProgress/wrapper'
import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import TeamTag from 'src/components/Team/Tag'
import { UserEditableAvatar } from 'src/components/User/EditableAvatar/wrapper'
import { User } from 'src/components/User/types'
import { GraphQLEffect } from 'src/components/types'
import { keyResultTypeAtom } from 'src/state/recoil/key-result'
import { KeyResultType } from 'src/state/recoil/key-result/key-result-type'

import messages from './messages'

interface DetailedHeaderProperties {
  userData: Partial<User> | undefined
  isUserLoading?: boolean
}

export const DetailedHeader = ({ userData, isUserLoading }: DetailedHeaderProperties) => {
  const keyResultType = useRecoilValue(keyResultTypeAtom)
  const setKeyResultType = useSetRecoilState(keyResultTypeAtom)

  const intl = useIntl()

  return (
    <PageContent
      paddingBottom="0"
      borderColor="new-gray.400"
      flex="unset"
      boxShadow="0px 6px 15px 0px rgb(217 226 246 / 35%)"
    >
      <Flex alignItems="center" justifyContent="space-between" paddingBottom={10}>
        <Flex alignItems="flex-start" gap="20px">
          <Skeleton isLoaded={!isUserLoading}>
            <UserEditableAvatar
              size="xl"
              isDisabled={userData?.policy?.update === GraphQLEffect.DENY}
              userID={userData?.id}
              name={userData?.fullName}
              picture={userData?.picture}
            />
          </Skeleton>

          <Flex direction="column" justifyContent="space-between">
            <Skeleton isLoaded={!isUserLoading} width="300px" height="25px" mb="0.4rem">
              <Heading as="h2" fontWeight={500} fontSize="1.5rem">
                {userData?.fullName}
              </Heading>
            </Skeleton>
            <Skeleton isLoaded={!isUserLoading} minWidth="100px" height="21px" mb="0.7rem">
              <Heading as="h3" color="gray.400" fontWeight={400} fontSize="1.23rem">
                {userData?.role}
              </Heading>
            </Skeleton>

            {userData?.teams && (
              <Box>
                {userData.teams?.edges
                  .map((edge) => edge.node)
                  .map((team) => (
                    <TeamTag key={team.id} mr={2} isLoading={isUserLoading}>
                      {team.name}
                    </TeamTag>
                  ))}
              </Box>
            )}
          </Flex>
        </Flex>
        <Flex>
          {userData?.yearlyProgress?.showProgress ? (
            <TooltipWithDelay
              label={intl.formatMessage(messages.yearlyProgressTooltip)}
              maxWidth="unset"
              placement="bottom-end"
            >
              <Flex direction="column">
                <RadioProgress
                  isIndeterminate={isUserLoading}
                  size="64px"
                  progress={userData?.yearlyProgress?.progress}
                  color="brand.500"
                  trackColor="brand.100"
                />
                <Skeleton isLoaded={!isUserLoading} width="64px" mt={1}>
                  <Text
                    color="new-gray.700"
                    fontWeight={700}
                    maxWidth="64px"
                    textAlign="center"
                    fontSize="0.85rem"
                  >
                    {intl.formatMessage(messages.yearlyProgress)}
                  </Text>
                </Skeleton>
              </Flex>
            </TooltipWithDelay>
          ) : undefined}

          {userData?.quarterlyProgress?.showProgress ? (
            <TooltipWithDelay
              label={intl.formatMessage(messages.quarterlyProgressTooltip)}
              maxWidth="unset"
              placement="bottom-end"
            >
              <Flex direction="column" ml="35px">
                <RadioProgress
                  isIndeterminate={isUserLoading}
                  size="64px"
                  progress={userData?.quarterlyProgress?.progress}
                  color="brand.500"
                  trackColor="brand.100"
                />
                <Skeleton isLoaded={!isUserLoading} width="64px" mt={1}>
                  <Text
                    color="new-gray.700"
                    fontWeight={700}
                    maxWidth="64px"
                    textAlign="center"
                    fontSize="0.85rem"
                  >
                    {intl.formatMessage(messages.quarterlyProgress)}
                  </Text>
                </Skeleton>
              </Flex>
            </TooltipWithDelay>
          ) : undefined}
        </Flex>
      </Flex>
      <Divider />
      <Flex>
        <Button
          padding="15px 30px"
          label="OKRs na Empresa"
          borderRadius="0"
          color={keyResultType === KeyResultType.COMPANY ? 'brand.500' : '#525F7F'}
          borderBottom={keyResultType === KeyResultType.COMPANY ? '2px solid #6F6EFF' : undefined}
          onClick={() => setKeyResultType(KeyResultType.COMPANY)}
        />

        <Button
          padding="15px 30px"
          label="OKRs Individuais"
          borderRadius="0"
          color={keyResultType === KeyResultType.PERSONAL ? 'brand.500' : '#525F7F'}
          borderBottom={keyResultType === KeyResultType.PERSONAL ? '2px solid #6F6EFF' : undefined}
          onClick={() => setKeyResultType(KeyResultType.PERSONAL)}
        />
      </Flex>
    </PageContent>
  )
}
