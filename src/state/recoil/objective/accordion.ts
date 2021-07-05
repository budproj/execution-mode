import map from 'lodash/map'
import mapValues from 'lodash/mapValues'
import pickBy from 'lodash/pickBy'
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
  (modes?: AccordionEntryMode | AccordionEntryMode[]) =>
  (id?: string) =>
  ({ get }: { get: GetRecoilValue }): number[] => {
    const entriesInSelectedMode = getEntriesInSelectedModes(get, id, modes)

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

const getIDsInGivenModes =
  (modes?: AccordionEntryMode | AccordionEntryMode[]) =>
  (id?: string) =>
  ({ get }: { get: GetRecoilValue }): string[] => {
    const entriesInSelectedMode = getEntriesInSelectedModes(get, id, modes)

    return Object.keys(entriesInSelectedMode)
  }

const setIDsToGivenMode =
  (selectedMode: AccordionEntryMode, othersMode?: AccordionEntryMode) =>
  (id?: string) =>
  (
    { get, set }: { get: GetRecoilValue; set: SetRecoilState },
    ids: DefaultValue | string | string[],
  ): number[] | undefined => {
    if (ids instanceof DefaultValue) return

    const idsAsArray = Array.isArray(ids) ? ids : [ids]

    const accordionAtom = objectiveAccordionEntryModes(id)
    const accordionState = get(accordionAtom)
    const newBaseState = buildDefaultAccordionStateFromList([
      ...idsAsArray,
      ...Object.keys(accordionState),
    ])

    const newAccordionIDsState = Object.entries(newBaseState).reduce(
      (previous, [key, entry]) => ({
        ...previous,
        [key]: {
          ...entry,
          mode: idsAsArray.includes(key) ? selectedMode : othersMode ?? entry.mode,
        },
      }),
      {},
    )

    set(accordionAtom, newAccordionIDsState)
  }

const getEntriesInSelectedModes = (
  get: GetRecoilValue,
  id?: string,
  modes?: AccordionEntryMode | AccordionEntryMode[],
): ObjectiveAccordion => {
  const modesAsArray = Array.isArray(modes) ? modes : [modes]
  const accordionEntries = get(objectiveAccordionEntryModes(id))
  if (!modes) return accordionEntries

  return pickBy(accordionEntries, (entry) => modesAsArray.includes(entry.mode))
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

export const objectiveAccordionIndexesBeingViewed = selectorFamily<
  number | number[],
  string | undefined
>({
  key: `${PREFIX}::ACCORDION_INDEXES_BEING_VIEWED`,
  get: getIndexInGivenModes(AccordionEntryMode.VIEW),
  set: setIndexesToGivenMode(AccordionEntryMode.VIEW),
})

export const objectiveAccordionIDs = selectorFamily<string | string[], string | undefined>({
  key: `${PREFIX}::ACCORDION_IDS`,
  get: getIDsInGivenModes(),
})

export const objectiveAccordionIDsBeingEdited = selectorFamily<
  string | string[],
  string | undefined
>({
  key: `${PREFIX}::ACCORDION_IDS_BEING_EDITED`,
  get: getIDsInGivenModes(AccordionEntryMode.EDIT),
  set: setIDsToGivenMode(AccordionEntryMode.EDIT),
})

export const objectiveAccordionUpdate = selectorFamily<string[], string | undefined>({
  key: `${PREFIX}::ACCORDION_UPDATE`,
  get: getIDsInGivenModes(),
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
