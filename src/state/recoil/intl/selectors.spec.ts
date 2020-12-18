import faker from 'faker'
import sinon from 'sinon'

import * as config from 'src/config'

import currentNextRoute from './current-next-route'
import localeAtom from './locale'
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
    const fakeGetter = selectors.getRouteBasedOnLocale(destination)

    const result = fakeGetter({ get: localeStub })

    expect(result).toEqual(source)
  })

  it('uses the locale atom to fetch the user current location', () => {
    const spy = sinon.spy()
    const fakeGetter = selectors.getRouteBasedOnLocale(faker.random.word())

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
    const fakeGetter = selectors.getRouteBasedOnLocale(destination)

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
    const fakeGetter = selectors.getRouteBasedOnLocale(destination)

    const result = fakeGetter({ get: localeStub })

    expect(result).toEqual(destination)
  })

  it('removes the locale prefix on locale prefixed sources', () => {
    const locale = faker.random.word() as config.Locale
    const source = `/${faker.random.word()}`
    const destination = `/${faker.random.word()}`
    const fakeConfig: Partial<config.BudConfig> = {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      publicRuntimeConfig: {
        intlRoutes: [
          {
            destination: faker.random.word(),
            source: `/${locale}/${source}`,
            locale,
          },
        ],
      } as config.BudPublicConfig,
    }
    sinon.stub(config, 'default').returns(fakeConfig as config.BudConfig)

    const localeStub = sinon.stub().returns(locale)
    const fakeGetter = selectors.getRouteBasedOnLocale(destination)

    const result = fakeGetter({ get: localeStub })

    expect(result).toEqual(destination)
  })

  it('returns the correct absolute route for a given locale based on a relative route', () => {
    const parent = faker.random.word()
    const fakeDestination = faker.random.word()
    const source = `/${parent}/${faker.random.word()}`
    const destination = `/${parent}/${fakeDestination}`
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

    const getStub = sinon.stub()
    getStub.withArgs(localeAtom).returns(locale)
    getStub.withArgs(currentNextRoute).returns(`/${parent}`)

    const fakeGetter = selectors.getRouteBasedOnLocale(fakeDestination)

    const result = fakeGetter({ get: getStub })

    expect(result).toEqual(source)
  })

  it('returns the correct absolute route for a given locale based on a dynamic route', () => {
    const parent = faker.random.word()
    const intlParent = faker.random.word()
    const fakeDestination = faker.random.word()
    const parameter = faker.random.word()

    const source = `/${intlParent}/:${parameter}`
    const destination = `/${parent}/:${parameter}`

    const locale = faker.random.word() as config.Locale
    const fakeConfig: Partial<config.BudConfig> = {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      publicRuntimeConfig: {
        intlRoutes: [
          {
            locale,
            destination,
            source,
          },
        ],
      } as config.BudPublicConfig,
    }

    sinon.stub(config, 'default').returns(fakeConfig as config.BudConfig)

    const getStub = sinon.stub()
    getStub.withArgs(localeAtom).returns(locale)
    getStub.withArgs(currentNextRoute).returns(`/${parent}`)

    const fakeGetter = selectors.getRouteBasedOnLocale(fakeDestination)

    const result = fakeGetter({ get: getStub })
    const expectedResult = `/${intlParent}/${fakeDestination}`

    expect(result).toEqual(expectedResult)
  })

  it('returns the correct absolute route for a given locale based on a dynamic route with multiple parts', () => {
    const grandfather = faker.random.word()
    const parent = faker.random.word()
    const intlGrandfather = faker.random.word()
    const intlParent = faker.random.word()

    const fakeDestination = faker.random.word()
    const fakeFullDestination = `${parent}/${fakeDestination}`
    const parameter = faker.random.word()

    const source = `/${intlGrandfather}/${intlParent}/:${parameter}`
    const destination = `/${grandfather}/${parent}/:${parameter}`

    const locale = faker.random.word() as config.Locale
    const fakeConfig: Partial<config.BudConfig> = {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      publicRuntimeConfig: {
        intlRoutes: [
          {
            locale,
            destination,
            source,
          },
        ],
      } as config.BudPublicConfig,
    }

    sinon.stub(config, 'default').returns(fakeConfig as config.BudConfig)

    const getStub = sinon.stub()
    getStub.withArgs(localeAtom).returns(locale)
    getStub.withArgs(currentNextRoute).returns(`/${grandfather}`)

    const fakeGetter = selectors.getRouteBasedOnLocale(fakeFullDestination)

    const result = fakeGetter({ get: getStub })
    const expectedResult = `/${intlGrandfather}/${intlParent}/${fakeDestination}`

    expect(result).toEqual(expectedResult)
  })
})
