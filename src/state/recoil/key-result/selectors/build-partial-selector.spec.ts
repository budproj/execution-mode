import faker from 'faker'
import sinon from 'sinon'

import keyResultAtomFamily from 'src/state/recoil/key-result/atom-family'

import * as buildPartialSelector from './build-partial-selector'

describe('partial selector getter', () => {
  afterEach(() => sinon.restore())

  it('uses the provided ID to get key results from atom family', () => {
    const spy = sinon.spy()
    const fakePart = faker.random.word()
    const fakeID = faker.random.word()

    const fakePartGetter = buildPartialSelector.getKeyResultPart(fakePart)
    const fakeGetter = fakePartGetter(fakeID)

    fakeGetter({ get: spy })

    const wasCalledAsExpected = spy.calledOnceWithExactly(keyResultAtomFamily(fakeID))

    expect(wasCalledAsExpected).toEqual(true)
  })

  it('returns the value in provided part path', () => {
    const fakeData = { rick: 'Morty' }
    const stub = sinon.stub().returns(fakeData)
    const fakeID = faker.random.word()

    const fakePartGetter = buildPartialSelector.getKeyResultPart('rick')
    const fakeGetter = fakePartGetter(fakeID)

    const result = fakeGetter({ get: stub })

    expect(result).toEqual('Morty')
  })

  it('returns the value in provided part deep path', () => {
    const fakeData = { rick: { sanchez: { morty: 'Smith' } } }
    const stub = sinon.stub().returns(fakeData)
    const fakeID = faker.random.word()

    const fakePartGetter = buildPartialSelector.getKeyResultPart('rick.sanchez.morty')
    const fakeGetter = fakePartGetter(fakeID)

    const result = fakeGetter({ get: stub })

    expect(result).toEqual('Smith')
  })

  it('returns undefined if no ID was provided', () => {
    const fakePartGetter = buildPartialSelector.getKeyResultPart(faker.random.word())
    const fakeGetter = fakePartGetter()

    const result = fakeGetter({ get: sinon.fake() })

    expect(result).not.toBeDefined()
  })
})

describe('partial selector setter', () => {
  it('gets the provided key result atom family with given ID', () => {
    const spy = sinon.spy()
    const fakePart = faker.random.word()
    const fakeID = faker.random.word()

    const fakePartSetter = buildPartialSelector.setKeyResultPart(fakePart)
    const fakeSetter = fakePartSetter(fakeID)

    fakeSetter({ get: spy, set: sinon.fake() }, faker.random.number())

    const wasCalledAsExpected = spy.calledOnceWithExactly(keyResultAtomFamily(fakeID))

    expect(wasCalledAsExpected).toEqual(true)
  })

  it('sets the key result atom to a new partial value, merged with last state', () => {
    const fakeData = faker.helpers.createCard()
    const fakeValue = faker.random.objectElement()
    const fakePart = faker.random.word()
    const fakeID = faker.random.word()
    const getStub = sinon.stub().returns(fakeData)
    const setSpy = sinon.spy()

    const fakePartSetter = buildPartialSelector.setKeyResultPart(fakePart)
    const fakeSetter = fakePartSetter(fakeID)

    fakeSetter({ get: getStub, set: setSpy }, fakeValue)

    const expectedValue = {
      ...fakeData,
      [fakePart]: fakeValue,
    }
    const wasCalledAsExpected = setSpy.calledOnceWithExactly(
      keyResultAtomFamily(fakeID),
      expectedValue,
    )

    expect(wasCalledAsExpected).toEqual(true)
  })

  it('returns undefined if no ID was provided', () => {
    const fakePartSetter = buildPartialSelector.setKeyResultPart(faker.random.word())
    const fakeSetter = fakePartSetter()

    const result = fakeSetter({ get: sinon.fake(), set: sinon.fake() }, faker.random.number())

    expect(result).not.toBeDefined()
  })
})
