import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import * as recoilHooks from 'src/state/recoil/hooks'

import CycleFilterYearSelector from './year-selector'

const fakeQueryResultCycle = {
  id: faker.random.uuid(),
  period: faker.random.word(),
}

describe('component renderization', () => {
  afterEach(() => sinon.restore())

  it('renders a single year option for each returned year from our GraphQL servers', () => {
    const firstCycle = {
      ...fakeQueryResultCycle,
      period: faker.random.word(),
    }
    const secondCycle = {
      ...fakeQueryResultCycle,
      period: faker.random.word(),
    }

    sinon.stub(apollo, 'useLazyQuery').returns([sinon.fake(), {}] as any)
    sinon.stub(recoil, 'useRecoilValue')
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(sinon.fake())

    const wrapper = enzyme.shallow(<CycleFilterYearSelector onYearFilter={sinon.fake()} />)
  })

  it('displays a fallback message if we do not have any year cycle to filter', () => {})

  it('shows a list of comma separated years considering the filtered years', () => {})
})

describe('component lifecycle', () => {
  it('loads the returned cycles in our Recoil state', () => {})
})

describe('component interactions', () => {
  it('executes a given action upon filtering an year cycle', () => {})
})
