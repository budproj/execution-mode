import faker from 'faker'
import { snapshot_UNSTABLE } from 'recoil'

import keyResultAtomFamily from 'src/state/recoil/key-result/atom-family'
import { userAtomFamily } from 'src/state/recoil/user'
import meAtom from 'src/state/recoil/user/me'

import selectLatestCheckIn from './latest'

describe('getter', () => {
  it('returns the latest check-in', () => {
    const fakeID = faker.random.word()
    const fakeCheckIn = {
      comment: faker.lorem.paragraph(),
      value: faker.random.number(),
      confidence: faker.random.number(),
    }

    const snapshot = snapshot_UNSTABLE(({ set }) =>
      set(keyResultAtomFamily(fakeID), {
        latestKeyResultCheckIn: fakeCheckIn as any,
      }),
    )

    const result = snapshot.getLoadable(selectLatestCheckIn(fakeID)).getValue()

    expect(result).toEqual(fakeCheckIn)
  })

  it('returns the latest check-in from the check-ins list', () => {
    const fakeID = faker.random.word()
    const fakeCheckIn = {
      comment: faker.lorem.paragraph(),
      value: faker.random.number(),
      confidence: faker.random.number(),
    }

    const snapshot = snapshot_UNSTABLE(({ set }) =>
      set(keyResultAtomFamily(fakeID), {
        keyResultCheckIns: [fakeCheckIn] as any,
      }),
    )

    const result = snapshot.getLoadable(selectLatestCheckIn(fakeID)).getValue()

    expect(result).toEqual(fakeCheckIn)
  })

  it('returns a check-in with initial value as value if there is no latest check-in', () => {
    const fakeID = faker.random.word()
    const fakeInitialValue = faker.random.number()

    const snapshot = snapshot_UNSTABLE(({ set }) =>
      set(keyResultAtomFamily(fakeID), {
        initialValue: fakeInitialValue,
      }),
    )

    const result = snapshot.getLoadable(selectLatestCheckIn(fakeID)).getValue()

    expect(result?.value).toEqual(fakeInitialValue)
  })

  it('returns a check-in with 100 as confidence if there is no latest check-in', () => {
    const fakeID = faker.random.word()

    const snapshot = snapshot_UNSTABLE(({ set }) => set(keyResultAtomFamily(fakeID), {}))

    const result = snapshot.getLoadable(selectLatestCheckIn(fakeID)).getValue()

    expect(result?.confidence).toEqual(100)
  })
})

describe('setter', () => {
  it('adds the new check-in, linked to parent and given user as our latest check-in attribute', () => {
    const fakeID = faker.random.word()
    const fakeUserID = faker.random.uuid()

    const fakeCheckIn = {
      comment: faker.lorem.paragraph(),
      value: faker.random.number(),
      confidence: faker.random.number(),
    }
    const fakeUser = {
      ...faker.helpers.userCard(),
      id: fakeUserID,
    }
    const fakePreviousCheckIn = {
      comment: faker.lorem.paragraph(),
      value: faker.random.number(),
      confidence: faker.random.number(),
    }

    const initialSnapshot = snapshot_UNSTABLE(({ set }) => {
      set(keyResultAtomFamily(fakeID), {
        latestKeyResultCheckIn: fakePreviousCheckIn as any,
      })

      set(userAtomFamily(fakeUserID), fakeUser as any)

      set(meAtom, fakeUserID)
    })

    const newSnapshot = initialSnapshot.map(({ set }) =>
      set(selectLatestCheckIn(fakeID), fakeCheckIn as any),
    )

    const result = newSnapshot.getLoadable(selectLatestCheckIn(fakeID)).getValue()
    const expectedResult = {
      ...fakeCheckIn,
      parent: fakePreviousCheckIn,
      user: fakeUser,
    }

    expect(result).toEqual(expectedResult)
  })

  it('can add a given check-in without a parent', () => {
    const fakeID = faker.random.word()
    const fakeUserID = faker.random.uuid()

    const fakeCheckIn = {
      comment: faker.lorem.paragraph(),
      value: faker.random.number(),
      confidence: faker.random.number(),
    }
    const fakeUser = {
      ...faker.helpers.userCard(),
      id: fakeUserID,
    }

    const initialSnapshot = snapshot_UNSTABLE(({ set }) => {
      set(keyResultAtomFamily(fakeID), {
        id: fakeID,
      })

      set(userAtomFamily(fakeUserID), fakeUser as any)

      set(meAtom, fakeUserID)
    })

    const newSnapshot = initialSnapshot.map(({ set }) =>
      set(selectLatestCheckIn(fakeID), fakeCheckIn as any),
    )

    const result = newSnapshot.getLoadable(selectLatestCheckIn(fakeID)).getValue()
    const expectedResult = {
      ...fakeCheckIn,
      user: fakeUser,
    }

    expect(result).toEqual(expectedResult)
  })

  it('adds the new check-in to our check-ins list', () => {
    const fakeID = faker.random.word()
    const fakeUserID = faker.random.uuid()
    const fakeNumberOfPreviousCheckIns = faker.random.number({ max: 100 })

    const fakeCheckIn = {
      comment: faker.lorem.paragraph(),
      value: faker.random.number(),
      confidence: faker.random.number(),
    }
    const fakeUser = {
      ...faker.helpers.userCard(),
      id: fakeUserID,
    }
    const fakePreviousCheckIns = [...new Array(fakeNumberOfPreviousCheckIns)].map(() =>
      faker.helpers.userCard(),
    )

    const initialSnapshot = snapshot_UNSTABLE(({ set }) => {
      set(keyResultAtomFamily(fakeID), {
        id: fakeID,
        keyResultCheckIns: fakePreviousCheckIns as any,
      })

      set(userAtomFamily(fakeUserID), fakeUser as any)

      set(meAtom, fakeUserID)
    })

    const newSnapshot = initialSnapshot.map(({ set }) =>
      set(selectLatestCheckIn(fakeID), fakeCheckIn as any),
    )

    const result = newSnapshot.getLoadable(keyResultAtomFamily(fakeID)).getValue()
    const expectedResult = [
      {
        ...fakeCheckIn,
        user: fakeUser,
        parent: fakePreviousCheckIns[0],
      },
      ...fakePreviousCheckIns,
    ]

    expect(result?.keyResultCheckIns).toEqual(expectedResult)
  })

  it('preserves old check-ins upon addition of the new check-in', () => {
    const fakeID = faker.random.word()
    const fakeUserID = faker.random.uuid()
    const fakeNumberOfPreviousCheckIns = faker.random.number({ max: 100 })

    const fakeCheckIn = {
      comment: faker.lorem.paragraph(),
      value: faker.random.number(),
      confidence: faker.random.number(),
    }
    const fakeUser = {
      ...faker.helpers.userCard(),
      id: fakeUserID,
    }
    const fakePreviousCheckIns = [...new Array(fakeNumberOfPreviousCheckIns)].map(() =>
      faker.helpers.userCard(),
    )

    const initialSnapshot = snapshot_UNSTABLE(({ set }) => {
      set(keyResultAtomFamily(fakeID), {
        id: fakeID,
        keyResultCheckIns: fakePreviousCheckIns as any,
      })

      set(userAtomFamily(fakeUserID), fakeUser as any)

      set(meAtom, fakeUserID)
    })

    const newSnapshot = initialSnapshot.map(({ set }) =>
      set(selectLatestCheckIn(fakeID), fakeCheckIn as any),
    )

    const result = newSnapshot.getLoadable(keyResultAtomFamily(fakeID)).getValue()

    expect(result?.keyResultCheckIns?.slice(1)).toEqual(fakePreviousCheckIns)
  })

  it('can add if no previous check-ins exist', () => {
    const fakeID = faker.random.word()
    const fakeUserID = faker.random.uuid()

    const fakeCheckIn = {
      comment: faker.lorem.paragraph(),
      value: faker.random.number(),
      confidence: faker.random.number(),
    }
    const fakeUser = {
      ...faker.helpers.userCard(),
      id: fakeUserID,
    }

    const initialSnapshot = snapshot_UNSTABLE(({ set }) => {
      set(keyResultAtomFamily(fakeID), {
        id: fakeID,
      })

      set(userAtomFamily(fakeUserID), fakeUser as any)

      set(meAtom, fakeUserID)
    })

    const newSnapshot = initialSnapshot.map(({ set }) =>
      set(selectLatestCheckIn(fakeID), fakeCheckIn as any),
    )

    const result = newSnapshot.getLoadable(keyResultAtomFamily(fakeID)).getValue()
    const expectedResult = [
      {
        ...fakeCheckIn,
        user: fakeUser,
      },
    ]

    expect(result?.keyResultCheckIns).toEqual(expectedResult)
  })
})
