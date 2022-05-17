import { CyclesListBodyColumnActionsProperties } from './Actions/actions'
import { CyclesListBodyColumnCadenceLevelProperties } from './CadenceLevel/cadence-level'
import { CyclesListBodyColumnCyclesProperties } from './Cycle/cycle'
import { CyclesListBodyColumnEndDateProperties } from './EndDate'
import { CyclesListBodyColumnInitialDateProperties } from './InitialDate'
import { CyclesListBodyColumnStatusProperties } from './Status/status'
import { CYCLE_LIST_COLUMN } from './constants'

export interface CyclesListBodyColumnProperties {
  [CYCLE_LIST_COLUMN.CYCLE]?: CyclesListBodyColumnCyclesProperties
  [CYCLE_LIST_COLUMN.INITIAL_DATE]?: CyclesListBodyColumnInitialDateProperties
  [CYCLE_LIST_COLUMN.END_DATE]?: CyclesListBodyColumnEndDateProperties
  [CYCLE_LIST_COLUMN.CADENCE_LEVEL]?: CyclesListBodyColumnCadenceLevelProperties
  [CYCLE_LIST_COLUMN.STATUS]?: CyclesListBodyColumnStatusProperties
  [CYCLE_LIST_COLUMN.ACTIONS]?: CyclesListBodyColumnActionsProperties
}
