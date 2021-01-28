import enzyme from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import * as config from 'src/config'

import UnderMaintenancePage from './under-maintenance'

const fakeDate = '2020-01-10T20:00:00Z'

describe('date format', () => {
  afterEach(() => sinon.restore())

  it('formats the day part date accordingly', () => {
    const fakeConfig = {
      publicRuntimeConfig: {
        maintenanceMode: {
          expectedReturn: new Date(fakeDate),
        },
      },
    }

    sinon.stub(config, 'default').returns(fakeConfig as any)

    const result = enzyme.shallow(<UnderMaintenancePage />)

    const formattedDate = result.find('Text').last().text()

    expect(formattedDate).toContain('Friday, 1/10')
  })

  it('formats the hour part date accordingly', () => {
    const fakeConfig = {
      publicRuntimeConfig: {
        maintenanceMode: {
          expectedReturn: new Date(fakeDate),
        },
      },
    }

    sinon.stub(config, 'default').returns(fakeConfig as any)

    const result = enzyme.shallow(<UnderMaintenancePage />)

    const formattedDate = result.find('Text').last().text()

    expect(formattedDate).toContain('5 pm')
  })
})
