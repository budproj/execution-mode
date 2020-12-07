import faker from 'faker'
import sinon from 'sinon'

import * as selectors from './selectors'

describe('roles', () => {
  afterEach(() => sinon.restore())

  it('returns the list of roles for our API', () => {
    // eslint-disable-next-line unicorn/no-null
    const fakeRoles = new Array(faker.random.number({ max: 100 })).fill(null).map(faker.random.word)
    const fakeUser = {
      ...faker.helpers.userCard(),
      'https://api.getbud.co/roles': fakeRoles,
    }
    const stub = sinon.stub().returns(fakeUser)

    const result = selectors.getRoles({ get: stub })

    expect(result).toEqual({ api: fakeRoles })
  })

  it('returns an empty list if no user is defined', () => {
    const stub = sinon.stub()

    const result = selectors.getRoles({ get: stub })

    expect(result).toEqual({ api: [] })
  })
})

describe('permissions', () => {
  afterEach(() => sinon.restore())

  it('parses permissions based on resource to our API', () => {
    const permissions = ['key-result::create::any', 'objective::create::owns']
    const fakeUser = {
      'https://api.getbud.co/permissions': permissions,
    }
    const stub = sinon.stub().returns(fakeUser)

    const result = selectors.getPermissions({ get: stub })

    expect(result['key-result'].create).toEqual('any')
  })

  it('builds a normalized object of resources to improve our usage', () => {
    const permissions = ['key-result::create::any', 'objective::create::owns']
    const fakeUser = {
      'https://api.getbud.co/permissions': permissions,
    }
    const stub = sinon.stub().returns(fakeUser)

    const result = selectors.getPermissions({ get: stub })

    expect(Object.keys(result)).toEqual([
      'key-result',
      'progress-report',
      'confidence-report',
      'company',
      'cycle',
      'objective',
      'team',
      'user',
      'key-result-view',
    ])
  })

  it('each resource has a normalized scope structure for each action to improve our usage', () => {
    const permissions = ['key-result::create::any', 'objective::create::owns']
    const fakeUser = {
      'https://api.getbud.co/permissions': permissions,
    }
    const stub = sinon.stub().returns(fakeUser)

    const result = selectors.getPermissions({ get: stub })

    Object.values(result).map((resource) => {
      expect(Object.keys(resource)).toEqual(['create', 'read', 'update', 'delete'])
    })
  })

  it('set to undefined if no permission is assigned to user', () => {
    const permissions = ['key-result::create::any', 'objective::create::owns']
    const fakeUser = {
      'https://api.getbud.co/permissions': permissions,
    }
    const stub = sinon.stub().returns(fakeUser)

    const result = selectors.getPermissions({ get: stub })

    expect(result['team'].create).not.toBeDefined()
  })

  it('uses always the highest permission available for a given action', () => {
    const permissions = ['key-result::create::any', 'key-result::create::owns']
    const fakeUser = {
      'https://api.getbud.co/permissions': permissions,
    }
    const stub = sinon.stub().returns(fakeUser)

    const result = selectors.getPermissions({ get: stub })

    expect(result['key-result'].create).toEqual('any')
  })
})

describe('can', () => {
  afterEach(() => sinon.restore())

  it('returns true if user has required permissions for given resource', () => {
    const permissions = ['key-result::create::any', 'objective::create::owns']
    const fakeUser = {
      'https://api.getbud.co/permissions': permissions,
    }
    const stub = sinon.stub().returns(fakeUser)
    const selector = selectors.getCanFlag('key-result::create::any' as any)

    const result = selector({ get: stub })

    expect(result).toEqual(true)
  })

  it('returns true if no permission is required', () => {
    const selector = selectors.getCanFlag()

    const result = selector({ get: sinon.fake() })

    expect(result).toEqual(true)
  })

  it('returns true if the user has a list of permissions', () => {
    const permissions = ['key-result::create::any', 'objective::create::owns']
    const fakeUser = {
      'https://api.getbud.co/permissions': permissions,
    }
    const stub = sinon.stub().returns(fakeUser)
    const selector = selectors.getCanFlag(permissions as any)

    const result = selector({ get: stub })

    expect(result).toEqual(true)
  })

  it('returns false if the user has all required permissions but one', () => {
    const permissions = ['key-result::create::any', 'objective::create::owns']
    const fakeUser = {
      'https://api.getbud.co/permissions': permissions,
    }
    const stub = sinon.stub().returns(fakeUser)
    const selector = selectors.getCanFlag([...permissions, faker.random.word()] as any)

    const result = selector({ get: stub })

    expect(result).toEqual(false)
  })

  it('returns false if user does not have the required permissions', () => {
    const permissions = ['key-result::create::any', 'objective::create::owns']
    const fakeUser = {
      'https://api.getbud.co/permissions': permissions,
    }
    const stub = sinon.stub().returns(fakeUser)
    const selector = selectors.getCanFlag(faker.random.word() as any)

    const result = selector({ get: stub })

    expect(result).toEqual(false)
  })
})
