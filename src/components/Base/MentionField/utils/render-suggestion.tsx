import React from 'react'
import { SuggestionDataItem } from 'react-mentions'

import { NamedAvatar } from 'src/components/User'

export const renderSuggestion = (suggestion: SuggestionDataItem) => (
  <div>
    <NamedAvatar
      canHover
      nameColor="black.900"
      subtitleType="role"
      userID={suggestion.id.toString()}
    />
  </div>
)
