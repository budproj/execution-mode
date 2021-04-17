import faker from 'faker'
import { shuffle } from 'lodash'
import { snapshot_UNSTABLE } from 'recoil'

import keyResultAtomFamily from 'src/state/recoil/key-result/atom-family'

import selectRemoveTimelineEntry from './remove-entry'

describe('setter', () => {
  it('removes a given entry from current entries', async () => {
    const fakeID = faker.random.uuid()
    const numberOfEntries = faker.random.number({ max: 100 })
    const entryToRemove = {
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
    }
    const entries = [...new Array(numberOfEntries)].map(() => ({
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
    }))

    const initialEntries = [entryToRemove, ...entries]
    const shuffledInitialEntries = shuffle(initialEntries)

    const keyResultAtom = keyResultAtomFamily(fakeID)
    const removeTimelineEntry = selectRemoveTimelineEntry(fakeID)
    const initialSnapshot = snapshot_UNSTABLE(({ set }) =>
      set(keyResultAtom, {
        timeline: shuffledInitialEntries as any,
      }),
    )

    const removedSnapshot = initialSnapshot.map(({ set }) =>
      set(removeTimelineEntry, entryToRemove),
    )

    const keyResult = removedSnapshot.getLoadable(keyResultAtom).getValue()
    // Const removedEntry = keyResult?.timeline?.filter((entry) => entry.id === entryToRemove.id)

    expect(keyResult).toEqual([])
  })

  it('does not change an entry if it does not exist', () => {
    const fakeID = faker.random.uuid()
    const numberOfEntries = faker.random.number({ max: 100 })
    const entryToRemove = {
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
    }
    const entries = [...new Array(numberOfEntries)].map(() => ({
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
    }))

    const keyResultAtom = keyResultAtomFamily(fakeID)
    const removeTimelineEntry = selectRemoveTimelineEntry(fakeID)
    const initialSnapshot = snapshot_UNSTABLE(({ set }) =>
      set(keyResultAtom, {
        timeline: entries as any,
      }),
    )

    const removedSnapshot = initialSnapshot.map(({ set }) =>
      set(removeTimelineEntry, entryToRemove),
    )

    const keyResult = removedSnapshot.getLoadable(keyResultAtom).getValue()

    expect(keyResult?.timeline).toEqual(entries)
  })

  it('does not remove anything besides that given entry', () => {
    const fakeID = faker.random.uuid()
    const numberOfEntries = faker.random.number({ max: 100 })
    const entryToRemove = {
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
    }
    const entries = [...new Array(numberOfEntries)].map(() => ({
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
    }))

    const initialEntries = [entryToRemove, ...entries]

    const keyResultAtom = keyResultAtomFamily(fakeID)
    const removeTimelineEntry = selectRemoveTimelineEntry(fakeID)
    const initialSnapshot = snapshot_UNSTABLE(({ set }) =>
      set(keyResultAtom, {
        timeline: initialEntries as any,
      }),
    )

    const removedSnapshot = initialSnapshot.map(({ set }) =>
      set(removeTimelineEntry, entryToRemove),
    )

    const keyResult = removedSnapshot.getLoadable(keyResultAtom).getValue()

    expect(keyResult?.timeline).toEqual(entries)
  })
})
