import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import * as recoilHooks from 'src/state/recoil/hooks'

import ObjectivesOverviewBody from './body'

describe('component lifecycle', () => {
  afterEach(() => sinon.restore())

  it('loads the objectives in our state layer', () => {
    const fakeObjectives = [{ ...faker.helpers.userCard(), id: faker.random.uuid() }]
    const spy = sinon.spy()

    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)

    enzyme.shallow(<ObjectivesOverviewBody objectives={fakeObjectives as any} />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeObjectives)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('does not load the objectives in our state layer if they are not defined', () => {
    const spy = sinon.spy()

    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)

    enzyme.shallow(<ObjectivesOverviewBody />)

    expect(spy.notCalled).toEqual(true)
  })

  it('does not load the objectives in our state layer if they are defined, but as an empty array', () => {
    const spy = sinon.spy()

    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)

    enzyme.shallow(<ObjectivesOverviewBody objectives={[]} />)

    expect(spy.notCalled).toEqual(true)
  })
})

describe('component render', () => {
  afterEach(() => sinon.restore())

  it('renders a single line for each objective', () => {
    const fakeObjectives = [
      { ...faker.helpers.userCard(), id: faker.random.uuid() },
      { ...faker.helpers.userCard(), id: faker.random.uuid() },
      { ...faker.helpers.userCard(), id: faker.random.uuid() },
      { ...faker.helpers.userCard(), id: faker.random.uuid() },
      { ...faker.helpers.userCard(), id: faker.random.uuid() },
    ]
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(sinon.fake())

    const result = enzyme.shallow(<ObjectivesOverviewBody objectives={fakeObjectives as any} />)

    const lines = result.find('ObjectivesOverviewBodyLine')

    fakeObjectives.map((fakeObjective, index) =>
      expect(lines.at(index).prop('id')).toEqual(fakeObjective.id),
    )
  })

  it('renders a skeleton while no objectives are loaded', () => {
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(sinon.fake())

    const result = enzyme.shallow(<ObjectivesOverviewBody />)

    const lines = result.find('ObjectivesOverviewBodyLine')

    expect(lines.length).toEqual(3)
    lines.map((line) => expect(line.prop('id')).toBeUndefined())
  })
})
