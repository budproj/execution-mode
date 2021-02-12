import faker from 'faker'
import { snapshot_UNSTABLE } from 'recoil'

import { KeyResultTimelineEntry } from 'src/components/KeyResult/types'
import keyResultAtomFamily from 'src/state/recoil/key-result/atom-family'

import selector from './selector'

describe('setter', () => {
  it('merges new entries with previous ones', () => {
    const fakeID = faker.random.uuid()
    const numberOfEntries = faker.random.number({ max: 100 })

    const oldEntries = [...new Array(numberOfEntries)].map(() => ({
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
    }))
    const newEntries = [...new Array(numberOfEntries)].map(() => ({
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
    }))

    const keyResultAtom = keyResultAtomFamily(fakeID)

    const selectTimeline = selector(fakeID)
    const initialSnapshot = snapshot_UNSTABLE(({ set }) =>
      set(keyResultAtom, {
        timeline: oldEntries as any,
      }),
    )

    const newSnapshot = initialSnapshot.map(({ set }) => set(selectTimeline, newEntries as any))

    const keyResult = newSnapshot.getLoadable(keyResultAtom).getValue()

    const expectedEntries = [...oldEntries, ...newEntries]
    const resultEntries = keyResult?.timeline

    expect(resultEntries).toEqual(expectedEntries)
  })

  it('uses only new entries if the previous one where empty', () => {
    const fakeID = faker.random.uuid()
    const numberOfEntries = faker.random.number({ max: 100 })

    const oldEntries: KeyResultTimelineEntry[] = []
    const newEntries = [...new Array(numberOfEntries)].map(() => ({
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
    }))

    const keyResultAtom = keyResultAtomFamily(fakeID)

    const selectTimeline = selector(fakeID)
    const initialSnapshot = snapshot_UNSTABLE(({ set }) =>
      set(keyResultAtom, {
        timeline: oldEntries as any,
      }),
    )

    const newSnapshot = initialSnapshot.map(({ set }) => set(selectTimeline, newEntries as any))

    const keyResult = newSnapshot.getLoadable(keyResultAtom).getValue()
    const resultEntries = keyResult?.timeline

    expect(resultEntries).toEqual(newEntries)
  })

  it('uses only new entries if the previous one is undefined', () => {
    const fakeID = faker.random.uuid()
    const numberOfEntries = faker.random.number({ max: 100 })

    const newEntries = [...new Array(numberOfEntries)].map(() => ({
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
    }))

    const keyResultAtom = keyResultAtomFamily(fakeID)

    const selectTimeline = selector(fakeID)
    const initialSnapshot = snapshot_UNSTABLE(({ set }) => set(keyResultAtom, {}))

    const newSnapshot = initialSnapshot.map(({ set }) => set(selectTimeline, newEntries as any))

    const keyResult = newSnapshot.getLoadable(keyResultAtom).getValue()
    const resultEntries = keyResult?.timeline

    expect(resultEntries).toEqual(newEntries)
  })
})
