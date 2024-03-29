import React, { ChangeEvent, useState } from 'react'

import { ConfirmationDialogProperties } from '../Base/interface'
import { ConfirmationDialog } from '../Base/wrapper'

import { Description } from './description'

export interface KeywordBasedConfirmationProperties extends ConfirmationDialogProperties {
  keyword: string
  inputLabel?: string
}

export const KeywordBasedConfirmation = ({
  keyword,
  onConfirm,
  onClose,
  description,
  confirmationLabel,
  inputLabel,
  confirmButtonColorScheme,
  headerColorScheme,
  ...rest
}: KeywordBasedConfirmationProperties) => {
  const [isValidKeyword, setIsValidKeyword] = useState(false)

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const typedKeyword = event.target.value
    setIsValidKeyword(typedKeyword.toUpperCase() === keyword?.toUpperCase())
  }

  const handleConfirmation = () => {
    if (isValidKeyword) {
      onConfirm()
      onClose()
    }
  }

  return (
    <ConfirmationDialog
      confirmButtonColorScheme={confirmButtonColorScheme}
      headerColorScheme={headerColorScheme}
      descriptionComponent={
        <Description
          description={description}
          keyword={keyword}
          isValid={isValidKeyword}
          inputLabel={inputLabel}
          onChange={handleKeywordChange}
        />
      }
      confirmationLabel={confirmationLabel}
      onConfirm={handleConfirmation}
      onClose={onClose}
      {...rest}
    />
  )
}
