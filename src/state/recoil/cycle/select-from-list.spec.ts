import faker from 'faker'
import { snapshot_UNSTABLE } from 'recoil'

import cycleAtomFamily from './atom-family'
import selectCyclesFromList from './select-from-list'

describe('getter', () => {
  it('can get all cycles from a list of IDs', () => {
    const numberOfFakeCycles = faker.random.number({ max: 10 })
    const cycleIDs = [...new Array(numberOfFakeCycles)].map(() => faker.random.uuid())
    const cycles = cycleIDs.map((cycleID) => ({
      ...faker.helpers.userCard(),
      id: cycleID,
    }))

    const cyclesToSelect = cycleIDs
      .map((cycleID) => faker.helpers.randomize([undefined, cycleID]))
      .filter((cycleID) => typeof cycleID !== 'undefined') as string[]

    const initialSnapshot = snapshot_UNSTABLE(({ set }) =>
      cycleIDs.map((cycleID, index) => set(cycleAtomFamily(cycleID), cycles[index])),
    )

    const selector = selectCyclesFromList(cyclesToSelect)
    const result = initialSnapshot.getLoadable(selector).getValue()

    const expectedResult = cycles.filter((cycle) => cyclesToSelect.includes(cycle.id))

    expect(result).toEqual(expectedResult)
  })
})
