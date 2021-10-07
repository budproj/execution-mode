import React, { ChangeEvent, useState } from 'react'

import { ConfirmationDialogProperties } from '../Base/interface'
import { ConfirmationDialog } from '../Base/wrapper'

import { Description } from './description'

interface KeywordBasedConfirmationProperties extends ConfirmationDialogProperties {
  description: string
  keyword: string
}

export const KeywordBasedConfirmation = ({
  keyword,
  onConfirm,
  onClose,
  description,
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
      descriptionComponent={
        <Description
          description={description}
          keyword={keyword}
          isValid={isValidKeyword}
          onChange={handleKeywordChange}
        />
      }
      onConfirm={handleConfirmation}
      onClose={onClose}
      {...rest}
    />
  )
}
