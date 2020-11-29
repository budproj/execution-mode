import faker from 'faker'
import sinon from 'sinon'

import * as config from 'src/config'

import localeAtom from './locale-atom'
import * as selectors from './selectors'

describe('getter based on locale', () => {
  afterEach(() => sinon.restore())

  it('returns the correct route for a given locale', () => {
    const source = `/${faker.random.word()}`
    const destination = `/${faker.random.word()}`
    const locale = faker.random.word() as config.Locale
    const fakeConfig: Partial<config.BudConfig> = {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      publicRuntimeConfig: {
        intlRoutes: [
          {
            destination,
            source,
            locale,
          },
        ],
      } as config.BudPublicConfig,
    }
    sinon.stub(config, 'default').returns(fakeConfig as config.BudConfig)

    const localeStub = sinon.stub().returns(locale)
    const fakeGetter = selectors.selectorSpecification.get(destination)

    const result = fakeGetter({ get: localeStub })

    expect(result).toEqual(source)
  })

  it('uses the locale atom to fetch the user current location', () => {
    const spy = sinon.spy()
    const fakeGetter = selectors.selectorSpecification.get(faker.random.word())

    fakeGetter({ get: spy })

    const wasCalledAsExpected = spy.calledOnceWithExactly(localeAtom)
    expect(wasCalledAsExpected).toBe(true)
  })

  it('returns the source route if the locale was found in route tree', () => {
    const source = `/${faker.random.word()}`
    const destination = `/${faker.random.word()}`
    const locale = faker.random.word() as config.Locale
    const fakeConfig: Partial<config.BudConfig> = {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      publicRuntimeConfig: {
        intlRoutes: [
          {
            destination,
            source,
            locale,
          },
        ],
      } as config.BudPublicConfig,
    }
    sinon.stub(config, 'default').returns(fakeConfig as config.BudConfig)

    const localeStub = sinon.stub().returns(faker.random.word())
    const fakeGetter = selectors.selectorSpecification.get(destination)

    const result = fakeGetter({ get: localeStub })

    expect(result).toEqual(destination)
  })

  it('returns the source route if the locale exists, but the destination was not found in route tree', () => {
    const source = `/${faker.random.word()}`
    const destination = `/${faker.random.word()}`
    const locale = faker.random.word() as config.Locale
    const fakeConfig: Partial<config.BudConfig> = {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      publicRuntimeConfig: {
        intlRoutes: [
          {
            destination: faker.random.word(),
            source,
            locale,
          },
        ],
      } as config.BudPublicConfig,
    }
    sinon.stub(config, 'default').returns(fakeConfig as config.BudConfig)

    const localeStub = sinon.stub().returns(locale)
    const fakeGetter = selectors.selectorSpecification.get(destination)

    const result = fakeGetter({ get: localeStub })

    expect(result).toEqual(destination)
  })
})
