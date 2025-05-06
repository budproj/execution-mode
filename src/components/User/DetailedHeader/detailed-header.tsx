import { Box, Flex, Heading, Text, Skeleton, Button, Divider } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import PageContent from 'src/components/Base/PageContent'
import { RadioProgress } from 'src/components/Base/RadioProgress/wrapper'
import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import TeamTag from 'src/components/Team/Tag'
import { UserEditableAvatar } from 'src/components/User/EditableAvatar/wrapper'
import { User } from 'src/components/User/types'
import { GraphQLEffect } from 'src/components/types'
import { AUTHZ_ROLES } from 'src/state/recoil/authz/constants'
import { keyResultTypeAtom } from 'src/state/recoil/key-result'
import { KeyResultType } from 'src/state/recoil/key-result/key-result-type'
import meAtom from 'src/state/recoil/user/me'

import { useGetUserAuthzRole } from '../hooks/getUserAuthzRole/get-user-authz-role'

import { companyPreposition } from './constants'
import messages from './messages'

interface DetailedHeaderProperties {
  userData: Partial<User> | undefined
  isUserLoading?: boolean
}

export const DetailedHeader = ({ userData, isUserLoading }: DetailedHeaderProperties) => {
  const keyResultType = useRecoilValue(keyResultTypeAtom)
  const setKeyResultType = useSetRecoilState(keyResultTypeAtom)

  const myID = useRecoilValue(meAtom)
  const { data: userAuthzRole, loading: loadingAuthzRole } = useGetUserAuthzRole(myID)

  const hasUserPermissionToSeeOthersPDIs =
    userData?.id === myID ||
    ([AUTHZ_ROLES.ADMIN, AUTHZ_ROLES.LEADER].includes(userAuthzRole?.name as AUTHZ_ROLES) &&
      !loadingAuthzRole)

  const intl = useIntl()

  const companyName = userData?.companies?.edges[0].node.name ?? ''

  return (
    <PageContent
      paddingBottom="0"
      borderColor="new-gray.400"
      flex="unset"
      boxShadow="0px 0px 50px rgba(83, 83, 191, 0.1)"
      borderBottom="1px solid #D9E2F6"
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
        {keyResultType === KeyResultType.COMPANY && (
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
        )}
        {keyResultType === KeyResultType.PERSONAL && (
          <Flex width="64px" height="101px" bg="transparent" />
        )}
      </Flex>
      <Divider />
      <Flex>
        <Button
          h="auto"
          padding="15px 30px"
          fontSize="16px"
          borderRadius="0"
          color={keyResultType === KeyResultType.COMPANY ? 'brand.500' : '#525F7F'}
          borderBottom={keyResultType === KeyResultType.COMPANY ? '2px solid #6F6EFF' : undefined}
          _hover={{
            color: keyResultType === KeyResultType.COMPANY ? 'brand.300' : 'new-gray.700',
            borderBottom: keyResultType === KeyResultType.COMPANY ? '2px solid #A9A8FF' : undefined,
          }}
          onClick={() => setKeyResultType(KeyResultType.COMPANY)}
        >
          {companyName ? (
            intl.formatMessage(messages.companyOKRTitle, {
              company: companyName,
              companypreposition: companyPreposition(userData?.companies?.edges[0].node.gender),
            })
          ) : (
            <Skeleton isLoaded={false} width="100px" height="20px" />
          )}
        </Button>

        <Button
          h="auto"
          display={hasUserPermissionToSeeOthersPDIs ? 'default' : 'none'}
          padding="18px 30px"
          fontSize="16px"
          borderRadius="0"
          color={keyResultType === KeyResultType.PERSONAL ? 'brand.500' : '#525F7F'}
          borderBottom={keyResultType === KeyResultType.PERSONAL ? '2px solid #6F6EFF' : undefined}
          _hover={{
            color: keyResultType === KeyResultType.PERSONAL ? 'brand.300' : 'new-gray.700',
            borderBottom:
              keyResultType === KeyResultType.PERSONAL ? '2px solid #A9A8FF' : undefined,
          }}
          onClick={() => setKeyResultType(KeyResultType.PERSONAL)}
        >
          {intl.formatMessage(messages.individualOKRTitle)}
        </Button>
      </Flex>
    </PageContent>
  )
}
