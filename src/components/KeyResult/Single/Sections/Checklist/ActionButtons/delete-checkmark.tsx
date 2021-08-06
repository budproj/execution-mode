import React from 'react'

interface DeleteCheckMarkButtonProperties {
  keyResultID?: string
  refresh?: () => void
  isVisible?: boolean
}

export const DeleteCheckMarkButton = ({
  keyResultID,
  refresh,
  isVisible,
}: DeleteCheckMarkButtonProperties) => {
  isVisible ??= true

  // eslint-disable-next-line unicorn/no-null
  return isVisible ? <p>Ok</p> : null
}
