import { Avatar, Box, Popover, styled, TableCell, Typography } from '@material-ui/core'
import React, { ReactElement, useState, MouseEvent } from 'react'
import { useRecoilValue } from 'recoil'

import grid from 'components/KeyResult/Table/grid'
import { KeyResult } from 'components/KeyResult/types'
import { keyResultOwner } from 'state/recoil/key-results/single/owner'

import Skeleton, { SkeletonPicture } from './skeleton'

export interface OwnerProperties {
  id: KeyResult['id']
}

const StyledName = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
}))

const StyledRole = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
}))

const StyledBigAvatar = styled(Avatar)({
  width: '100%',
  height: 150,
  borderRadius: 4,
})

const Owner = ({ id }: OwnerProperties): ReactElement => {
  const owner = useRecoilValue<KeyResult['owner'] | undefined>(keyResultOwner(id))
  const [profileCardAnchorElement, setProfileCardAnchorElement] = useState<
    HTMLDivElement | undefined
  >()
  const [wasAvatarLoaded, setWasAvatarLoaded] = useState<boolean>(false)

  const isProfileCardOpen = Boolean(profileCardAnchorElement)

  const handleOpenProfileCard = (event: MouseEvent<HTMLDivElement>): void => {
    setProfileCardAnchorElement(event.currentTarget)
  }

  const handleCloseProfileCard = (): void => {
    setProfileCardAnchorElement()
  }

  const handleAvatarLoad = (): void => {
    setWasAvatarLoaded(true)
  }

  return owner ? (
    <TableCell width={grid.owner}>
      <Box display="flex" justifyContent="flex-end">
        <Box onMouseEnter={handleOpenProfileCard} onMouseLeave={handleCloseProfileCard}>
          {!wasAvatarLoaded && owner.picture && (
            <SkeletonPicture style={{ position: 'absolute' }} />
          )}
          <Avatar alt={owner.name} src={owner.picture} onLoad={handleAvatarLoad}>
            {owner.name[0]}
          </Avatar>
        </Box>

        <Popover
          disableRestoreFocus
          id={owner.id}
          open={isProfileCardOpen}
          anchorEl={profileCardAnchorElement}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          style={{
            pointerEvents: 'none',
          }}
          onClose={handleCloseProfileCard}
        >
          <Box py={1} px={1} display="flex" flexDirection="column" gridGap={10} width={215}>
            {!wasAvatarLoaded && owner.picture && (
              <SkeletonPicture
                style={{ position: 'absolute', borderRadius: 4 }}
                width={195}
                height={150}
              />
            )}
            <StyledBigAvatar
              alt={owner.name}
              src={owner.picture}
              variant="square"
              onLoad={handleAvatarLoad}
            >
              {owner.name[0]}
            </StyledBigAvatar>

            <Box>
              <StyledName variant="body1">{owner.name}</StyledName>
              <StyledRole variant="body1">{owner.role}</StyledRole>
            </Box>
          </Box>
        </Popover>
      </Box>
    </TableCell>
  ) : (
    <Skeleton />
  )
}

export default Owner
