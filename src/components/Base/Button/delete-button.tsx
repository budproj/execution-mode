import { IconButton } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

import TrashIcon from 'src/components/Icon/Trash'

interface DeleteButtonProperties {
  onDelete?: () => void
  isVisible?: boolean
  canDelete?: boolean
  className?: string
  description?: string
}

const StyledTrashIcon = styled(TrashIcon)`
  &:hover path {
    fill: white;
  }

  &:hover rect {
    fill: #ff616a;
  }
`

export const DeleteButton = ({
  onDelete,
  isVisible = true,
  canDelete,
  description = '',
  ...rest
}: DeleteButtonProperties) => {
  const handleDelete = async () => {
    if (onDelete) {
      onDelete()
    }
  }

  return canDelete ? (
    <IconButton
      aria-label={description}
      opacity={isVisible ? 1 : 0}
      icon={<StyledTrashIcon h="2em" w="2em" desc={description} />}
      onClick={handleDelete}
      {...rest}
    />
  ) : // eslint-disable-next-line unicorn/no-null
  null
}
