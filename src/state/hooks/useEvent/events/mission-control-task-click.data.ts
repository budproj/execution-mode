import { TASK_TEMPLATE } from 'src/components/MissionControl/Tasks/hooks/use-get-mission-control-tasks-config'

import { BaseEventData } from './base-event'

export interface MissionControlTaskClickData extends BaseEventData {
  type: TASK_TEMPLATE
}
