import { BaseEventData } from './base-event'

export interface SendAnswerFormClickData extends BaseEventData {
  feeling: string
  productivity: string
  roadBlock: string
}
