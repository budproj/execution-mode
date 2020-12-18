import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import * as recoilHooks from 'src/state/recoil/hooks'

import ChildTeamsObjectives from './child-teams-objectives'

describe('component lifecycle', () => {
  afterEach(() => sinon.restore())

  it('loads objectives in our recoil state upon query return', () => {
    const objectiveOne = faker.helpers.userCard()
    const objectiveTwo = faker.helpers.userCard()
    const objectiveThree = faker.helpers.userCard()

    const fakeQueryData = {
      team: {
        teams: [
          {
            objectives: [objectiveOne, objectiveTwo],
          },
          {
            objectives: [objectiveThree],
          },
        ],
      },
    }

    const spy = sinon.spy()
    sinon.stub(apollo, 'useQuery').returns({ data: fakeQueryData } as any)
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)

    enzyme.shallow(<ChildTeamsObjectives rootTeamId={faker.random.word()} />)

    const allObjectives = [objectiveOne, objectiveTwo, objectiveThree]
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(allObjectives)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('removes duplicated objectives, setting them only once', () => {
    const objectiveOne = faker.helpers.userCard()
    const objectiveTwo = faker.helpers.userCard()
    const objectiveThree = faker.helpers.userCard()

    const fakeQueryData = {
      team: {
        teams: [
          {
            objectives: [objectiveOne, objectiveTwo, objectiveThree],
          },
          {
            objectives: [objectiveThree, objectiveOne],
          },
        ],
      },
    }

    const spy = sinon.spy()
    sinon.stub(apollo, 'useQuery').returns({ data: fakeQueryData } as any)
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)

    enzyme.shallow(<ChildTeamsObjectives rootTeamId={faker.random.word()} />)

    const allObjectives = [objectiveOne, objectiveTwo, objectiveThree]
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(allObjectives)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('does not loads objectives if our query is running', () => {
    const spy = sinon.spy()
    sinon.stub(apollo, 'useQuery').returns({ loading: true } as any)
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)

    enzyme.shallow(<ChildTeamsObjectives rootTeamId={faker.random.word()} />)

    expect(spy.notCalled).toEqual(true)
  })

  it('does not loads objectives if our query is done, but no data was returned', () => {
    const spy = sinon.spy()
    sinon.stub(apollo, 'useQuery').returns({ loading: false } as any)
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)

    enzyme.shallow(<ChildTeamsObjectives rootTeamId={faker.random.word()} />)

    expect(spy.notCalled).toEqual(true)
  })
})
