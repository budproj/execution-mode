import faker from 'faker'
import { setConfig } from 'next/config'
import sinon from 'sinon'

import config from '../../../../next.config'

import * as selectors from './selectors'

describe('roles', () => {
  beforeAll(() => setConfig(config))

  it('returns the list of roles for our API on develop environment', () => {
    const fakeRoles = [...new Array(faker.random.number({ max: 100 }))].map(() =>
      faker.random.word(),
    )
    const fakeUser = {
      ...faker.helpers.userCard(),
      'https://api.develop.getbud.co/roles': fakeRoles,
    }
    const stub = sinon.stub().returns(fakeUser)

    const result = selectors.getRoles({ get: stub })

    expect(result).toEqual({ api: fakeRoles })
  })

  it('returns the list of roles for our API on local environment', () => {
    const fakeRoles = [...new Array(faker.random.number({ max: 100 }))].map(() =>
      faker.random.word(),
    )
    const fakeUser = {
      ...faker.helpers.userCard(),
      'https://api.develop.getbud.co/roles': fakeRoles,
    }
    const stub = sinon.stub().returns(fakeUser)

    const result = selectors.getRoles({ get: stub })

    expect(result).toEqual({ api: fakeRoles })
  })

  it('returns the list of roles for our API on production environment', () => {
    setConfig({
      publicRuntimeConfig: {
        ...config.publicRuntimeConfig,
        environment: 'production',
      },
    })

    const fakeRoles = [...new Array(faker.random.number({ max: 100 }))].map(() =>
      faker.random.word(),
    )
    const fakeUser = {
      ...faker.helpers.userCard(),
      'https://api.getbud.co/roles': fakeRoles,
    }
    const stub = sinon.stub().returns(fakeUser)

    const result = selectors.getRoles({ get: stub })

    expect(result).toEqual({ api: fakeRoles })

    setConfig(config)
  })

  it('returns an empty list if no user is defined', () => {
    const stub = sinon.stub()

    const result = selectors.getRoles({ get: stub })

    expect(result).toEqual({ api: [] })
  })
})
