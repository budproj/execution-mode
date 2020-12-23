import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import * as recoilHooks from 'src/state/recoil/hooks'

import TeamObjectives from './team-objectives'

describe('page control behaviors', () => {
  afterEach(() => sinon.restore())

  it('sets the page title to the team name upon mounting', () => {
    const spy = sinon.spy()
    const fakeName = faker.random.word()
    const fakeQueryResult = { data: { team: { name: fakeName } } }
    sinon.stub(recoil, 'useSetRecoilState').returns(spy)
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(sinon.fake())
    sinon.stub(apollo, 'useQuery').returns(fakeQueryResult as any)

    enzyme.shallow(<TeamObjectives teamId={faker.random.word()} />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeName)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('sets the team data upon mounting', () => {
    const spy = sinon.spy()
    const fakeName = faker.random.word()
    const fakeQueryResult = { data: { team: { name: fakeName } } }
    sinon.stub(recoil, 'useSetRecoilState').returns(sinon.fake())
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)
    sinon.stub(apollo, 'useQuery').returns(fakeQueryResult as any)

    enzyme.shallow(<TeamObjectives teamId={faker.random.word()} />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeQueryResult.data.team)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
