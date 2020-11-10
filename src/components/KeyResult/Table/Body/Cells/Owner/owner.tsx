import { Avatar, Box, Popover, styled, TableCell, Typography } from '@material-ui/core'
import React, { ReactElement, useState, MouseEvent } from 'react'
import { useRecoilValue } from 'recoil'

import grid from 'components/KeyResult/Table/grid'
import { KeyResult } from 'components/KeyResult/types'
import { keyResult as keyResultAtom } from 'state/recoil/key-results/key-result'

import Skeleton, { SkeletonPicture } from './skeleton'

export interface OwnerProps {
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

const Owner = ({ id }: OwnerProps): ReactElement => {
  const selectedKeyResult = useRecoilValue<KeyResult | undefined>(keyResultAtom(id))
  const [profileCardAnchorElement, setProfileCardAnchorElement] = useState<HTMLDivElement | null>(
    null,
  )
  const [wasAvatarLoaded, setWasAvatarLoaded] = useState<boolean>(false)

  const isProfileCardOpen = Boolean(profileCardAnchorElement)

  const handleOpenProfileCard = (event: MouseEvent<HTMLDivElement>): void => {
    setProfileCardAnchorElement(event.currentTarget)
  }

  const handleCloseProfileCard = (): void => {
    setProfileCardAnchorElement(null)
  }

  const handleAvatarLoad = (): void => {
    setWasAvatarLoaded(true)
  }

  return selectedKeyResult ? (
    <TableCell width={grid.owner}>
      <Box display="flex" justifyContent="flex-end">
        <Box onMouseEnter={handleOpenProfileCard} onMouseLeave={handleCloseProfileCard}>
          {!wasAvatarLoaded && selectedKeyResult.owner.picture && (
            <SkeletonPicture style={{ position: 'absolute' }} />
          )}
          <Avatar
            alt={selectedKeyResult.owner.name}
            src={selectedKeyResult.owner.picture}
            onLoad={handleAvatarLoad}
          >
            {selectedKeyResult.owner.name[0]}
          </Avatar>
        </Box>

        <Popover
          disableRestoreFocus
          id={selectedKeyResult.owner.id}
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
            {!wasAvatarLoaded && selectedKeyResult.owner.picture && (
              <SkeletonPicture
                style={{ position: 'absolute', borderRadius: 4 }}
                width={195}
                height={150}
              />
            )}
            <StyledBigAvatar
              alt={selectedKeyResult.owner.name}
              src={selectedKeyResult.owner.picture}
              variant="square"
              onLoad={handleAvatarLoad}
            >
              {selectedKeyResult.owner.name[0]}
            </StyledBigAvatar>

            <Box>
              <StyledName variant="body1">{selectedKeyResult.owner.name}</StyledName>
              <StyledRole variant="body1">{selectedKeyResult.owner.role}</StyledRole>
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
