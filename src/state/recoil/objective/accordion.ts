import { atomFamily, DefaultValue, GetRecoilValue, selectorFamily, SetRecoilState } from 'recoil'

import { PREFIX } from './constants'

export enum AccordionEntryMode {
  COLLAPSED = 'collapsed',
  VIEW = 'view',
  EDIT = 'edit',
}

export const buildDefaultAccordionStateFromList = (data: any[] = []): AccordionEntryMode[] =>
  data.map(() => AccordionEntryMode.COLLAPSED)

const getIndexInGivenModes =
  (modes: AccordionEntryMode | AccordionEntryMode[]) =>
  (id?: string) =>
  ({ get }: { get: GetRecoilValue }): number[] => {
    const modesAsArray = Array.isArray(modes) ? modes : [modes]
    const accordionEntries = get(objectiveAccordionEntryModes(id))

    return accordionEntries
      .map((indexMode, index) => (modesAsArray.includes(indexMode) ? index : -1))
      .filter((index) => index !== -1)
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
    const accordionIndexesState = get(accordionAtom)

    const newAccordionIndexesState = accordionIndexesState.map((indexMode, index) =>
      indexesAsArray.includes(index) ? selectedMode : othersMode ?? indexMode,
    )

    set(accordionAtom, newAccordionIndexesState)
  }

export const objectiveAccordionEntryModes = atomFamily<AccordionEntryMode[], string | undefined>({
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
