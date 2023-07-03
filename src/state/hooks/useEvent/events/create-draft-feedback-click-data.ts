import { COMMENT_TYPE } from 'src/components/KeyResult/constants'

import { BaseEventData } from './base-event'

export interface CreateDraftFeedbackClickData extends BaseEventData {
  type: COMMENT_TYPE
}
