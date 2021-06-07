import { atomFamily, DefaultValue, selectorFamily } from 'recoil'

import { Objective } from '../../../components/Objective/types'

import { PREFIX } from './constants'

export enum AccordionEntryMode {
  COLLAPSED = 'collapsed',
  VIEW = 'view',
  EDIT = 'edit',
}

export const buildDefaultAccordionStateFromObjectives = (
  objectives: Objective[] = [],
): AccordionEntryMode[] => objectives.map(() => AccordionEntryMode.COLLAPSED)

export const objectiveAccordionEntryModes = atomFamily<AccordionEntryMode[], string | undefined>({
  key: `${PREFIX}::ACCORDION_ENTRY_MODES`,
  default: buildDefaultAccordionStateFromObjectives(),
})

export const objectiveAccordionExpandedEntries = selectorFamily<
  number | number[],
  string | undefined
>({
  key: `${PREFIX}::ACCORDION_EXPANDED_ENTRIES`,
  get:
    (id) =>
    ({ get }) => {
      const accordionEntries = get(objectiveAccordionEntryModes(id))
      return accordionEntries
        .map((entryState, index) => (entryState === AccordionEntryMode.COLLAPSED ? -1 : index))
        .filter((entryIndex) => entryIndex !== -1)
    },
  set:
    (id) =>
    ({ get, set }, indexes) => {
      if (indexes instanceof DefaultValue) return

      const indexesAsArray = Array.isArray(indexes) ? indexes : [indexes]

      const accordionAtom = objectiveAccordionEntryModes(id)
      const accordionIndexesState = get(accordionAtom)

      const newAccordionIndexesState = accordionIndexesState.map((_, index) =>
        indexesAsArray.includes(index) ? AccordionEntryMode.VIEW : AccordionEntryMode.COLLAPSED,
      )

      set(accordionAtom, newAccordionIndexesState)
    },
})

export const objectiveAccordionEditEntries = selectorFamily<number | number[], string | undefined>({
  key: `${PREFIX}::ACCORDION_EDIT_INDEXES`,
  get:
    (id) =>
    ({ get }) => {
      const accordionEntries = get(objectiveAccordionEntryModes(id))
      return accordionEntries
        .map((entryState, index) => (entryState === AccordionEntryMode.EDIT ? -1 : index))
        .filter((entryIndex) => entryIndex !== -1)
    },
  set:
    (id) =>
    ({ get, set }, index) => {
      if (index instanceof DefaultValue) return

      const accordionAtom = objectiveAccordionEntryModes(id)
      const accordionIndexesState = get(accordionAtom)

      const newAccordionIndexesState = accordionIndexesState.map((state, stateIndex) =>
        stateIndex === index ? AccordionEntryMode.EDIT : state,
      )

      set(accordionAtom, newAccordionIndexesState)
    },
})
