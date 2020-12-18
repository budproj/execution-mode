import faker from 'faker'
import sinon from 'sinon'

import * as hooks from './hooks'

describe('useRecoilFamilyLoader', () => {
  afterEach(() => sinon.restore())

  it('loads provided data to teamAtomFamily if a single data is provided', () => {
    const fakeAtom = faker.random.word()
    const fakeFamily = sinon.stub().returns(fakeAtom)
    const fakeData = faker.helpers.userCard()
    const fakeParameter = 'id'
    const spy = sinon.spy()

    const familyLoader = hooks.buildFamilyLoader(fakeFamily, fakeParameter as any)
    const loadData = familyLoader({ set: spy } as any)
    loadData(fakeData as any)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeAtom, fakeData)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('loads provided data to teamAtomFamily if a single data in an array is provided', () => {
    const fakeAtom = faker.random.word()
    const fakeFamily = sinon.stub().returns(fakeAtom)
    const fakeData = [faker.helpers.userCard()]
    const fakeParameter = 'id'
    const spy = sinon.spy()

    const familyLoader = hooks.buildFamilyLoader(fakeFamily, fakeParameter as any)
    const loadData = familyLoader({ set: spy } as any)
    loadData(fakeData as any)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeAtom, fakeData[0])

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('loads provided data to teamAtomFamily if more than one data is provided', () => {
    const fakeAtom = faker.random.word()
    const fakeFamily = sinon.stub().returns(fakeAtom)
    const fakeData = [faker.helpers.userCard(), faker.helpers.userCard()]
    const fakeParameter = 'id'
    const spy = sinon.spy()

    const familyLoader = hooks.buildFamilyLoader(fakeFamily, fakeParameter as any)
    const loadData = familyLoader({ set: spy } as any)
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
    const spy = sinon.spy()

    const familyLoader = hooks.buildFamilyLoader(fakeFamily, fakeParameter as any)
    const loadData = familyLoader({ set: spy } as any)
    loadData(fakeData as any)

    expect(spy.notCalled).toEqual(true)
  })

  it('does not load anything if we provided an array of data, but all with undefined values', () => {
    const fakeAtom = faker.random.word()
    const fakeFamily = sinon.stub().returns(fakeAtom)
    const fakeData = [undefined, undefined, undefined]
    const fakeParameter = 'id'
    const spy = sinon.spy()

    const familyLoader = hooks.buildFamilyLoader(fakeFamily, fakeParameter as any)
    const loadData = familyLoader({ set: spy } as any)
    loadData(fakeData as any)

    expect(spy.notCalled).toEqual(true)
  })
})
