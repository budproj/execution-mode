import {
  Stack,
  Skeleton,
  Text,
  AspectRatio,
  Heading,
  SkeletonText,
  Flex,
  Divider,
  Button,
  Circle,
} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { IntlLink } from 'src/components/Base'
import { ArrowRightLong } from 'src/components/Icon'
import LinkedInIcon from 'src/components/Icon/LinkedIn'
import UserAvatar from 'src/components/User/Avatar'
import UserTeamTags from 'src/components/User/TeamTags'
import { User } from 'src/components/User/types'
import meAtom from 'src/state/recoil/user/me'
import selectUser from 'src/state/recoil/user/selector'

import messages from './messages'

export interface UserProfileCardProperties {
  userID?: User['id']
  redirectToProfile?: boolean
}

const UserProfileCard = ({ userID, redirectToProfile = false }: UserProfileCardProperties) => {
  const intl = useIntl()
  const user = useRecoilValue(selectUser(userID))
  const myID = useRecoilValue(meAtom)

  const isUserLoaded = Boolean(user)

  return (
    <Stack flexDirection="column" gridGap={2} p={4}>
      <Flex>
        <Stack direction="column" spacing={1} flexGrow={1}>
          <Skeleton isLoaded={isUserLoaded} {...buildSkeletonMinSize(isUserLoaded, 140, 21)}>
            <Heading fontSize="md" fontWeight={500} color="black.900" as="h3">
              {user?.nickname ?? user?.firstName}
            </Heading>
          </Skeleton>
          <Skeleton isLoaded={isUserLoaded} {...buildSkeletonMinSize(isUserLoaded, 100, 17)}>
            <Text color="gray.400" fontSize="xs">
              {user?.fullName}
            </Text>
          </Skeleton>
        </Stack>

        {user?.linkedInProfileAddress && (
          <Link href={user?.linkedInProfileAddress} target="_blank">
            <LinkedInIcon
              desc={intl.formatMessage(messages.linkedInIconDesc)}
              fill="gray.100"
              cursor="pointer"
              transition=".3s fill ease-out"
              _hover={{ fill: 'brand.500' }}
            />
          </Link>
        )}
      </Flex>

      <UserTeamTags userID={userID} max={2} isLoaded={isUserLoaded} />

      <AspectRatio ratio={1} maxW="full">
        <UserAvatar
          name={user?.fullName}
          src={user?.picture}
          size="2xl"
          w="full"
          h="full"
          position="absolute"
          bottomText={user?.role}
        />
      </AspectRatio>

      {(user?.about || !isUserLoaded) && (
        <Stack direction="column" spacing={1}>
          <Skeleton isLoaded={isUserLoaded} {...buildSkeletonMinSize(isUserLoaded, 100, 17)}>
            <Heading
              as="h4"
              fontSize="2xs"
              fontWeight={700}
              textTransform="uppercase"
              color="gray.300"
            >
              {intl.formatMessage(messages.aboutTitle, {
                nickname: user?.nickname ?? user?.firstName,
              })}
            </Heading>
          </Skeleton>

          <SkeletonText isLoaded={isUserLoaded}>
            <Text color="gray.500" fontSize="sm" noOfLines={5}>
              {user?.about}
            </Text>
          </SkeletonText>
        </Stack>
      )}
      {redirectToProfile && user?.id !== myID && (
        <Stack direction="column" spacing={0}>
          <Divider />
          <IntlLink href={`/profile/${user?.id ?? ''}`}>
            <Button
              color="brand.500"
              display="flex"
              p={0}
              _hover={{
                color: 'brand.400',
              }}
              rightIcon={
                <Circle border="1.5px solid" borderColor="currentColor" size={4}>
                  <ArrowRightLong
                    desc={intl.formatMessage(messages.arrowRightLongIconDesc)}
                    stroke="currentColor"
                    fill="currentColor"
                    fontSize="medium"
                    transform="scale(0.5)"
                  />
                </Circle>
              }
            >
              {intl.formatMessage(messages.redirectToUserProfileButtonText, {
                username: user?.firstName,
              })}
            </Button>
          </IntlLink>
        </Stack>
      )}
    </Stack>
  )
}

export default UserProfileCard
