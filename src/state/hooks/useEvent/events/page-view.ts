import { BaseEventData } from './base-event'

export interface PageViewEventData extends BaseEventData {
  pathname: string
}
