import faker from 'faker'
import { snapshot_UNSTABLE } from 'recoil'
import sinon from 'sinon'

import * as hooks from './hooks'
import { keyResultAtomFamily } from './key-result'

describe('useRecoilFamilyLoader', () => {
  afterEach(() => sinon.restore())

  it('loads provided data to teamAtomFamily if a single data is provided', () => {
    const fakeAtom = faker.random.word()
    const fakeFamily = sinon.stub().returns(fakeAtom)
    const fakeData = faker.helpers.userCard()
    const fakeParameter = 'id'
    const snapshotStub = sinon.stub().returns({ getValue: sinon.fake() })
    const fakeSnapshot = { getLoadable: snapshotStub }
    const spy = sinon.spy()

    const familyLoader = hooks.buildFamilyLoader(fakeFamily, fakeParameter as any)
    const loadData = familyLoader({ set: spy, snapshot: fakeSnapshot } as any)
    loadData(fakeData as any)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeAtom, fakeData)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('loads provided data to teamAtomFamily if a single data in an array is provided', () => {
    const fakeAtom = faker.random.word()
    const fakeFamily = sinon.stub().returns(fakeAtom)
    const fakeData = [faker.helpers.userCard()]
    const fakeParameter = 'id'
    const snapshotStub = sinon.stub().returns({ getValue: sinon.fake() })
    const fakeSnapshot = { getLoadable: snapshotStub }
    const spy = sinon.spy()

    const familyLoader = hooks.buildFamilyLoader(fakeFamily, fakeParameter as any)
    const loadData = familyLoader({ set: spy, snapshot: fakeSnapshot } as any)
    loadData(fakeData as any)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeAtom, fakeData[0])

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('loads provided data to teamAtomFamily if more than one data is provided', () => {
    const fakeAtom = faker.random.word()
    const fakeFamily = sinon.stub().returns(fakeAtom)
    const fakeData = [faker.helpers.userCard(), faker.helpers.userCard()]
    const fakeParameter = 'id'
    const snapshotStub = sinon.stub().returns({ getValue: sinon.fake() })
    const fakeSnapshot = { getLoadable: snapshotStub }
    const spy = sinon.spy()

    const familyLoader = hooks.buildFamilyLoader(fakeFamily, fakeParameter as any)
    const loadData = familyLoader({ set: spy, snapshot: fakeSnapshot } as any)
    loadData(fakeData as any)

    fakeData.map((singleData) => {
      const wasSpyCalledAsExpected = spy.calledWithExactly(fakeAtom, singleData)

      return expect(wasSpyCalledAsExpected).toEqual(true)
    })
  })

  it('does not load anything if the provided data is undefined', () => {
    const fakeAtom = faker.random.word()
    const fakeFamily = sinon.stub().returns(fakeAtom)
    const fakeData = undefined
    const fakeParameter = 'id'
    const snapshotStub = sinon.stub().returns({ getValue: sinon.fake() })
    const fakeSnapshot = { getLoadable: snapshotStub }
    const spy = sinon.spy()

    const familyLoader = hooks.buildFamilyLoader(fakeFamily, fakeParameter as any)
    const loadData = familyLoader({ set: spy, snapshot: fakeSnapshot } as any)
    loadData(fakeData as any)

    expect(spy.notCalled).toEqual(true)
  })

  it('does not load anything if we provided an array of data, but all with undefined values', () => {
    const fakeAtom = faker.random.word()
    const fakeFamily = sinon.stub().returns(fakeAtom)
    const fakeData = [undefined, undefined, undefined]
    const fakeParameter = 'id'
    const snapshotStub = sinon.stub().returns({ getValue: sinon.fake() })
    const fakeSnapshot = { getLoadable: snapshotStub }
    const spy = sinon.spy()

    const familyLoader = hooks.buildFamilyLoader(fakeFamily, fakeParameter as any)
    const loadData = familyLoader({ set: spy, snapshot: fakeSnapshot } as any)
    loadData(fakeData as any)

    expect(spy.notCalled).toEqual(true)
  })

  it('preserves previous data when setting new', () => {
    const fakeAtom = faker.random.word()
    const fakeFamily = sinon.stub().returns(fakeAtom)
    const originalData = { boo: faker.random.word() }
    const fakeData = { foo: faker.random.word() }
    const fakeParameter = 'id'
    const getValueStub = sinon.stub().returns(originalData)
    const snapshotStub = sinon.stub().returns({ getValue: getValueStub })
    const fakeSnapshot = { getLoadable: snapshotStub }
    const spy = sinon.spy()

    const familyLoader = hooks.buildFamilyLoader(fakeFamily, fakeParameter as any)
    const loadData = familyLoader({ set: spy, snapshot: fakeSnapshot } as any)
    loadData(fakeData as any)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeAtom, {
      ...originalData,
      ...fakeData,
    })

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('overwrittes root conflicting keys of original data', () => {
    const fakeAtom = faker.random.word()
    const fakeFamily = sinon.stub().returns(fakeAtom)
    const originalData = { foo: faker.random.word() }
    const fakeData = { foo: faker.random.word() }
    const fakeParameter = 'id'
    const getValueStub = sinon.stub().returns(originalData)
    const snapshotStub = sinon.stub().returns({ getValue: getValueStub })
    const fakeSnapshot = { getLoadable: snapshotStub }
    const spy = sinon.spy()

    const familyLoader = hooks.buildFamilyLoader(fakeFamily, fakeParameter as any)
    const loadData = familyLoader({ set: spy, snapshot: fakeSnapshot } as any)
    loadData(fakeData as any)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeAtom, fakeData)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('overwrittes deep conflicting keys of original data, preserving non-conflicting keys', () => {
    const fakeAtom = faker.random.word()
    const fakeFamily = sinon.stub().returns(fakeAtom)
    const originalData = {
      boo: faker.random.word(),
      foo: { boo: faker.random.word(), foo: faker.random.word() },
    }
    const fakeData = { foo: { boo: faker.random.word() } }
    const fakeParameter = 'id'
    const getValueStub = sinon.stub().returns(originalData)
    const snapshotStub = sinon.stub().returns({ getValue: getValueStub })
    const fakeSnapshot = { getLoadable: snapshotStub }
    const spy = sinon.spy()

    const familyLoader = hooks.buildFamilyLoader(fakeFamily, fakeParameter as any)
    const loadData = familyLoader({ set: spy, snapshot: fakeSnapshot } as any)
    loadData(fakeData as any)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeAtom, {
      ...originalData,
      foo: {
        ...originalData.foo,
        boo: fakeData.foo.boo,
      },
    })

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('overwrittes conflicting arrays of original data, not appending new values', () => {
    const fakeAtom = faker.random.word()
    const fakeFamily = sinon.stub().returns(fakeAtom)
    const originalData = {
      boo: [faker.random.word()],
    }
    const fakeData = { boo: [faker.random.word()] }
    const fakeParameter = 'id'
    const getValueStub = sinon.stub().returns(originalData)
    const snapshotStub = sinon.stub().returns({ getValue: getValueStub })
    const fakeSnapshot = { getLoadable: snapshotStub }
    const spy = sinon.spy()

    const familyLoader = hooks.buildFamilyLoader(fakeFamily, fakeParameter as any)
    const loadData = familyLoader({ set: spy, snapshot: fakeSnapshot } as any)
    loadData(fakeData as any)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeAtom, fakeData)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('creates new root keys, preserving non-conflicting keys', () => {
    const fakeAtom = faker.random.word()
    const fakeFamily = sinon.stub().returns(fakeAtom)
    const originalData = {
      boo: faker.random.word(),
    }
    const fakeData = { foo: { boo: faker.random.word() } }
    const fakeParameter = 'id'
    const getValueStub = sinon.stub().returns(originalData)
    const snapshotStub = sinon.stub().returns({ getValue: getValueStub })
    const fakeSnapshot = { getLoadable: snapshotStub }
    const spy = sinon.spy()

    const familyLoader = hooks.buildFamilyLoader(fakeFamily, fakeParameter as any)
    const loadData = familyLoader({ set: spy, snapshot: fakeSnapshot } as any)
    loadData(fakeData as any)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeAtom, {
      ...originalData,
      foo: {
        boo: fakeData.foo.boo,
      },
    })

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('creates new deep keys, preserving non-conflicting keys', () => {
    const fakeAtom = faker.random.word()
    const fakeFamily = sinon.stub().returns(fakeAtom)
    const originalData = {
      boo: faker.random.word(),
      foo: { foo: faker.random.word() },
    }
    const fakeData = { foo: { boo: faker.random.word() } }
    const fakeParameter = 'id'
    const getValueStub = sinon.stub().returns(originalData)
    const snapshotStub = sinon.stub().returns({ getValue: getValueStub })
    const fakeSnapshot = { getLoadable: snapshotStub }
    const spy = sinon.spy()

    const familyLoader = hooks.buildFamilyLoader(fakeFamily, fakeParameter as any)
    const loadData = familyLoader({ set: spy, snapshot: fakeSnapshot } as any)
    loadData(fakeData as any)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeAtom, {
      ...originalData,
      foo: {
        ...originalData.foo,
        boo: fakeData.foo.boo,
      },
    })

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('merges new data receiving original data from recoil', () => {
    const initialSnapshot = snapshot_UNSTABLE()
    const fakeID = faker.random.word()
    const keyResultAtom = keyResultAtomFamily(fakeID)

    const initialData = {
      id: fakeID,
      morty: faker.random.word(),
      rick: faker.random.word(),
      evilMorty: [faker.random.word()],
      smith: {
        morty: faker.random.word(),
        rick: faker.random.word(),
      },
    }
    const newKeyResult = {
      id: fakeID,
      rick: faker.random.word(),
      evilMorty: [faker.random.word()],
      smith: {
        rick: faker.random.word(),
        smith: faker.random.word(),
      },
    }

    const snapshotWithOriginalData = initialSnapshot.map(({ set }) =>
      set(keyResultAtom, initialData as any),
    )

    const snapshotWithNewData = snapshotWithOriginalData.map(({ set }) => {
      const buildKeyResultLoader = hooks.buildFamilyLoader(keyResultAtomFamily, 'id')
      const loadKeyResult = buildKeyResultLoader({
        set,
        snapshot: snapshotWithOriginalData,
      } as any)

      return loadKeyResult(newKeyResult)
    })

    const result = snapshotWithNewData.getLoadable(keyResultAtom).getValue()
    const expectedResult = {
      id: fakeID,
      morty: initialData.morty,
      rick: newKeyResult.rick,
      evilMorty: newKeyResult.evilMorty,
      smith: {
        morty: initialData.smith.morty,
        rick: newKeyResult.smith.rick,
        smith: newKeyResult.smith.smith,
      },
    }

    expect(result).toEqual(expectedResult)
  })
})
