import difference from 'lodash/difference'
import { atomFamily, DefaultValue, selectorFamily } from 'recoil'

import { PREFIX } from './constants'
import { objectiveContext, ObjectiveMode, setObjectiveToMode } from './context'

type ExpandedIndex = number | number[]

export const objectiveAccordion = atomFamily<string[], string | undefined>({
  key: `${PREFIX}::ACCORDION`,
  default: [],
})

export const objectiveAccordionExpandedIndexes = selectorFamily<ExpandedIndex, string | undefined>({
  key: `${PREFIX}::ACCORDION_EXPANDED_INDEXES`,
  get:
    (id) =>
    ({ get }) => {
      const expandedModes = new Set([ObjectiveMode.VIEW, ObjectiveMode.EDIT])
      const accordionObjectiveIDs = get(objectiveAccordion(id))
      const accordionState = accordionObjectiveIDs.map((objectiveID) =>
        get(objectiveContext(objectiveID)),
      )

      return accordionState.flatMap((context, index) =>
        expandedModes.has(context.mode) ? index : [],
      )
    },
  set:
    (id) =>
    ({ get, set }, expandedIndexes) => {
      if (expandedIndexes instanceof DefaultValue) return

      const expandedIndexesAsArray = Array.isArray(expandedIndexes)
        ? expandedIndexes
        : [expandedIndexes]

      const accordionObjectiveIDs = get(objectiveAccordion(id))
      const expandedObjectiveIDs = expandedIndexesAsArray.map(
        (index) => accordionObjectiveIDs[index],
      )
      const collapsedObjectiveIDs = difference(accordionObjectiveIDs, expandedObjectiveIDs)

      const setObjectiveToViewMode = setObjectiveToMode(ObjectiveMode.VIEW)
      const setObjectiveToCollapsedMode = setObjectiveToMode(ObjectiveMode.COLLAPSED)

      expandedObjectiveIDs.map((objectiveID) => set(setObjectiveToViewMode, objectiveID))
      collapsedObjectiveIDs.map((objectiveID) => set(setObjectiveToCollapsedMode, objectiveID))
    },
})
