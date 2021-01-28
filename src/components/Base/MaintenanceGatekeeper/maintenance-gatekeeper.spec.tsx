import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import * as config from 'src/config'

import MaintenanceGatekeeper from './maintenance-gatekeeper'

const FakeComponent = () => <p>{faker.random.word()}</p>

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('displays a UnderMaintenance component if our app is under maintenance', () => {
    const fakeConfig = {
      publicRuntimeConfig: {
        underMaintenance: true,
      },
    }

    sinon.stub(config, 'default').returns(fakeConfig as any)

    const result = enzyme.shallow(
      <MaintenanceGatekeeper>
        <FakeComponent />
      </MaintenanceGatekeeper>,
    )

    const underMaintenance = result.find('UnderMaintenance')

    expect(underMaintenance.length).toEqual(1)
  })

  it('does not displays the provided children if our app is under maintenance', () => {
    const fakeConfig = {
      publicRuntimeConfig: {
        underMaintenance: true,
      },
    }

    sinon.stub(config, 'default').returns(fakeConfig as any)

    const result = enzyme.shallow(
      <MaintenanceGatekeeper>
        <FakeComponent />
      </MaintenanceGatekeeper>,
    )

    const fakeChild = result.find('FakeComponent')

    expect(fakeChild.length).toEqual(0)
  })

  it('displays the provided children if our app is not under maintenance', () => {
    const fakeConfig = {
      publicRuntimeConfig: {
        underMaintenance: false,
      },
    }

    sinon.stub(config, 'default').returns(fakeConfig as any)

    const result = enzyme.shallow(
      <MaintenanceGatekeeper>
        <FakeComponent />
      </MaintenanceGatekeeper>,
    )

    const fakeChild = result.find('FakeComponent')

    expect(fakeChild.length).toEqual(1)
  })

  it('does not displays the UnderMaintenance component if our app is not under maintenance', () => {
    const fakeConfig = {
      publicRuntimeConfig: {
        underMaintenance: false,
      },
    }

    sinon.stub(config, 'default').returns(fakeConfig as any)

    const result = enzyme.shallow(
      <MaintenanceGatekeeper>
        <FakeComponent />
      </MaintenanceGatekeeper>,
    )

    const underMaintenance = result.find('UnderMaintenance')

    expect(underMaintenance.length).toEqual(0)
  })

  it('hides the AppBar in page if our app is under maintenance', () => {
    const fakeConfig = {
      publicRuntimeConfig: {
        underMaintenance: true,
      },
    }

    sinon.stub(config, 'default').returns(fakeConfig as any)

    const result = enzyme.shallow(
      <MaintenanceGatekeeper>
        <FakeComponent />
      </MaintenanceGatekeeper>,
    )

    const page = result.find('Page')

    expect(page.prop('hideAppBar')).toEqual(true)
  })

  it('shows the AppBar in page if our app is not under maintenance', () => {
    const fakeConfig = {
      publicRuntimeConfig: {
        underMaintenance: false,
      },
    }

    sinon.stub(config, 'default').returns(fakeConfig as any)

    const result = enzyme.shallow(
      <MaintenanceGatekeeper>
        <FakeComponent />
      </MaintenanceGatekeeper>,
    )

    const page = result.find('Page')

    expect(page.prop('hideAppBar')).toEqual(false)
  })
})
