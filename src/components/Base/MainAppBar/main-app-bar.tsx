import { Flex } from '@chakra-ui/react'
import Link from 'next/link'
import React, { ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'

import Logotype from 'src/components/Base/Logotype'

import MainAppBarHelperButtons from './HelperButtons'
import MainAppBarMenuItem from './MenuItem'
import TeamHoverMenu from './TeamHoverMenu'
import MainAppBarUserMenu from './UserMenu'
import { RIGHT_WING_GRID_GAP } from './constants'
import messages from './messages'

export type MainAppBarVariant = 'default' | 'onlyLogotype'

export interface MainAppBarProperties {
  variant: MainAppBarVariant
}

const MainAppBar = ({ variant }: MainAppBarProperties): ReactElement => {
  const intl = useIntl()
  // Const { isOpen, onOpen, onClose } = useDisclosure()

  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <Flex
      px={6}
      py={4}
      borderBottom={1}
      gridGap={10}
      borderColor="black.200"
      borderStyle="solid"
      alignItems="center"
      justifyContent="center"
    >
      <Link passHref href="/">
        <Logotype />
      </Link>
      {variant !== 'onlyLogotype' && (
        <>
          <Flex gridGap={20} flexGrow={1}>
            <MainAppBarMenuItem label={intl.formatMessage(messages.firstMenuItem)} href="/" />
            <MainAppBarMenuItem
              label={intl.formatMessage(messages.secondMenuItem)}
              href="/my-things"
            />
            <Flex
              marginTop="-24px"
              marginBottom="-24px"
              alignItems="center"
              justifyContent="center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <MainAppBarMenuItem
                label={intl.formatMessage(messages.thirdMenuItem)}
                href="/explore"
              />
            </Flex>
          </Flex>
          <TeamHoverMenu
            isHovered={isHovered}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />

          <Flex
            justifySelf="flex-end"
            display="flex"
            alignItems="center"
            gridGap={RIGHT_WING_GRID_GAP}
          >
            <MainAppBarHelperButtons />
            <MainAppBarUserMenu />
          </Flex>
        </>
      )}
    </Flex>
  )
}

MainAppBar.defaultProps = {
  variant: 'default',
}

export default MainAppBar
