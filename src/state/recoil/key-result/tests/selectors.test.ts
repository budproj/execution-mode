import faker from 'faker'
import sinon from 'sinon'

import keyResultAtomFamily from '../atom-family'
import * as selectors from '../selectors'

describe('build partial selector getter', () => {
  it('gets the keyResultAtomFamily with provided ID', () => {
    const spy = sinon.spy()
    const fakePart = faker.random.word()
    const fakeID = faker.random.number()

    const fakePartSpecification = selectors.selectorSpecification(fakePart)
    const fakeGetter = fakePartSpecification.get(fakeID)

    fakeGetter({ get: spy })

    const wasCalledAsExpected = spy.calledOnceWithExactly(keyResultAtomFamily(fakeID))

    expect(wasCalledAsExpected).toEqual(true)
  })

  it('returns the value in provided part path', () => {
    const fakeData = { rick: 'Morty' }
    const stub = sinon.stub().returns(fakeData)
    const fakeID = faker.random.number()

    const fakePartSpecification = selectors.selectorSpecification('rick')
    const fakeGetter = fakePartSpecification.get(fakeID)

    const result = fakeGetter({ get: stub })

    expect(result).toEqual('Morty')
  })

  it('returns the value in provided part deep path', () => {
    const fakeData = { rick: { sanchez: { morty: 'Smith' } } }
    const stub = sinon.stub().returns(fakeData)
    const fakeID = faker.random.number()

    const fakePartSpecification = selectors.selectorSpecification('rick.sanchez.morty')
    const fakeGetter = fakePartSpecification.get(fakeID)

    const result = fakeGetter({ get: stub })

    expect(result).toEqual('Smith')
  })

  it('returns undefined if no ID was provided', () => {
    const fakePartSpecification = selectors.selectorSpecification(faker.random.word())
    const fakeGetter = fakePartSpecification.get()

    const result = fakeGetter({ get: sinon.fake() })

    expect(result).not.toBeDefined()
  })
})

describe('build partial selector setters', () => {
  it('gets the provided key result atom family with given ID', () => {
    const spy = sinon.spy()
    const fakePart = faker.random.word()
    const fakeID = faker.random.number()

    const fakePartSpecification = selectors.selectorSpecification(fakePart)
    const fakeSetter = fakePartSpecification.set(fakeID)

    fakeSetter({ get: spy, set: sinon.fake() }, faker.random.number())

    const wasCalledAsExpected = spy.calledOnceWithExactly(keyResultAtomFamily(fakeID))

    expect(wasCalledAsExpected).toEqual(true)
  })

  it('sets the key result atom to a new partial value, merged with last state', () => {
    const fakeData = faker.helpers.createCard()
    const fakeValue = faker.random.objectElement()
    const fakePart = faker.random.word()
    const fakeID = faker.random.number()
    const getStub = sinon.stub().returns(fakeData)
    const setSpy = sinon.spy()

    const fakePartSpecification = selectors.selectorSpecification(fakePart)
    const fakeSetter = fakePartSpecification.set(fakeID)

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
})
