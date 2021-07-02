import filter from 'lodash/filter'
import map from 'lodash/map'
import mapValues from 'lodash/mapValues'
import { atomFamily, DefaultValue, GetRecoilValue, selectorFamily, SetRecoilState } from 'recoil'

import { PREFIX } from './constants'

export enum AccordionEntryMode {
  COLLAPSED = 'collapsed',
  VIEW = 'view',
  EDIT = 'edit',
}

type ObjectiveEntry = {
  position: number
  mode: AccordionEntryMode
}

type ObjectiveAccordion = Record<string, ObjectiveEntry>

export const buildDefaultAccordionStateFromList = (data: string[] = []): ObjectiveAccordion =>
  data.reduce(
    (previous, key, index) => ({
      ...previous,
      [key]: {
        position: index,
        mode: AccordionEntryMode.COLLAPSED,
      },
    }),
    {},
  )

const getIndexInGivenModes =
  (modes: AccordionEntryMode | AccordionEntryMode[]) =>
  (id?: string) =>
  ({ get }: { get: GetRecoilValue }): number[] => {
    const modesAsArray = Array.isArray(modes) ? modes : [modes]
    const accordionEntries = get(objectiveAccordionEntryModes(id))
    const entriesInSelectedMode = filter(accordionEntries, (entry) =>
      modesAsArray.includes(entry.mode),
    )

    return map(entriesInSelectedMode, 'position')
  }

const setIndexesToGivenMode =
  (selectedMode: AccordionEntryMode, othersMode?: AccordionEntryMode) =>
  (id?: string) =>
  (
    { get, set }: { get: GetRecoilValue; set: SetRecoilState },
    indexes: DefaultValue | number | number[],
  ): number[] | undefined => {
    if (indexes instanceof DefaultValue) return

    const indexesAsArray = Array.isArray(indexes) ? indexes : [indexes]

    const accordionAtom = objectiveAccordionEntryModes(id)
    const accordionState = get(accordionAtom)

    const newAccordionIndexesState = mapValues(accordionState, (entry) => ({
      ...entry,
      mode: indexesAsArray.includes(entry.position) ? selectedMode : othersMode ?? entry.mode,
    }))

    set(accordionAtom, newAccordionIndexesState)
  }

export const objectiveAccordionEntryModes = atomFamily<ObjectiveAccordion, string | undefined>({
  key: `${PREFIX}::ACCORDION_ENTRY_MODES`,
  default: buildDefaultAccordionStateFromList(),
})

export const objectiveAccordionExpandedEntries = selectorFamily<
  number | number[],
  string | undefined
>({
  key: `${PREFIX}::ACCORDION_EXPANDED_ENTRIES`,
  get: getIndexInGivenModes([AccordionEntryMode.VIEW, AccordionEntryMode.EDIT]),
  set: setIndexesToGivenMode(AccordionEntryMode.VIEW, AccordionEntryMode.COLLAPSED),
})

export const objectiveAccordionIndexesBeingEdited = selectorFamily<
  number | number[],
  string | undefined
>({
  key: `${PREFIX}::ACCORDION_INDEXES_BEING_EDITED`,
  get: getIndexInGivenModes(AccordionEntryMode.EDIT),
  set: setIndexesToGivenMode(AccordionEntryMode.EDIT),
})

export const objectiveAccordionCollapsedIndexes = selectorFamily<
  number | number[],
  string | undefined
>({
  key: `${PREFIX}::ACCORDION_COLLAPSED_INDEXES`,
  get: getIndexInGivenModes(AccordionEntryMode.COLLAPSED),
  set: setIndexesToGivenMode(AccordionEntryMode.COLLAPSED),
})

export const objectiveAccordionIndexesBeingViewed = selectorFamily<
  number | number[],
  string | undefined
>({
  key: `${PREFIX}::ACCORDION_INDEXES_BEING_VIEWED`,
  get: getIndexInGivenModes(AccordionEntryMode.VIEW),
  set: setIndexesToGivenMode(AccordionEntryMode.VIEW),
})

export const objectiveAccordionUpdate = selectorFamily<string[], string | undefined>({
  key: `${PREFIX}::ACCORDION_UPDATE`,
  get:
    (id) =>
    ({ get }) => {
      const accordionState = get(objectiveAccordionEntryModes(id))
      return Object.keys(accordionState)
    },
  set:
    (id) =>
    ({ get, set }, newObjectiveKeys) => {
      if (newObjectiveKeys instanceof DefaultValue) return

      const accordionAtom = objectiveAccordionEntryModes(id)
      const previousState = get(accordionAtom)
      const newBaseState = buildDefaultAccordionStateFromList(newObjectiveKeys)

      const newState = Object.entries(newBaseState).reduce(
        (previous, [key, entry]) => ({
          ...previous,
          [key]: {
            ...entry,
            mode: previousState[key]?.mode ?? entry.mode,
          },
        }),
        {},
      )

      set(accordionAtom, newState)
    },
})
